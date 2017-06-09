require 'net/http'
require 'json'

apiUrl = 'https://www.google.com/speech-api/v2/recognize'
params = {
    :apiKey => "AIzaSyA-KKK41kLkY0LY03geihLaBXM_JNx3QDc",
    :output => "json", # json / xml
    :lang => "ja", # ja: japanese / en: english
}

uri = URI("#{apiUrl}?key=#{params[:apiKey]}&output=#{params[:output]}&lang=#{params[:lang]}")

https = Net::HTTP.new(uri.hostname, uri.port)
https.use_ssl = true

res = https.start do |h|
    req = Net::HTTP::Post.new(uri)
    req.body = File.read(ARGV[0])
    req.content_type = "audio/l16; rate=16000"
    h.request(req)
end

result_data = res.body.force_encoding('UTF-8')
result_data.split("\n").each do |data|
    p JSON.pretty_generate(JSON.parse(data)) if data
end
