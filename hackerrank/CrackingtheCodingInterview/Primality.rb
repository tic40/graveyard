# https://www.hackerrank.com/challenges/ctci-big-o

def isPrime(num)
    return true if num == 2
    return false if num <= 1 || num % 2 == 0
    ary = (3..Math.sqrt(num).floor).to_a

    while val = ary.shift
        return false if num % val == 0
        ary.delete_if{ |v| v % val == 0 }
    end
    return true
end

input = $stdin.read.split("\n").map(&:to_i)
n = input.shift
n.times { puts isPrime(input.shift) ? 'Prime' : 'Not prime' }
