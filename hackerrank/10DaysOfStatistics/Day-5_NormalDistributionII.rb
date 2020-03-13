# https://www.hackerrank.com/challenges/s10-normal-distribution-2/problem
mean, standard, score_1, score_2 = STDIN.read.split.map(&:to_i)

def normal(x, mean, standard)
  (1 + Math.erf( (x - mean) / (standard * Math.sqrt(2)) )) / 2.0
end

q1 = 100 - normal(score_1, mean, standard) * 100
q2 = 100 - normal(score_2, mean, standard) * 100
q3 = normal(score_2, mean, standard) * 100
puts q1.round(2), q2.round(2), q3.round(2)
