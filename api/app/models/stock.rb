# == Schema Information
#
# Table name: stocks
#
#  id                             :bigint           not null, primary key
#  color_number(色番号)           :string(255)
#  manufacturing_date(製造年月日) :datetime
#  name(品名)                     :string(255)
#  quantity(残量)                :integer
#  used(中古)                     :boolean
#  created_at                     :datetime         not null
#  updated_at                     :datetime         not null
#  storehouse_id(倉庫ID)          :bigint           not null
#
# Indexes
#
#  index_stocks_on_storehouse_id  (storehouse_id)
#
# Foreign Keys
#
#  fk_rails_...  (storehouse_id => storehouses.id)
#
class Stock < ApplicationRecord
  belongs_to :storehouse
  has_many_attached :file
end
