# https://www.hackerrank.com/challenges/ctci-recursive-staircase

class Solution

    def initialize(n, stepsATime)
        @steps, @stepsATime, @memo = n, stepsATime, []
    end

    def climbingWays(current = 0)
        return @memo[current] if @memo[current]
        return 0 if current > @steps
        return 1 if current == @steps

        ways = 0
        @stepsATime.each do |v|
            ways += climbingWays(current + v)
        end
        return @memo[current] = ways
    end
end

input = $stdin.read.split("\n").map(&:to_i)
input.shift.times do
    puts Solution.new(input.shift, [1,2,3]).climbingWays
end
