module Api
  module V1
    class SessionsController < ApplicationController
      def create
        user = User.find_by(name: params[:name])&.authenticate(params[:password])

        if user
          session[:user_id] = user.id
          render json: { message: 'login succeed' }
        else
          render json: { message: 'login failed ' }, status: 401
        end
        
      end

      def delete
        pp '*' * 12
        pp 'delete'

      end

      def show
        pp '*' * 12
        pp 'show'
      end
    end
  end
end
