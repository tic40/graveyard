# https://www.hackerrank.com/challenges/s10-mcq-3/problem
x = {red: 4, black: 3}
y = {red: 5, black: 4}
z = {red: 4, black: 4}
ary = { x: [], y: [], z: [] }

['red', 'black'].each { |v|
  x[v.to_sym].times { ary[:x].push(v) }
  y[v.to_sym].times { ary[:y].push(v) }
  z[v.to_sym].times { ary[:z].push(v) }
}

puts ary[:x].reduce(0) { |sum, v|
  sum + ary[:y].reduce(0) { |sum2, v2|
    sum2 + ary[:z].reduce(0) { |sum3, v3|
      [v, v2, v3].count('red') == 2 ? sum3 + 1 : sum3
    }
  }
} / ( (x[:red]+x[:black]) * (y[:red]+y[:black]) * (z[:red]+z[:black]) ).to_f
