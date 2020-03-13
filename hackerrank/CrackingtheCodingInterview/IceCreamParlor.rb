https://www.hackerrank.com/challenges/ctci-ice-cream-parlor

def binarySearch(ary, key, min, max)
    return -1 if max < min

    mid = min + (max - min) / 2
    if key < ary[mid]
        return binarySearch(ary, key, min, mid -1)
    elsif key > ary[mid]
        return binarySearch(ary, key, mid + 1, max)
    else
        return mid
    end
end

def getFlavorId(menu, value, excludeIdx = nil)
    menu.each_with_index do |v, i|
        if v == value
            if excludeIdx == i
                next
            else
                return i + 1
            end
        end
    end
    return -1
end

def find(menu, money)
    sorted = menu.sort
    len = menu.size
    sorted.each_with_index do |v, i|
        complement = money - v
        result = binarySearch(sorted, complement, i + 1, len - 1)
        if result != -1
            flavor1 = getFlavorId(menu, v)
            flavor2 = getFlavorId(menu, sorted[result], flavor1 - 1)
            return [flavor1, flavor2].sort if flavor2 != -1
        end
    end
    return []
end

input = $stdin.read.split("\n")
trips = input.shift.to_i
trips.times do
    money, n, menu = input.shift.to_i, input.shift.to_i, input.shift.split(" ").map(&:to_i)
    puts find(menu, money).join(" ")
end
