require 'rails_helper'

RSpec.describe Api::V1::StocksController, type: :request do
  describe 'GET	/api/v1/stocks' do
    context '未ログイン時' do
      it '401 Unauthorizedを返すこと' do
        stock = create(:stock, :with_storehouse)
        get api_v1_stocks_path
        expect(response).to have_http_status(:unauthorized)
      end

      it 'エラーメッセージを返すこと' do
        stock = create(:stock, :with_storehouse)
        get api_v1_stocks_path

        expect(JSON.parse(response.body)["message"]).to eq 'unauthorized'
      end
    end

    context 'ログイン時' do
      it 'HTTPステータスが200 OKであること' do
        login
        storehouse = create(:storehouse)
        # 3.times { |n| create(:stock, name: "stock#{n}", :with_storehouse) }
        3.times do |n|
          create(:stock, :with_storehouse, name: "stock#{n}")
        end

        get api_v1_stocks_path
        actual = JSON.parse(response.body).map { |n| n.symbolize_keys }

        expected = [
          { name: 'stock0', file: nil},
          { name: 'stock1', file: nil},
          { name: 'stock2', file: nil}
        ]

        expect(response).to have_http_status 200
        expect(actual.size).to eq 3
        3.times { |i|
          expect(actual[i].slice(:name, :file)).to eq expected[i]
          expect(actual[i].keys).to eq [:id, :name, :file]
        }
      end
    end
  end

  describe 'POST /api/v1/stocks' do
    let!(:storehouse) { create(:storehouse) }
    def create_params(storehouse_id)
      {
        name: 'stock1-a',
        colorNumber: '123',
        condition: "used",
        manufacturingDate: "2020-08-03 07:05:12",
        quantity: 20,
        storehouse_id: storehouse.id,
      }
    end

    context '未ログインの場合' do
      it '401 Unauthorizedを返すこと' do
        post api_v1_stocks_path, params: create_params(storehouse.id)
        expect(response).to have_http_status(:unauthorized)
      end

      it 'エラーメッセージを返すこと' do
        post api_v1_stocks_path, params: create_params(storehouse.id)

        expect(JSON.parse(response.body)["message"]).to eq 'unauthorized'
    end
    end

    context 'ログイン済みの場合' do
      context '必要なパラメーターが全て揃っている場合' do
        it '200 OKを返すこと' do
          _, token = login
          params = create_params(storehouse.id)
          post api_v1_stocks_path, params: params, headers: { "x-csrf-token": token }
          expect(response.status).to eq 200
        end

        it '正しいレスポンスを返すこと' do
          _, token = login
          params = create_params(storehouse.id)
          post api_v1_stocks_path, params: params, headers: { "x-csrf-token": token }

          actual = JSON.parse(response.body).deep_symbolize_keys

          expect(actual.keys.sort).to eq [:colorNumber, :condition, :file, :id, :manufacturingDate, :name, :quantity, :storehouse]
          expect(actual[:storehouse].keys.sort).to eq [:id, :name]

          expect(actual[:name]).to eq params[:name]
          expect(actual[:colorNumber]).to eq params[:colorNumber]
          expect(Time.zone.parse(actual[:manufacturingDate])).to eq Time.zone.parse(params[:manufacturingDate])
          expect(actual[:quantity]).to eq params[:quantity]
          expect(actual[:condition]).to eq params[:condition]
          expect(actual[:storehouse][:name]).to eq storehouse.name
          expect(actual[:file]).to eq nil
        end

        it '在庫が新規に登録されていること' do
          params = create_params(storehouse.id)
          _, token = login

          previous_stock_size = Stock.all.size
          post api_v1_stocks_path, params: params, headers: { "x-csrf-token": token }
          stock_size = Stock.all.size

          expect(stock_size - previous_stock_size).to eq 1
        end
      end

      context 'name パラメータが既存のいずれかのstockと重複している場合' do
        it '422 Unprocessable Entityを返すこと' do
          params = create_params(storehouse.id)
          create(:stock,  :with_storehouse, name: params[:name])

          _, token = login
          post api_v1_stocks_path, params: params, headers: { "x-csrf-token": token }
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it 'エラーメッセージを返すこと' do
          params = create_params(storehouse.id)
          create(:stock,  :with_storehouse, name: params[:name])

          _, token = login
          post api_v1_stocks_path, params: params, headers: { "x-csrf-token": token }
          expect(JSON.parse(response.body)["message"].first).to eq "Name has already been taken"
        end

        it '在庫が増減しないこと' do
          params = create_params(storehouse.id)
          create(:stock,  :with_storehouse, name: params[:name])

          _, token = login
          prev_stock_size = Stock.all.size
          post api_v1_stocks_path, params: params, headers: { "x-csrf-token": token }
          expect(Stock.all.size - prev_stock_size).to eq 0
        end
      end

      context 'storehouseが指定されていない場合' do
        let!(:params_without_storehouse) { create_params(storehouse.id).reject { |key, _| key == :storehouse_id } }

        it '422 Unprocessable Entityを返すこと' do
          _, token = login
          post api_v1_stocks_path, params: params_without_storehouse, headers: { "x-csrf-token": token }
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it 'エラーメッセージを返すこと' do
          _, token = login
          post api_v1_stocks_path, params: params_without_storehouse, headers: { "x-csrf-token": token }
          expect(JSON.parse(response.body)["message"].first).to eq "Storehouse must exist"
        end

        it '在庫が増減しないこと' do
          _, token = login
          prev_stock_size = Stock.all.size
          post api_v1_stocks_path, params: params_without_storehouse, headers: { "x-csrf-token": token }
          expect(Stock.all.size - prev_stock_size).to eq 0
        end
      end

      context 'リクエストにcsrf tokenが存在しない場合' do
        it 'ActionController::InvalidAuthenticityToken の例外が発生すること' do
          params = create_params(storehouse.id)
          _, token = login
          expect { post api_v1_stocks_path, params: params }.to raise_error(ActionController::InvalidAuthenticityToken)
        end
      end
    end
  end

  describe 'GET /api/v1/stocks/:id' do
    context '未ログインの場合' do
      it '401 Unauthorizedを返すこと' do
        stock = create(:stock, :with_storehouse)
        get api_v1_stock_path(stock.id)

        expect(response).to have_http_status(:unauthorized)
      end

      it 'エラーメッセージを返すこと' do
        stock = create(:stock, :with_storehouse)
        get api_v1_stock_path(stock.id)

        expect(JSON.parse(response.body)["message"]).to eq 'unauthorized'
      end
    end

    context 'ログイン済みの場合' do
      let!(:params) do
        {
          name: 'stock1-a',
          color_number: '123',
          condition: "used",
          manufacturing_date: "2020-08-03 07:05:12",
          quantity: 20,
        }
      end

      context '存在する在庫の取得を試みた場合' do
        it '200 OKを返すこと' do
          login
          stock = create(:stock, :with_storehouse, params)
          get api_v1_stock_path(stock.id)
          expect(response).to have_http_status(:ok)
        end

        it '正しいレスポンスを返すこと' do
          login
          stock = create(:stock, :with_storehouse, params)

          get api_v1_stock_path(stock.id)
          actual = JSON.parse(response.body).deep_symbolize_keys

          expect(actual.keys.sort).to eq [:colorNumber, :condition, :file, :id, :manufacturingDate, :name, :quantity, :storehouse]
          expect(actual[:storehouse].keys.sort).to eq [:id, :name]

          expect(actual[:name]).to eq stock.name
          expect(actual[:colorNumber]).to eq stock.color_number
          expect(Time.zone.parse(actual[:manufacturingDate])).to eq Time.zone.parse(stock.manufacturing_date.to_s)
          expect(actual[:quantity]).to eq stock.quantity
          expect(actual[:condition]).to eq stock.condition
          expect(actual[:storehouse][:name]).to eq stock.storehouse.name
          expect(actual[:file]).to eq nil
        end
      end

      context '存在しない在庫の取得を試みた場合' do
        it 'HTTPステータスが404 であること' do
          login
          create(:stock, :with_storehouse)
          unused_stockid = Stock.ids.last + 1

          get api_v1_stock_path(unused_stockid)

          expect(response.status).to eq 404
        end

        it 'エラーメッセージを返すこと' do
          login
          create(:stock, :with_storehouse)
          unused_stockid = Stock.ids.last + 1

          get api_v1_stock_path(unused_stockid)

          expect(JSON.parse(response.body)["message"]).to eq 'record not found'
        end
      end
    end
  end

  describe 'PATCH /api/v1/stocks/:id' do
    def create_params(storehouse_id)
      {
        name: 'stock1-a',
        colorNumber: '123',
        condition: "used",
        manufacturingDate: "2020-08-03 07:05:12",
        quantity: 20,
        storehouse_id: storehouse_id,
      }
    end

    context '未ログインの場合' do
      it '401 Unauthorizedを返すこと' do
        stock = create(:stock, :with_storehouse)
        patch api_v1_stock_path(stock.id), params: create_params(stock.storehouse.id)

        expect(response).to have_http_status(:unauthorized)
      end

      it 'エラーメッセージを返すこと' do
        stock = create(:stock, :with_storehouse)
        post api_v1_stocks_path, params: create_params(stock.storehouse.id)

        expect(JSON.parse(response.body)["message"]).to eq 'unauthorized'
      end
    end
    
    context 'ログイン済みの場合' do
      context '必要なパラメーターが全て揃っている場合' do
        it 'HTTPステータスが200 OKであること' do
          _, token = login
          stock = create(:stock, :with_storehouse, name: 'stock1')
  
          patch api_v1_stock_path(stock.id), params: create_params(stock.storehouse.id), headers: { "x-csrf-token": token }
          expect(response.status).to eq 200
        end

        it '正しいレスポンスが返ってくること' do
          _, token = login
          stock = create(:stock, :with_storehouse, name: 'stock1')
  
          params = create_params(stock.storehouse.id)
          patch api_v1_stock_path(stock.id), params: params, headers: { "x-csrf-token": token }
          actual = JSON.parse(response.body).deep_symbolize_keys

          expect(actual.keys.sort).to eq [:colorNumber, :condition, :file, :id, :manufacturingDate, :name, :quantity, :storehouse]
          expect(actual[:storehouse].keys.sort).to eq [:id, :name]

          expect(actual[:name]).to eq params[:name]
          expect(actual[:colorNumber]).to eq params[:colorNumber]
          expect(Time.zone.parse(actual[:manufacturingDate])).to eq Time.zone.parse(params[:manufacturingDate])
          expect(actual[:quantity]).to eq params[:quantity]
          expect(actual[:condition]).to eq params[:condition]
          expect(actual[:storehouse][:name]).to eq stock.storehouse.name
          expect(actual[:file]).to eq nil
        end

        it '変更した値がデータに反映されていること' do
          _, token = login
          stock = create(:stock, :with_storehouse, name: 'stock1')

          params = create_params(stock.storehouse.id)
          patch api_v1_stock_path(stock.id), params: params, headers: { "x-csrf-token": token }

          actual = Stock.find(stock.id)
          expect(actual.name).to eq params[:name]
          expect(actual.color_number).to eq params[:colorNumber]
          expect(Time.zone.parse(actual.manufacturing_date.to_s)).to eq Time.zone.parse(params[:manufacturingDate])
          expect(actual.quantity).to eq params[:quantity]
          expect(actual.condition).to eq params[:condition]
          expect(actual.storehouse.name).to eq stock.storehouse.name
          expect(actual.file.size).to eq 0
        end
      end

      it 'HTTPステータスが422 であること' do
        _, token = login
        stock = create(:stock, :with_storehouse, name: 'stock1')
        stock2 = create(:stock, :with_storehouse, name: 'stock2')
        params = create_params(stock.id).merge({ name: 'stock2' })
        patch api_v1_stock_path(stock.id), params: params, headers: { "x-csrf-token": token }

        expect(response.status).to eq 422
      end

      it 'HTTPステータスが404 であること' do
        _, token = login
        stock = create(:stock, :with_storehouse, name: 'stock1')
        unused_stockid = Stock.ids.last + 1
        patch api_v1_stock_path(unused_stockid), params: create_params(stock.storehouse.id), headers: { "x-csrf-token": token }

        expect(response.status).to eq 404
      end
    end
  end

  describe 'DELETE /api/v1/stocks/:id' do
    context '未ログインの場合' do
      it '401 Unauthorizedを返すこと' do
        stock = create(:stock, :with_storehouse)
        delete api_v1_stock_path(stock.id)

        expect(response).to have_http_status 401
      end

      it 'エラーメッセージを返すこと' do
        stock = create(:stock, :with_storehouse)
        delete api_v1_stock_path(stock.id)

        expect(JSON.parse(response.body)["message"]).to eq 'unauthorized'
      end
    end

    context 'ログイン済みの場合' do
      it 'HTTPステータスが200 OKであること' do
        _, token = login
        stock = create(:stock, :with_storehouse)

        prev_stock_size = Stock.all.length
        delete api_v1_stock_path(stock.id), headers: { "x-csrf-token": token }

        expect(response.status).to eq 200
        expect(prev_stock_size - Stock.all.length).to eq 1
      end

      it 'HTTPステータスが404 OKであること' do
        _, token = login
        stock = create(:stock, :with_storehouse)

        prev_stock_size = Stock.all.length
        unused_stockid = Stock.ids.last + 1
        delete api_v1_stock_path(unused_stockid), headers: { "x-csrf-token": token }

        expect(response.status).to eq 404
        expect(prev_stock_size - Stock.all.length).to eq 0
      end
    end
  end
end
