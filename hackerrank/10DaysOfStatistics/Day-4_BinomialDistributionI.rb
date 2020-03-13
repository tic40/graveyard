# https://www.hackerrank.com/challenges/s10-binomial-distribution-1/problem
boy, girl = 1.09, 1.0
n = 6
x = 3
p = 1.09 / (boy + girl)
q = 1.0 - p

result = (x..n).reduce(0) { |sum, num|
  sum += (1..n).to_a.combination(num).count * (p ** num) * (q ** (n - num))
}
puts result.round(3)
