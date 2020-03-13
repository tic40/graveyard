# https://www.hackerrank.com/challenges/ctci-array-left-rotation

l1, l2 = $stdin.read.split("\n")
n, k = l1.split(" ").map(&:to_i)
a = l2.split(" ").map(&:to_i)

a.rotate!(k)
a.each do |v|
    print v
    print " "
end
