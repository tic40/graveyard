# https://www.hackerrank.com/challenges/ctci-ransom-note

l1, l2, l3 = $stdin.read.split("\n")
m, n = l1.split(" ").map(&:to_i)
magazine, ransom = l2.split(" ").sort, l3.split(" ").sort

ransom.each do |v|
    i = magazine.index(v)
    if !i
        puts "No"
        exit
    end
    magazine.delete_at(i)
end
puts "Yes"
