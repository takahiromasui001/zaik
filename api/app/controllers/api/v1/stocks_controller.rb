module Api
  module V1
    class StocksController < ApplicationController
      before_action :set_stock, only: [:show, :update, :destroy, :download]
      def index
        stocks = Stock.with_attached_file
        result = stocks.map do |stock|
          id = stock.id
          {
            id: stock.id,
            name: stock.name,
            file: stock.file.present? ? Base64.encode64(stock.file.first.download) : nil
          }
        end
        render json: result
      end

      def show
        result = {
          id: @stock.id,
          name: @stock.name,
        }
        render json: result.to_json
      end

      def create
        stock = Stock.new(stock_params)

        if stock.save
          render json: stock
        else
          render json: { status: 'ERROR' }
        end
      end

      def update
        if @stock.update(stock_params)
          render json: @stock
        else
          render json: { status: 'ERROR' }
        end
      end

      def destroy
        @stock.destroy
        render json: @stock
      end

      private

      def set_stock
        @stock = Stock.find(params[:id])
      end

      def stock_params
        params.permit(:name, :storehouse_id, :id, :file)
      end
    end
  end
end
