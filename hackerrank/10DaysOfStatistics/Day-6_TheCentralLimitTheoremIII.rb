# https://www.hackerrank.com/challenges/s10-the-central-limit-theorem-3/problem
sample_size, mean, standard, distribution_per, z = STDIN.read.split.map(&:to_f)

margin_of_error = z * standard / Math.sqrt(sample_size)
puts (mean - margin_of_error), (mean + margin_of_error)
