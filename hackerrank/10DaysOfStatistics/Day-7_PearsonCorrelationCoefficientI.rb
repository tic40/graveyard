# https://www.hackerrank.com/challenges/s10-pearson-correlation-coefficient/problem
input = STDIN.read.split
n = input.shift.to_i
input.map!(&:to_f)
x, y = input.slice!(0, n), input.slice!(0, n)

def average(ary)
  ary.reduce(0.0) { |sum, v| sum + v } / ary.size
end

def standard_deviation(ary)
  ave = average(ary)
  Math.sqrt(
    ary.reduce(0.0) { |sum, v|
      sum + (v - ave)**2
    } / ary.size
  )
end

ave_x, ave_y = average(x), average(y)
std_x, std_y = standard_deviation(x), standard_deviation(y)
cov = 0

n.times { |i|
  cov += (x[i] - ave_x)*(y[i] - ave_y)
}
puts (cov / (n * std_x * std_y)).round(3)
