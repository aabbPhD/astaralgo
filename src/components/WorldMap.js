import {useState} from 'react'
import { Stage, Sprite } from '@pixi/react';
import * as PIXI from "pixi.js";
import '@pixi/events';
import { terrains_map } from './TerrainInfo';


const TILE_SIZE = 64;

const NO_TINT = '#FFFFFF'
const BRIGHT_TINT = '#E1CA3F'//E1CA3F
const FOCUS_TINT = '#4169E1'




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
    let terrain = terrains_map[tile]
    let isStart = start && (start.i === rowIndex && start.j === colIndex)
    let isFinish = finish && (finish.i === rowIndex && finish.j === colIndex)
    const inPath = path.some(cell => cell.j === colIndex && cell.i === rowIndex);
    let tintValue
    if (isStart || isHovered_start) tintValue = FOCUS_TINT
    else if (isFinish || isHovered_finish) tintValue = BRIGHT_TINT
    else if (inPath) tintValue = BRIGHT_TINT
    else tintValue = NO_TINT
  
    const handlePointerOver = () => {
        if (!terrain.passable) return
        if (mode === 'START' && !isFinish) setIsHovered_start(true)
        if (mode === 'FINISH' && !isStart) setIsHovered_finish(true)
    }
    const handlePointerOut = () => {
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