# https://www.hackerrank.com/challenges/s10-poisson-distribution-2/problem

a, b = STDIN.read.split.map(&:to_f)

a = 160 + 40*(a + a**2)
b = 128 + 40*(b + b**2)
puts a.round(3), b.round(3)
