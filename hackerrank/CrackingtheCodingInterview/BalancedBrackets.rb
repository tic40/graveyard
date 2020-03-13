# https://www.hackerrank.com/challenges/ctci-balanced-brackets

table = {"[" => "]", "(" => ")", "{" => "}"}
input = $stdin.read.split("\n")
n, l = input.shift.to_i, input

l.each do |str|
    stack = []
    str.split("").each do |c|
        if !stack.empty? && "])}".include?(c)
            break if table[stack.last] != c
            stack.pop
        else
            stack.push(c)
        end
    end
    puts stack.empty? ? "YES" : "NO"
end
