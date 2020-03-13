# https://www.hackerrank.com/challenges/s10-quartiles/problem
input = $stdin.read.split("\n")
n, nums = input[0].to_i, input[1].split(" ").map(&:to_i).sort

def median(ary)
  m_pos = ary.size / 2
  ary.size.odd? ? ary[m_pos] : (ary[m_pos - 1] + ary[m_pos]) / 2
end

q1_end = n/2-1
q3_start = n.even? ? q1_end + 1 : q1_end + 2

q1 = median(nums[0..q1_end])
q2 = median(nums)
q3 = median(nums[q3_start..n])
puts [q1, q2, q3].join("\n")
