# https://www.hackerrank.com/challenges/ctci-lonely-integer

input = $stdin.read.split("\n")
n = input.shift
nums = input.shift.split(" ").map(&:to_i)
puts nums.inject {|result, num| result ^ num }
