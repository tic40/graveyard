# https://www.hackerrank.com/challenges/s10-spearman-rank-correlation-coefficient/problem
def spearman (size, x, y)
  xi, yi, diffs = x.sort, y.sort, []
  size.times do |i|
    diffs.push(( xi.index(x[i]) - yi.index(y[i]) ) ** 2 )
  end
  1.0 - 6.0 * diffs.reduce(:+)/(size * (size ** 2 - 1))
end

input = STDIN.read.split
n = input.shift.to_i
x, y = input.slice!(0, n).map(&:to_f), input.slice!(0, n).map(&:to_f)
puts spearman(n, x, y).round(3)
