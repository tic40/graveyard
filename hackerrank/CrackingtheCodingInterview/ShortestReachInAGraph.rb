# https://www.hackerrank.com/challenges/ctci-bfs-shortest-reach

class Node
    def initialize
        @neighbors = []
    end

    def addNeighbor(id)
        @neighbors << id if !@neighbors.index(id)
    end

    def getNeighbors
        return @neighbors
    end
end

class Graph
    DIST = 6

    def initialize
        @nodes = []
    end

    def addNode(node)
        @nodes << node
    end

    def shortestReach(startId)
        dist = Array.new(@nodes.size, -1)
        dist[startId] = 0
        queue = []
        queue << startId

        while (!queue.empty?)
            nodeId = queue.shift
            @nodes[nodeId].getNeighbors.each do |neighbor|
                if dist[neighbor] == -1
                    queue << neighbor
                    dist[neighbor] = dist[nodeId] + DIST
                end
            end
        end
        return dist
    end

end

input = $stdin.read.split("\n")
q = input.shift.to_i

q.times do
    n, edges = input.shift.split(" ").map(&:to_i)
    graph, nodes = Graph.new, []

    n.times { nodes << Node.new }

    for i in 0..edges-1
        ary = input.shift.split(" ").map(&:to_i)
        idx1, idx2 = ary[0] - 1, ary[1] - 1
        nodes[idx1].addNeighbor(idx2) if nodes[idx1]
        nodes[idx2].addNeighbor(idx1) if nodes[idx2]
    end

    nodes.each { |node| graph.addNode(node) }

    startId = input.shift.to_i - 1
    dist = graph.shortestReach(startId)
    dist.delete_at(startId)
    puts dist.join(" ")
end
