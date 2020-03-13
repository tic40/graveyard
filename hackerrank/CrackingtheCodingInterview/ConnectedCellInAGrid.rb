# https://www.hackerrank.com/challenges/ctci-connected-cell-in-a-grid

class Solution

    def initialize(matrix)
        @matrix = matrix
    end

    def getBiggestResion
        matrix = @matrix.clone
        maxSize = 0

        for row in 0..(matrix.size - 1)
            for column in 0..(matrix[row].size - 1)
                if matrix[row][column] == 1
                    size = getResionSize(matrix, row, column)
                    maxSize = size if maxSize < size
                end
            end
        end
        return maxSize
    end

    private
        def getResionSize(matrix, row, column)
            return 0 if row < 0 || column < 0 || row >= matrix.size || column >= matrix[row].size
            return 0 if matrix[row][column] == 0

            size, matrix[row][column] = 1, 0
            for r in (row - 1)..(row + 1)
                for c in (column - 1)..(column + 1)
                    if r != row || c != column
                        size += getResionSize(matrix, r, c)
                    end
                end
            end
            return size
        end
end

input = $stdin.read.split("\n")
n, m, matrix = input.shift.to_i, input.shift.to_i, []
input.each_with_index { |v, i| matrix[i] = v.split(" ").map(&:to_i) }
puts (Solution.new(matrix)).getBiggestResion
