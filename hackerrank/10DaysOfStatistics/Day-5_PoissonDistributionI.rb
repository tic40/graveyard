# https://www.hackerrank.com/challenges/s10-poisson-distribution-1/problem
E = 2.71828
r, k = STDIN.read.split("\n").map(&:to_f)

def poisson(r, k)
  (r ** k) * (E ** (-r)) / (1..k).to_a.reduce(1) { |sum, v| sum * v }
end

puts poisson(r, k).round(3)
