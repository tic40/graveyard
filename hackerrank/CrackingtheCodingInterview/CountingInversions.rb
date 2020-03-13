# https://www.hackerrank.com/challenges/ctci-merge-sort

class Solution

    def initialize(ary)
        @ary = ary
        @swaps = 0
    end

    def mergeSort(ary = @ary)
        return ary if (len = ary.size) <= 1
        ary = ary.clone
        mid = len == 2 ? 1 : len / 2
        list1 = ary.slice(0, mid)
        list2 = ary.slice(mid, len - mid)

        return merge(self.mergeSort(list1), self.mergeSort(list2))
    end

    def getSwaps
        return @swaps
    end

    private
        def merge(list1, list2)
            len1, len2 = list1.size, list2.size
            result = Array.new(len1 + len2)
            a, b, i, j, k = list1[0], list2[0], 0, 0, 0
            loop {
                if a <= b then
                    result[i] = a
                    i += 1
                    j += 1
                    break unless j < len1
                    a = list1[j]
                else
                    # count number of swaps here
                    @swaps += len1 - j
                    result[i] = b
                    i += 1
                    k += 1
                    break unless k < len2
                    b = list2[k]
                end
            }
            while j < len1 do
                result[i] = list1[j]
                i += 1
                j += 1
            end
            while k < len2 do
                result[i] = list2[k]
                i += 1
                k += 1
            end
            return result
        end
end

input = $stdin.read.split("\n")
d = input.shift.to_i
d.times do |v|
    n, ary = input.shift.to_i, input.shift.split(" ").map(&:to_i)
    s = Solution.new(ary)
    s.mergeSort
    puts s.getSwaps
end
