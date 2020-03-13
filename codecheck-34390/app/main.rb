require 'net/http'
require 'json'

class Solution

  API_BASE = 'http://challenge-server.code-check.io/'
  API_RECURSIVE = API_BASE + 'api/recursive/ask'

  def initialize(seed:, n:)
    @seed, @n = seed, n
    @cache = Array.new(@n, nil)
  end

  # call a recursive function named 'f'
  def calc
    return f(@n)
  end

  # will return a 'result' response
  def ask_server(n)
    uri = URI(API_RECURSIVE)
    uri.query = URI.encode_www_form({ seed: @seed, n: n })
    res = Net::HTTP.get(uri)
    return JSON.parse(res)['result'].to_i
  end

  private
    def f(n)
      return 0 if n < 0
      return 1 if n == 0
      return 2 if n == 2
      if (n % 2) == 0
        return f(n - 1) + f(n - 2) + f(n - 3) + f(n - 4)
      else
        if @cache[n]
          return @cache[n]
        else
          @cache[n] = ask_server(n)
          return @cache[n]
        end
      end
    end
end

# validation for the Array 'argv'
def validate?(argv)
  err = nil
  if argv.size < 2
    err = "Error! Args are missing."
  end

  if err
    STDERR.puts err
    STDOUT.puts err
    return false
  end
  true
end

def main(argv)
  exit 1 if !validate?(argv)
  seed, n = argv[0].to_s, argv[1].to_i
  puts (Solution.new(seed: seed, n: n)).calc
end
