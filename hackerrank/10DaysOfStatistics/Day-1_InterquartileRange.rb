# https://www.hackerrank.com/challenges/s10-interquartile-range/problem
def median(ary)
  m_pos = ary.size / 2
  ary.size.odd? ? ary[m_pos] : (ary[m_pos - 1] + ary[m_pos]) / 2.0
end

def quartile(ary)
  n = ary.size
  q1_end = n/2-1
  q3_start = n.even? ? q1_end + 1 : q1_end + 2

  q1 = median(ary[0..q1_end])
  q2 = median(ary)
  q3 = median(ary[q3_start..n])
  [q1, q2, q3]
end

input = $stdin.read.split("\n")
n, x, f = input[0].to_i, input[1].split(" ").map(&:to_i), input[2].split(" ").map(&:to_i)
s = []
x.each_with_index { |v, i|
  f[i].times { s.push(v) }
}
s.sort!
q = quartile(s)
puts (q[2] - q[0]).to_f


