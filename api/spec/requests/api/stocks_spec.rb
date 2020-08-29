require 'rails_helper'

RSpec.describe Api::V1::StocksController, type: :request do
  describe 'GET	/api/v1/stocks' do
    context '未ログイン時' do
      it 'HTTPステータスが401であること' do
        get api_v1_stocks_path
        expect(response).to have_http_status 401
      end
    end

    context 'ログイン時' do
      it 'HTTPステータスが200 OKであること' do
        login
        storehouse = create(:storehouse)
        3.times { |n| create(:stock, name: "stock#{n}", storehouse: storehouse) }

        get api_v1_stocks_path
        result = JSON.parse(response.body).map { |n| n.symbolize_keys }

        expected = [
          { name: 'stock0', file: nil},
          { name: 'stock1', file: nil},
          { name: 'stock2', file: nil}
        ]

        expect(response).to have_http_status 200
        expect(result.size).to eq 3
        3.times { |i|
          expect(result[i].slice(:name, :file)).to eq expected[i]
          expect(result[i].keys).to eq [:id, :name, :file]
        }
      end
    end
  end

  describe 'POST /api/v1/stocks' do
    context '未ログインの場合' do
      it 'HTTPステータスが401であること' do
        storehouse = create(:storehouse)

        params = {
          name: 'stock1',
          colorNumber: '123',
          condition: "used",
          manufacturingDate: "2020-08-03 07:05:12",
          quantity: 20,
          storehouse_id: storehouse.id,
        }

        post api_v1_stocks_path, params: params

        expect(response).to have_http_status 401
      end
    end

    context 'ログイン済みの場合' do
      let!(:storehouse) { create(:storehouse) }
      let!(:params) do
        {
          name: 'stock1',
          colorNumber: '123',
          condition: "used",
          manufacturingDate: "2020-08-03 07:05:12",
          quantity: 20,
          storehouse_id: storehouse.id,
        }
      end

      context '必要なパラメーターが全て揃っている場合' do
        it '200 OKを返すこと' do
          _, token = login
          post api_v1_stocks_path, params: params, headers: { "x-csrf-token": token }
          expect(response.status).to eq 200
        end

        it '正しいレスポンスを返すこと' do
          _, token = login
          post api_v1_stocks_path, params: params, headers: { "x-csrf-token": token }

          result = JSON.parse(response.body).deep_symbolize_keys

          expect(result.keys.sort).to eq [:colorNumber, :condition, :file, :id, :manufacturingDate, :name, :quantity, :storehouse]
          expect(result[:storehouse].keys.sort).to eq [:id, :name]

          expect(result[:name]).to eq params[:name]
          expect(result[:colorNumber]).to eq params[:colorNumber]
          expect(Time.zone.parse(result[:manufacturingDate])).to eq Time.zone.parse(params[:manufacturingDate])
          expect(result[:quantity]).to eq params[:quantity]
          expect(result[:condition]).to eq params[:condition]
          expect(result[:storehouse][:name]).to eq storehouse.name
          expect(result[:file]).to eq nil
        end

        it '在庫が新規に登録されていること' do
          _, token = login

          previous_stock_size = Stock.all.size
          post api_v1_stocks_path, params: params, headers: { "x-csrf-token": token }
          stock_size = Stock.all.size

          expect(stock_size - previous_stock_size).to eq 1
        end
      end

      context 'name パラメータが重複している場合' do
        let!(:params_without_name) { params.reject { |key, _| key == :name } }

        it '422 Unprocessable Entityを返すこと' do
          create(:stock, name: params[:name], storehouse: storehouse)
          _, token = login
          post api_v1_stocks_path, params: params, headers: { "x-csrf-token": token }
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it 'エラーメッセージを返すこと' do
          create(:stock, name: params[:name], storehouse: storehouse)
          _, token = login
          post api_v1_stocks_path, params: params, headers: { "x-csrf-token": token }
          expect(JSON.parse(response.body)["message"].first).to eq "Name has already been taken"
        end

        it '在庫が増減しないこと' do
          create(:stock, name: params[:name], storehouse: storehouse)
          previous_stock_size = Stock.all.size

          _, token = login
          post api_v1_stocks_path, params: params, headers: { "x-csrf-token": token }
          expect(Stock.all.size - prev_stock_size).to eq 0
        end
      end
    end
  end

  describe 'GET /api/v1/stocks/:id' do
    context '未ログインの場合' do
      it 'HTTPステータスが401であること' do
        storehouse = create(:storehouse)
        stock = create(:stock, name: 'stock1', storehouse: storehouse)

        get api_v1_stock_path(stock.id)

        expect(response).to have_http_status 401
      end
    end

    context 'ログイン済みの場合' do
      it 'HTTPステータスが200 OKであること' do
        login
        storehouse = create(:storehouse)
        stock = create(:stock, name: 'stock1', storehouse: storehouse)

        get api_v1_stock_path(stock.id)

        expect(response.status).to eq 200
      end

      it 'HTTPステータスが404 であること' do
        login
        storehouse = create(:storehouse)
        stock = create(:stock, name: 'stock1', storehouse: storehouse)

        unused_stockid = Stock.ids.last + 1
        get api_v1_stock_path(unused_stockid)

        expect(response.status).to eq 404
      end
    end
  end

  describe 'PATCH /api/v1/stocks/:id' do
    context '未ログインの場合' do
      it 'HTTPステータスが401であること' do
        storehouse = create(:storehouse)

        storehouse = create(:storehouse)
        stock = create(:stock, name: 'stock1', storehouse: storehouse)

        params = {
          name: 'stock1-a',
          colorNumber: '123',
          condition: "used",
          manufacturingDate: "2020-08-03 07:05:12",
          quantity: 20,
          storehouse_id: storehouse.id,
        }

        patch api_v1_stock_path(stock.id), params: params
      end
    end
    context 'ログイン済みの場合' do
      it 'HTTPステータスが200 OKであること' do
        _, token = login
        storehouse = create(:storehouse)
        stock = create(:stock, name: 'stock1', storehouse: storehouse)

        params = {
          name: 'stock1-a',
          colorNumber: '123',
          condition: "used",
          manufacturingDate: "2020-08-03 07:05:12",
          quantity: 20,
          storehouse_id: storehouse.id,
        }

        patch api_v1_stock_path(stock.id), params: params, headers: { "x-csrf-token": token }

        expect(response.status).to eq 200
      end

      it 'HTTPステータスが422 であること' do
        _, token = login
        storehouse = create(:storehouse)
        stock = create(:stock, name: 'stock1', storehouse: storehouse)
        stock2 = create(:stock, name: 'stock2', storehouse: storehouse)

        params = {
          name: 'stock2',
          colorNumber: '123',
          condition: "used",
          manufacturingDate: "2020-08-03 07:05:12",
          quantity: 20,
          storehouse_id: storehouse.id,
        }

        patch api_v1_stock_path(stock.id), params: params, headers: { "x-csrf-token": token }

        expect(response.status).to eq 422
      end

      it 'HTTPステータスが404 であること' do
        _, token = login
        storehouse = create(:storehouse)
        stock = create(:stock, name: 'stock1', storehouse: storehouse)

        params = {
          name: 'stock1-a',
          colorNumber: '123',
          condition: "used",
          manufacturingDate: "2020-08-03 07:05:12",
          quantity: 20,
          storehouse_id: storehouse.id,
        }

        unused_stockid = Stock.ids.last + 1
        patch api_v1_stock_path(unused_stockid), params: params, headers: { "x-csrf-token": token }

        expect(response.status).to eq 404
      end
    end
  end

  describe 'DELETE /api/v1/stocks/:id' do
    context '未ログインの場合' do
      it 'HTTPステータスが401であること' do
        storehouse = create(:storehouse)
        stock = create(:stock, name: 'stock1', storehouse: storehouse)

        prev_stock_size = Stock.all.length
        delete api_v1_stock_path(stock.id)

        expect(response).to have_http_status 401
      end
    end

    context 'ログイン済みの場合' do
      it 'HTTPステータスが200 OKであること' do
        _, token = login
        storehouse = create(:storehouse)
        stock = create(:stock, name: 'stock1', storehouse: storehouse)

        prev_stock_size = Stock.all.length
        delete api_v1_stock_path(stock.id), headers: { "x-csrf-token": token }

        expect(response.status).to eq 200
        expect(prev_stock_size - Stock.all.length).to eq 1
      end

      it 'HTTPステータスが404 OKであること' do
        _, token = login
        storehouse = create(:storehouse)
        stock = create(:stock, name: 'stock1', storehouse: storehouse)

        prev_stock_size = Stock.all.length
        unused_stockid = Stock.ids.last + 1
        delete api_v1_stock_path(unused_stockid), headers: { "x-csrf-token": token }

        expect(response.status).to eq 404
        expect(prev_stock_size - Stock.all.length).to eq 0
      end
    end
  end
end
