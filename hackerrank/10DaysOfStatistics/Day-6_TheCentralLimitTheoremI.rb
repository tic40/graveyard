# https://www.hackerrank.com/challenges/s10-the-central-limit-theorem-1/problem

max_w, boxes, mean_w, standard = STDIN.read.split.map(&:to_i)

def normal(x, mean, standard)
  (1 + Math.erf( (x - mean) / (standard * Math.sqrt(2)) )) / 2.0
end

z = (max_w - boxes * mean_w) / (Math.sqrt(boxes) * standard)
puts normal(z, 0, 1).round(4)
