# https://www.hackerrank.com/domains/tutorials/cracking-the-coding-interview

a = gets.strip.split("").sort
b = gets.strip.split("").sort

deletion = 0
until (a+b).empty? do
    if a.empty? || b.empty?
        deletion += (a.length + b.length)
        break
    end

    if a[0] == b[0]
        a.shift
        b.shift
    elsif a[0] < b[0]
        a.shift
        deletion += 1
    else
        b.shift
        deletion += 1
    end
end

puts deletion
