# https://www.hackerrank.com/challenges/ctci-coin-change?h_r=next-challenge&h_v=zen

def solution(coins, target)
    lenCoins = coins.size
    table = Array.new(lenCoins + 1).map{Array.new(target + 1,0)}
    for i in 0..lenCoins
        table[i][0] = 1
    end

    for i in 1..lenCoins
        for j in 1..target
            table[i][j] = coins[i - 1] <= j ?
                table[i - 1][j] + table[i][j - coins[i -1]]
                : table[i - 1][j]
        end
    end
    return table[lenCoins][target];
end

input = $stdin.read.split("\n")
n, m = input[0].split(" ").map(&:to_i)
coins = input[1].split(" ").map(&:to_i)
puts solution(coins, n)
