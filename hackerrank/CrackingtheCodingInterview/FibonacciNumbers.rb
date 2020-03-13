# https://www.hackerrank.com/challenges/ctci-fibonacci-numbers

class Solution
    def initialize
        @memo = [0, 1]
    end

    def fib(n)
        return if n < 0
        return @memo[n] if @memo[n]
        return @memo[n] = self.fib(n - 1) + self.fib(n - 2)
    end
end
puts (Solution.new).fib(gets.to_i)
