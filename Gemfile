source 'https://rubygems.org'

gem 'devise'
gem 'jquery-rails'
#gem 'thin'

group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'
  gem 'uglifier'
end

group :production do
	gem 'pg'
	gem 'thin'
end

group :test do
  gem 'rspec-rails', '~> 2.8.0'
  gem 'factory_girl_rails', '~> 1.7.0'
  gem 'ffaker'
  gem 'shoulda-matchers', '~> 1.0.0'
  gem 'capybara'
  gem 'selenium-webdriver','~> 2.20.0'
  gem 'database_cleaner', '0.7.1'
  gem 'launchy'
  
  gem 'guard'
  gem 'guard-rspec', '~> 0.6.0'
  gem 'guard-bundler'
end

platform :ruby_18 do
  gem 'ruby-debug'
end

platform :ruby_19 do
  gem 'ruby-debug19'
end

gemspec
