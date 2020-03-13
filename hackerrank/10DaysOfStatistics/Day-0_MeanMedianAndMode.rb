# https://www.hackerrank.com/challenges/s10-basic-statistics/problem
lines = $stdin.read.split("\n")
n, nums = lines[0].to_i, lines[1].split(" ").map(&:to_i).sort

def mean(n, ary)
    ary.reduce(:+) / n.to_f
end

def median(n, ary)
    n.even? ? (ary[n / 2 - 1] + ary[n / 2]) / 2.0 : ary[n / 2 - 1]
end

def mode(ary)
    counts = ary.map {|n| ary.count(n) }
    ary[counts.index(counts.max)]
end

puts mean(n, nums)
puts median(n, nums)
puts mode(nums)
