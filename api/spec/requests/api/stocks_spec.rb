require 'rails_helper'

RSpec.describe Api::V1::StocksController, type: :request do
  def create_first_stock
    storehouse = create(:storehouse)
    stock = create(:stock, storehouse: storehouse)
    [stock, storehouse]
  end

  describe 'GET	/api/v1/stocks' do
    context '未ログインの場合' do
      it 'HTTPステータスが401であること' do
        create_first_stock

        get api_v1_stocks_path

        expect(response).to have_http_status 401
      end
    end

    context 'ログイン済みの場合' do
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
    end
    context 'ログイン済みの場合' do
    end
  end

  describe 'GET /api/v1/stocks/:id' do
    context '未ログインの場合' do
    end
    context 'ログイン済みの場合' do
    end
  end

  describe 'PATCH /api/v1/stocks/:id' do
    context '未ログインの場合' do
    end
    context 'ログイン済みの場合' do
    end
  end

  describe 'DELETE /api/v1/stocks/:id' do
    context '未ログインの場合' do
    end
    context 'ログイン済みの場合' do
    end
  end
end
