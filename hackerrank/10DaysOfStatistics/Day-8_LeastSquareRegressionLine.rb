# https://www.hackerrank.com/challenges/s10-least-square-regression-line/problem

def mean(ary)
  ary.reduce(:+) / ary.size
end

input = STDIN.read.split("\n")
x, y = [], []
N = 5

N.times { |i|
  student = input[i].split(' ').map(&:to_f)
  x << student[0]
  y << student[1]
}

mean_x, mean_y = mean(x), mean(y)
x_squared = x.reduce(0){ |sum, v| sum + (v*v) }
xy = 0
N.times { |i| xy += x[i]*y[i] }

b = ((5.0 * xy) - (x.reduce(:+) * y.reduce(:+) )) / (5.0 * x_squared - (x.reduce(:+) ** 2))
a = mean_y - (b * mean_x)

puts (a + (b * 80)).round(3)
