# https://www.hackerrank.com/challenges/ctci-bubble-sort

def bubbleSort(n, elements)
    total = 0
    for i in 0..n-1 do
        swaps = 0
        for j in 0..n-2 do
            if elements[j] > elements[j + 1]
                elements[j], elements[j + 1] = elements[j + 1], elements[j]
                swaps += 1
            end
        end
        break if swaps == 0
        total += swaps
    end
    return total
end

input = $stdin.read.split("\n")
n, ary = input[0].to_i, input[1].split(" ").map(&:to_i)
total = bubbleSort(n, ary)

puts "Array is sorted in #{total} swaps."
puts "First Element: #{ary.first}"
puts "Last Element: #{ary.last}"
