module Api
  module V1
    class StocksController < ApplicationController
      before_action :set_stock, only: [:show, :update, :destroy]
      def index
        stocks = Stock.all
        render json: stocks
      end

      def show
        render json: @stock
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
        params.permit(:name, :storehouse_id, :id)
      end
    end
  end
end
