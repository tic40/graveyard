# https://www.hackerrank.com/challenges/s10-weighted-mean/problem
input = $stdin.read.split("\n")
n, nums, weights = input[0].to_i, input[1].split(" ").map(&:to_i), input[2].split(" ").map(&:to_i)

def weighted_mean(n, nums, weights)
    sum = 0
    nums.each_with_index { |v, i|
        sum += v * weights[i]
    }
    (sum / weights.reduce(:+).to_f).round(1)
end

puts weighted_mean(n, nums, weights)
