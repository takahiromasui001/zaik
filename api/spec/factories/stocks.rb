FactoryBot.define do
  factory :stock do
    sequence(:name) { |n| "stock#{n}" }
  end
end
