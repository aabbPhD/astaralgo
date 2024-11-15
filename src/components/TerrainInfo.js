import '../styles/game.scss'

import grass_asset from "./assets/grass.png";
import sand_asset from "./assets/sand.png";
import shallowWater_asset from "./assets/shallow_water.png";
import deepWater_asset from './assets/deep_water.png'
import spruce_asset from "./assets/spruce.png";



function Terrain(name, asset, passable, movecost) {
  this.name = name
  this.asset = asset
  this.passable = passable
  this.movecost = movecost
}

export const terrains_map = {
  '.': new Terrain('Трава', grass_asset, true, 10),
  's': new Terrain('Песок', sand_asset, true, 20),
  '~': new Terrain('Вода', shallowWater_asset, true, 30),
  '=': new Terrain('Глубоководье', deepWater_asset, true, 60),
  'w': new Terrain('Лес', spruce_asset, false, 9999),
};

const terNames_map = {
  'Трава': '.',
  'Песок': 's',
  'Вода': '~',
  'Глубоководье': '=',
  'Лес': 'w',
}



export default function TerrainInfo(props){
    return (
      <div className="info">
        {['.', 's', '~', '=', 'w'].map(item => {
          const curTerrain = terrains_map[item]
          let passable = curTerrain.passable

          const handleClick = () => {
            props.setMode('TERRAIN')
            props.setStart(null)
            props.setFinish(null)
            props.setPath([])
            props.setChosenTerrain(terNames_map[curTerrain.name])
          }

          return <div className='terrain_info_block' key={item} onClick={() => handleClick()}>
            <img
              className='terrain_img'
              src={curTerrain.asset}
              alt={''}
            />
            <div className="terrain_info">
              <h3>{curTerrain.name}</h3>
              {!passable ? 
                <p><span className='terrain_info-span'>непроходимая</span></p> :
                <p><span className='terrain_info-span'>стоимость:</span> {curTerrain.movecost ? curTerrain.movecost : 'нет'}</p>}
            </div>
          </div>
        })}
        <Btn setMode={props.setMode} mode={'START'} text={'Выбрать начальную клетку'} setStart={props.setStart} setFinish={props.setFinish} setPath={props.setPath}/>
        <Btn setMode={props.setMode} mode={'FINISH'} text={'Рассчитать расстояние до выбранной клетки'} setStart={props.setStart} setFinish={props.setFinish} setPath={props.setPath}/>
        <div className='distance_block'>Расстояние: <span>{props.distance ? props.distance : 'не посчитано'}</span></div>
      </div>
    );
}

const Btn = ({setMode, mode, text, setStart, setFinish, setPath}) => {
  const handleClick = () => {
    setMode(mode)
    if (mode === 'START') setStart(null)
    if (mode === 'FINISH') setFinish(null)
    setPath([])
  }

  return (
    <div className='btn' onClick={() => handleClick()}>
      {text}
    </div>
  );
};