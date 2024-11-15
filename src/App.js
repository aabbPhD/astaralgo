import './styles/reset.css'
import './styles/game.scss'
import React, { useState, useEffect } from "react";
import TerrainInfo from './components/TerrainInfo'
import {WorldMap} from './components/WorldMap'
import findPath from './functions/AStarAlgo'


let init_w_map = [
  ["=", "=", "~", "~", "~", "~", "~", "~", "~", ".", ".", ".", ".", "w", "w"],
  ["=", "~", "~", "~", "~", "~", ".", ".", ".", ".", ".", ".", ".", ".", "w"],
  ["~", "~", "s", ".", ".", "~", "~", ".", ".", ".", ".", ".", ".", ".", "."],
  ["~", "~", ".", ".", ".", "s", "~", "~", "~", ".", ".", ".", ".", ".", "s"],
  ["~", ".", ".", ".", ".", "s", "~", "=", "~", ".", ".", ".", ".", ".", "s"],
  ["~", ".", "w", ".", ".", "s", "~", "=", "~", ".", ".", ".", ".", "s", "s"],
  ["~", ".", ".", "w", ".", ".", "~", "~", "~", ".", ".", ".", "s", "s", "s"],
  ["~", ".", ".", ".", "s", ".", ".", ".", ".", ".", "~", ".", "s", "s", "s"],
  [".", ".", ".", ".", "s", ".", ".", ".", ".", ".", "~", "s", "s", "s", "s"],
  [".", ".", ".", ".", ".", ".", ".", ".", "s", "s", "s", "s", "s", "s", "s"],
]

const INF = 999999

function App() {
  let [w_map, setW_map] = React.useState(init_w_map)
  let [mode, setMode] = React.useState(null)
  let [chosenTerrain, setChosenTerrain] = React.useState(null)
  let [start, setStart] = React.useState(null)
  let [finish, setFinish] = React.useState(null)
  let [path, setPath] = React.useState([])
  let [distance, setDistance] = React.useState(null)

  React.useEffect(()=>{
      if (start !== null && finish !== null) {
        let path = findPath(start, finish, w_map)
        setPath(path)
        setDistance(path.length ? path[0].distance : 'недостижимо')
      } else {
        setDistance(null)
      }
  }, [start, finish])

  const updateTileTerrain = (rowIndex, colIndex, newTerrain) => {
    setW_map(prevMap => {
      const newMap = prevMap.map(row => [...row]);
      newMap[rowIndex][colIndex] = newTerrain;    
      return newMap;
    });
  };

  //console.log(chosenTerrain)

  return (
    <div className="game_window">
      <WorldMap 
        w_map={w_map}
        mode={mode} 
        chosenTerrain={chosenTerrain}
        updateTileTerrain={updateTileTerrain}
        setMode={setMode} 
        start={start}
        setStart={setStart}
        finish={finish}
        setFinish={setFinish}
        path={path}/>
      <TerrainInfo 
        setMode={setMode}
        setChosenTerrain={setChosenTerrain}
        setStart={setStart}
        setFinish={setFinish}
        setPath={setPath}
        distance={distance}/>
    </div>
  );
}

export default App;
