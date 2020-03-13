# https://www.hackerrank.com/challenges/s10-geometric-distribution-2/problem
=begin
In the sequence of 5 products there are only 6 cases where the first defect can happen. These events are:

E1: In the first inspection.
E2: In the second inspection.
E3: In the third inspection.
E4: In the forth inspection.
E5: In the fifth inspection.
E6: There is no defect in the 5 inspections.

The problem asks for p = P(E1)+P(E2)+P(E3)+P(E4)+P(E5). As the probability p + P(E6) = 1, you can see that what we are looking for is 1 - P(E6) and P(E6) = (2/3)^5.

The expression (1/3)^5 is the probability that all the five products in the sequence have a defect.
=end

f, n = STDIN.read.split("\n")
f = f.split.map(&:to_f)
p, n = f[0] / f[1], n.to_i

puts (1 - (1 - p)**n).round(3)
