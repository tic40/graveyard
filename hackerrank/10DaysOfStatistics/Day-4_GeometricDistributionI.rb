# https://www.hackerrank.com/challenges/s10-geometric-distribution-1/problem
lines = STDIN.read.split("\n")
first, second = lines[0].split, lines[1]
p, n = first[0].to_f / first[1].to_f, second.to_i

def g(n, p)
  (1-p)**(n-1) * p
end

puts g(n, p).round(3)

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
