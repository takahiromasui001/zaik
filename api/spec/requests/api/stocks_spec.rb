require 'rails_helper'

RSpec.describe Api::V1::StocksController, type: :request do
  describe 'GET	/api/v1/stocks' do
    context '未ログインの場合' do
      it 'HTTPステータスが401であること' do
        storehouse = create(:storehouse)
        stock = create(:stock, storehouse: storehouse)
  
        get api_v1_stocks_path
  
        expect(response).to have_http_status 401
      end
    end

    context 'ログイン済みの場合' do
      it 'HTTPステータスが200 OKであること' do
        login

        storehouse = create(:storehouse)
        stock = create(:stock, storehouse: storehouse)
  
        get api_v1_stocks_path
        result = JSON.parse(response.body)
        pp result
  
        expect(response).to have_http_status 200
        expect(result.size).to eq 1
      end
    end
  end
end
