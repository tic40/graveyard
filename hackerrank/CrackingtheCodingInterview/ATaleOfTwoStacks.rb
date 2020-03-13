#https://www.hackerrank.com/challenges/ctci-queue-using-two-stacks

input = $stdin.read.split("\n")
n, lines, queue = input.shift.to_i, input, []
lines.each do |l|
    t, x = l.split(" ")
    case t
    when "1" then
        queue.push(x)
    when "2" then
        queue.shift
    when "3" then
        puts queue.first
    end
end
