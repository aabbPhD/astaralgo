import {useState} from 'react'
import { Stage, Sprite  } from '@pixi/react';
import * as PIXI from "pixi.js";
import '@pixi/events';
import { terrains_map } from './Info';

import START_TEXTURE from "../assets/img/start.png";
import FINISH_TEXTURE from "../assets/img/finish.png";


const TILE_SIZE = 64;

const NO_TINT = '#FFFFFF'
const PATH_TINT = '#AAAAAA'
const HOVER_TINT = '#CCCCCC'



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
    if (isHovered_terrain) tintValue = HOVER_TINT
    else if (isStart || isHovered_start) tintValue = PATH_TINT
    else if (isFinish || isHovered_finish) tintValue = PATH_TINT
    else if (inPath) tintValue = PATH_TINT
    else tintValue = NO_TINT

    const alpha = (tintValue === PATH_TINT) ? 0.75 : 1
  
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
            if (!terrain.passable || (finish && (rowIndex === finish.i && colIndex === finish.j))) return
            setStart({i: rowIndex, j: colIndex})
            setMode(null)
        }
        if (mode === 'FINISH') {
            if (!terrain.passable || (start && (rowIndex === start.i && colIndex === start.j))) return
            setFinish({i: rowIndex, j: colIndex})
            setMode(null)
        }
    }
  
    return (
        <>
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
                alpha={alpha}
                cursor='pointer'
            />
            {
                isStart && 
                <Sprite
                    image={START_TEXTURE}
                    x={colIndex * TILE_SIZE + 12}
                    y={rowIndex * TILE_SIZE + 3}
                    width={44}
                    height={58}
                />
            }
            {
                isFinish && 
                <Sprite
                    image={FINISH_TEXTURE}
                    x={colIndex * TILE_SIZE + 12}
                    y={rowIndex * TILE_SIZE + 3}
                    width={44}
                    height={58}
                />
            }
      </>
    );
};