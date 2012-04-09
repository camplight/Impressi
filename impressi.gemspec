# encoding: UTF-8
Gem::Specification.new do |s|
  s.platform    = Gem::Platform::RUBY
  s.name        = 'impressi'
  s.version     = '0.0.1'
  s.summary     = ''
  s.description = ''
  s.required_ruby_version = '>= 1.8.7'

  #s.author            = ''
  #s.email             = ''
  #s.homepage          = ''

  #s.files         = `git ls-files`.split("\n")
  #s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.require_path = 'lib'
  s.requirements << 'none'
  s.add_dependency 'rails', '~>3.2.1'
  s.add_dependency 'alphadecimal'
  s.add_dependency 'nokogiri'
  
  s.add_development_dependency 'sqlite3'

end
