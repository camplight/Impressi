require 'nokogiri'
require 'open-uri'

module HTMLConverter
  def html_to_deck marked_up_text
    # takes in html file for impress.js presentation and returns its formatting as a deck (array of hashes)
    output = []
    doc = Nokogiri::HTML(marked_up_text)
    # don't yet know how to select for only those class = step instances nested under an id = impress
    doc.css('.step').each do |f|
      #had to do it the following way because of how Nokogiri objects store the attribute hash; it stores attribute list (including "class") as a hash and then strips the whitespace
      hash_array = [f.keys, f.values].transpose
      out_hash = Hash[*hash_array.flatten]
      out_hash["content"] = f.text.gsub(/\s+/, " ").strip
      output << out_hash
    end
    output
  end
end

# puts html_to_deck open("http://packages.python.org/sphinxjp.themes.impressjs/")