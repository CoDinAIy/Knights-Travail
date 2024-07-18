console.log('hello')


class chessBoard {
    constructor() {
        this.size = 8
        this.knightMoves = [[-1,2], [-2,1], [-2,-1], [-1,-2], [1,-2], [2,-1], [2,1], [1,2]]
    }


        
    isValidMove([x, y]) {
        return (x >= 0 && x <= 7 && y >= 0 && y <= 7)
    }
        
        
    
    makeEdgesList() {
        const edges = {}

        for (let xAxis = 0; xAxis < this.size; xAxis++) {
            for ( let yAxis = 0; yAxis < this.size; yAxis++) {
                
                const currentPosition = `${xAxis},${yAxis}`
                edges[currentPosition] = []

                this.knightMoves.forEach(([x, y]) => {
                    const newX = xAxis + x
                    const newY = yAxis + y
                    if (this.isValidMove([newX, newY])) {
                        edges[currentPosition].push([newX, newY])
                    }    
                    

                })
            }
        }
        return edges
    }

    bfs(start,end) {
        const edges = this.makeEdgesList()
        const queue = [[start]]

        const visited = new Set()
        visited.add(JSON.stringify(start))
        

        while (queue.length > 0) {
            const path = queue.shift()
            const [x, y] = path[path.length - 1]

            if (x === end[0] && y === end[1]) {
                console.log(`You made it in ${path.length} moves! Here's your path:`)
                
                for (let i = 0; i < path.length; i++) {
                    const step = path[i]
                    console.log(step)
                }
            }

            const currentPosition = `${x},${y}`
            for (const [nextX, nextY] of edges[currentPosition]) {
                const nextPosition = [nextX, nextY]
                if (!visited.has(JSON.stringify(nextPosition))) {
                    visited.add(JSON.stringify(nextPosition))
                    const newPath = path.slice()
                    newPath.push(nextPosition)
                    queue.push(newPath)
                }
            }

        }
    }
}

const chessboard = new chessBoard()
const start = [3, 3]
const end = [4, 3]
const shortestPath = chessboard.bfs(start,end)
console.log(shortestPath)