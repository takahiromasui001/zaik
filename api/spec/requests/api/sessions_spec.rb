require 'rails_helper'

RSpec.describe Api::V1::SessionsController, type: :request do
  describe 'POST /api/v1/login' do
    context 'ユーザ名 & パスワードが正しい場合' do
      it '200 OKを返すこと' do
      end

      it 'ログイン成功を表すメッセージを返すこと' do
      end

      it 'ログイン確認が成功すること' do
      end
    end

    context 'ユーザ名 & パスワードが誤っている場合' do
      it '401 Unauthorizedを返すこと' do
      end

      it 'エラーメッセージを返すこと' do
      end

      it 'ログイン確認が失敗すること' do
      end
    end
  end

  describe 'DELETE /api/v1/logout' do
    context '未ログインの場合' do
      it '401 Unauthorizedを返すこと' do
      end

      it 'エラーメッセージを返すこと' do
      end
    end

    context 'ログイン済みの場合' do
      it '200 OKを返すこと' do
      end

      it 'ログアウト成功のメッセージを返すこと' do
      end

      it 'ログイン確認に失敗すること' do
      end
    end

    context 'リクエストにcsrf tokenが存在しない場合' do
      it 'ActionController::InvalidAuthenticityToken の例外が発生すること' do
      end
    end
  end

  describe 'GET /api/v1/logged_in' do
    context '未ログインの場合' do
      it '401 Unauthorizedを返すこと' do
      end

      it 'エラーメッセージを返すこと' do
      end
    end

    context 'ログイン済みの場合' do
      it '200 OKを返すこと' do
      end

      it '正しいレスポンスを返すこと' do
      end
    end
  end
end
