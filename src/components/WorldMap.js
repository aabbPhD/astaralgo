import {useState} from 'react'
import { Stage, Sprite } from '@pixi/react';
import * as PIXI from "pixi.js";
import '@pixi/events';
import { terrains_map } from './Info';


const TILE_SIZE = 64;

const NO_TINT = '#FFFFFF'
const START_TINT = '#4169E1'
const PATH_TINT = '#E1CA3F'
const TERRAIN_TINT = '#CCCCCC'
const aaa = '#CCCCCC'
const bbb = '#4169E1'
const ccc = '#E1CA3F'




export function WorldMap(props){
    let w_map = props.w_map

    return (
        <Stage
            width={TILE_SIZE * w_map[0].length}
            height={TILE_SIZE * w_map.length}
            interactive={true}
            >
            {w_map.map((row, rowIndex) =>
                row.map((tile, colIndex) => (
                <Tile
                    key={`${rowIndex}-${colIndex}`}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    tile={tile}
                    mode={props.mode}
                    setMode={props.setMode}
                    start={props.start}
                    setStart={props.setStart}
                    finish={props.finish}
                    setFinish={props.setFinish}
                    path={props.path}
                    chosenTerrain={props.chosenTerrain}
                    updateTileTerrain={props.updateTileTerrain}
                />
                ))
            )}
        </Stage>
    );
}

const Tile = ({ rowIndex, colIndex, tile, mode, setMode, start, setStart, finish, setFinish, path, chosenTerrain, updateTileTerrain }) => {
    const [isHovered_start, setIsHovered_start] = useState(false);
    const [isHovered_finish, setIsHovered_finish] = useState(false);
    const [isHovered_terrain, setIsHovered_terrain] = useState(false);
    let terrain = terrains_map[tile]
    let isStart = start && (start.i === rowIndex && start.j === colIndex)
    let isFinish = finish && (finish.i === rowIndex && finish.j === colIndex)
    const inPath = path.some(cell => cell.j === colIndex && cell.i === rowIndex);
    let tintValue
    if (isHovered_terrain) tintValue = TERRAIN_TINT
    else if (isStart || isHovered_start) tintValue = START_TINT
    else if (isFinish || isHovered_finish) tintValue = PATH_TINT
    else if (inPath) tintValue = PATH_TINT
    else tintValue = NO_TINT
  
    const handlePointerOver = () => {
        if (mode === 'TERRAIN') setIsHovered_terrain(true)
        if (mode === 'START' && !isFinish && terrain.passable) setIsHovered_start(true)
        if (mode === 'FINISH' && !isStart && terrain.passable) setIsHovered_finish(true)
    }
    const handlePointerOut = () => {
        setIsHovered_terrain(false)
        setIsHovered_start(false)
        setIsHovered_finish(false)
    }
    const handleClick = () => {
        if (mode === 'TERRAIN') {
            updateTileTerrain(rowIndex, colIndex, chosenTerrain)
        }
        if (mode === 'START') {
            if (!terrain.passable && finish && (rowIndex === finish.i && colIndex === finish.j)) return
            setStart({i: rowIndex, j: colIndex})
            setMode(null)
        }
        if (mode === 'FINISH') {
            if (!terrain.passable && start && (rowIndex === start.i && colIndex === start.j)) return
            setFinish({i: rowIndex, j: colIndex})
            setMode(null)
        }
    }
  
    return (
      <Sprite
        image={terrain.asset}
        x={colIndex * TILE_SIZE}
        y={rowIndex * TILE_SIZE}
        width={TILE_SIZE}
        height={TILE_SIZE}
        interactive={true}
        pointerover={handlePointerOver}
        pointerout={handlePointerOut}
        pointertap={handleClick}
        tint={tintValue}
        cursor='pointer'
      />
    );
};