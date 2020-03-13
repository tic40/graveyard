# https://www.hackerrank.com/challenges/s10-the-central-limit-theorem-2/problem
last_m, num_student, mean, standard = STDIN.read.split.map(&:to_f)

def normal(x, mean, standard)
  (1 + Math.erf( (x - mean) / (standard * Math.sqrt(2)) )) / 2.0
end

puts normal(last_m, mean * num_student, Math.sqrt(num_student) * standard).round(4)
