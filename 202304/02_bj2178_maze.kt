fun main() {
    val (R, C) = readln().split(" ").map { it.toInt() }
    val maze = Array(R) { readln().map { it.toString().toInt() } }
    val dx = intArrayOf(1, -1, 0, 0)
    val dy = intArrayOf(0, 0, 1, -1)
    val visit = Array(R) { IntArray(C) {0} }

    val Q = mutableListOf(intArrayOf(0, 0))
    visit[0][0] = 1

    while (Q.isNotEmpty()) {
        val (curR, curC) = Q.removeFirst()

        for (d in 0..3) {
            val (newR, newC) = Pair(curR + dx[d], curC + dy[d])
            if (newR in 0 until R && newC in 0 until C
                && maze[newR][newC] == 1 && visit[newR][newC] == 0) {
                Q.add(intArrayOf(newR, newC))
                visit[newR][newC] = visit[curR][curC] + 1
            }
        }
    }

    println(visit[R - 1][C - 1])
}

// kotlin으로는 잘 풀기보다는 그냥 여러 method에 익숙해지는 게 목표

// kotlin에서 "123456".split("") 은 없다. 그냥 바로 map 하기
// 그런데 map을 하면 String이 아닌 char로 들어가기 때문에, 숫자로 바꾸면 (.code) ascii 코드가 나온다.
// 그러므로 한 번 toString() 후에 toInt가 필요

// Pair은 Kotlin에서 tuple과 같은 역할


// 다른 사람 풀이인데
// Kotlin으로 속도를 빨리 내고 싶다면 그냥 java의 자료구조를 쓰는 것 같다.
// 이러다 자바도 공부하게 될듯

//import java.util.*
//
//private class Node(val x:Int, val y:Int)
//
//private val dx = intArrayOf(0, 1, 0, -1)
//private val dy = intArrayOf(1, 0, -1, 0)
//
//private fun solution(n:Int, m:Int, graph:Array<IntArray>) : Int{
//    val visited = Array(n + 2){
//        BooleanArray(m + 2)
//    }
//
//    val deque = LinkedList<Node>()
//    deque.add(Node(1, 1))
//    visited[1][1] = true
//
//    var dist = 1
//    while(deque.isNotEmpty()){
//        dist += 1
//        repeat(deque.size){
//            val cur = deque.poll()
//            for(dir in 0 .. 3){
//                val nx = cur.x + dx[dir]
//                val ny = cur.y + dy[dir]
//
//                if(graph[ny][nx] == 0 || visited[ny][nx]){
//                    continue
//                }
//
//                if(nx == m && ny == n){
//                    return dist
//                }
//
//                visited[ny][nx] = true
//                deque.add(Node(nx, ny))
//            }
//        }
//    }
//    return -1
//}
//
//private fun main() = with(System.`in`.bufferedReader()){
//    val tokenizer = StringTokenizer(readLine(), " ")
//    val n = tokenizer.nextToken().toInt()
//    val m = tokenizer.nextToken().toInt()
//
//    val graph = Array(n + 2){ni ->
//        if(ni == 0 || ni == n + 1) {
//            IntArray(m + 2)
//        }
//        else {
//            val line = readLine()
//            IntArray(m + 2){ mi ->
//                if(mi == 0 || mi == m + 1) 0 else line[mi - 1].digitToInt()
//            }
//        }
//    }
//
//    println(solution(n, m, graph))
//}
