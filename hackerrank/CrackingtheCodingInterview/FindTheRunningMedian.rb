# https://www.hackerrank.com/challenges/ctci-find-the-running-median

def insertSort(ary, num)
    if ary.empty?
        ary << num
    else
        left, right, mid = 0, ary.length - 1, 0
        while left < right do
            mid = right <= 0 ? 0 : (left + right) / 2
            if num < ary[mid]
                right = mid - 1
            else
                left = mid + 1
            end
        end
        if num < ary[left]
            ary.insert(left, num)
        else
            ary.insert(left + 1, num)
        end
    end
    return ary
end

input = $stdin.read.split("\n").map(&:to_i)
n, nums, ary = input.shift, input, []
nums.each do |num|
    ary = insertSort(ary, num)
    len = ary.length
    puts (ary[(len - 1) / 2] + ary[len / 2]) / 2.0
end
