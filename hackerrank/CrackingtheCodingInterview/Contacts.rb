# https://www.hackerrank.com/challenges/ctci-contacts

class Node
    CHARACTER_OF_NODE = 26

    def initialize()
        @children = Array.new(CHARACTER_OF_NODE)
        @size = 0
    end

    def add(str, index = 0)
        @size += 1
        return if str.size == index

        current = str[index]
        child = getNode(current)
        if child == nil
            child = Node.new
            setNode(current, child)
        end
        child.add(str, index + 1)
    end

    def findContact(str, index = 0)
        return @size if str.size == index
        child = getNode(str[index])
        return 0 if child == nil
        return child.findContact(str, index + 1)
    end

    private
        def getCharIndex(c)
            return c.ord - 'a'.ord
        end

        def getNode(c)
            return @children[getCharIndex(c)]
        end

        def setNode(c, node)
            @children[getCharIndex(c)] = node
        end
end

input = $stdin.read.split("\n")
n, contacts, list, node = input.shift, input, [], Node.new
contacts.each do |v|
    operation, name = v.split(" ")

    case operation
        when "add" then node.add(name)
        when "find" then puts node.findContact(name)
    end
end
