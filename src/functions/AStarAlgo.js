import { PriorityQueue } from "./PriorityQueue"
import { terrains_map } from '../components/TerrainInfo';


const BASIC_MOVE_COST = 10//10 по умолчанию

function createMatrix(rows, cols, initValue) {
    let matrix = new Array(rows)
    for (let i = 0; i < rows; i++) {
        matrix[i] = new Array(cols)
        for (let j = 0; j < cols; j++) matrix[i][j] = initValue
    }
    return matrix
}

function manhattanDistance(i1, j1, i2, j2) {
    return (Math.abs(i2 - i1) + Math.abs(j2 - j1)) * BASIC_MOVE_COST
}

//считает информацию для соседней клетки с координатами (ni, nj)
function processCell(ni, nj, i, j, finish, f, g, h, mc, parents, processed, occupied, neighbours) {
    if (!occupied[ni][nj] && !processed[ni][nj]) {
        if (g[i][j] + mc[ni][nj] < g[ni][nj]) {
            g[ni][nj] = g[i][j] + mc[ni][nj]
            parents[ni][nj] = {i, j}
        }                 
        h[ni][nj] = manhattanDistance(ni, nj, finish.i, finish.j)
        f[ni][nj] = g[ni][nj] + h[ni][nj]
        neighbours.push({i: ni, j: nj, f: f[ni][nj]})
    } else return
}

//алгоритм А*
export default function findPath(start, finish, map) {
    let rows = map.length, cols = map[0].length//кол-во строк и столбцов
    let INF = 888888//бесконечно большое число
    let f = createMatrix(rows, cols, 0)//g + h
    let g = createMatrix(rows, cols, INF)//кол-во шагов до текущей клетки
    let h = createMatrix(rows, cols, 0)//эвристическая ф-ия, в нашем случае - Манхэттэнское расстояние
    let mc = createMatrix(rows, cols, 0)//хранит в [i][j] стоимость шага по этой местности
    let parents = createMatrix(rows, cols, null)//хранит в [i][j] ячейку, откуда мы пришли сюда
    let processed = createMatrix(rows, cols, false)//обработанные клетки
    let occupied = createMatrix(rows, cols, false)//занятые клетки (препятствием или с-вом)
    for (let i = 0; i < map.length; i++)
        for (let j = 0; j < map[0].length; j++) {
            let terrain = terrains_map[map[i][j]]
            if (!terrain.passable) occupied[i][j] = true//если клетка непроходимая
            else mc[i][j] = terrain.movecost//расчет стоимости передвижения в данную клетку
        }
    mc[start.i][start.j] = 0//в исходную клетку идти не надо
            
    let neighbours = new PriorityQueue()

    //ищем путь
    let i = start.i, j = start.j, nextCell
    h[i][j] = manhattanDistance(i, j, finish.i, finish.j)
    g[i][j] = 0
    processed[i][j] = true
    while (true) {
        if (i + 1 <= rows - 1) processCell(i + 1, j, i, j, finish, f, g, h, mc, parents, processed, occupied, neighbours)
        if (j + 1 <= cols - 1) processCell(i, j + 1, i, j, finish, f, g, h, mc, parents, processed, occupied, neighbours)
        if (i - 1 >= 0) processCell(i - 1, j, i, j, finish, f, g, h, mc, parents, processed, occupied, neighbours)
        if (j - 1 >= 0) processCell(i, j - 1, i, j, finish, f, g, h, mc, parents, processed, occupied, neighbours)
        processed[i][j] = true
        nextCell = neighbours.extractMin()//extractMin
        if (!nextCell) return []//пути нет
        i = nextCell.i
        j = nextCell.j
        if (nextCell.i === finish.i && nextCell.j === finish.j) break     
    }

    //выводим путь
    let path = []
    let curCell = {i: nextCell.i, j: nextCell.j, distance: g[nextCell.i][nextCell.j]}
    while (!(curCell.i === start.i && curCell.j === start.j)) {
        path.push(curCell)
        let {i: pi, j: pj} = parents[i][j]//координаты родителя
        curCell = {i: pi, j: pj, distance: g[pi][pj]}
        i = curCell.i
        j = curCell.j
    } 
    path.push(curCell)
    return path
}