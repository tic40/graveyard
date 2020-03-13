# https://www.hackerrank.com/challenges/s10-standard-deviation/problem
input = $stdin.read.split("\n")
n, nums = input[0].to_i, input[1].split(" ").map(&:to_i)

def average(ary)
  ary.reduce(0.0) { |sum, v| sum + v } / ary.size
end

def standard_deviation(ary)
  ave = average(ary)
  (Math.sqrt(
    ary.reduce(0.0) { |sum, v|
      sum + (v - ave)**2
    } / ary.size
  )).round(1)
end

puts standard_deviation(nums)
