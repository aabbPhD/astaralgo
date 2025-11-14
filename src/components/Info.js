import '../styles/styles.scss'

import grass_asset from "../assets/img/grass.png";
import sand_asset from "../assets/img/sand.png";
import shallowWater_asset from "../assets/img/shallow_water.png";
import deepWater_asset from '../assets/img/deep_water.png'
import spruce_asset from "../assets/img/spruce.png";



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



export default function Info(props){
    return (
      <div className="info">
        {['.', 's', '~', '=', 'w'].map(item => {
          const curTerrain = terrains_map[item]
          let passable = curTerrain.passable

          const handleClick = () => {
            props.setMode('TERRAIN')
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
        <div className='start_finish_blocks'> 
          <Btn setMode={props.setMode} mode={'START'} text={'Начало'} setStart={props.setStart} setFinish={props.setFinish} setPath={props.setPath}/>
          <Btn setMode={props.setMode} mode={'FINISH'} text={'Конец'} setStart={props.setStart} setFinish={props.setFinish} setPath={props.setPath}/>
        </div>
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