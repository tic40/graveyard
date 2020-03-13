# https://www.hackerrank.com/challenges/s10-binomial-distribution-2/problem
p, n = STDIN.read.split.map(&:to_i)
p = p/100.0

def binomial_distribution(x, n, p)
  factorial = -> n {
    n == 0 ? 1 : (1..n).inject(:*)
  }
  nCx = -> (n, x) {
    factorial.call(n) / (factorial.call(x) * factorial.call(n-x))
  }
  nCx_value = nCx.call(n, x)
  nCx_value * p**x * (1-p)**(n-x)
end

sum_bin_over_range = -> (a, b) {
  (a..b).map{ |i|
    binomial_distribution(i, n, p)
  }.inject(:+)
}

puts "%.3f\n%.3f" % [ sum_bin_over_range.call(0, 2), sum_bin_over_range.call(2, 10) ]
