# https://www.hackerrank.com/challenges/s10-normal-distribution-1/problem
mean, standard, q1_num, q2_low, q2_up = STDIN.read.split.map(&:to_f)

def normal(x, mean, standard)
  (1 + Math.erf( (x - mean) / (standard * Math.sqrt(2)) )) / 2.0
end

q1 = normal(q1_num, mean, standard)
q2 = normal(q2_up, mean, standard) - normal(q2_low, mean, standard)
puts q1.round(3), q2.round(3)
