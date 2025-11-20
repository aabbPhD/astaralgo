import './styles/reset.css'
import './styles/styles.scss'
import React from "react";
import { preset } from './components/presets';
import Info from './components/Info'
import {WorldMap} from './components/WorldMap'
import findPath from './functions/AStarAlgo'



function App() {
  let [w_map, setW_map] = React.useState(preset)
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
  }, [start, finish, w_map])

  const updateTileTerrain = (rowIndex, colIndex, newTerrain) => {
    setW_map(prevMap => {
      const newMap = prevMap.map(row => [...row]);
      newMap[rowIndex][colIndex] = newTerrain;    
      return newMap;
    });
  };


  return (
    <div className="app" onContextMenu={(e)=> e.preventDefault()}>
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
      <Info 
        mode={mode}
        setMode={setMode}
        chosenTerrain={chosenTerrain}
        setChosenTerrain={setChosenTerrain}
        setStart={setStart}
        setFinish={setFinish}
        setPath={setPath}
        distance={distance}/>
    </div>
  );
}

export default App;
