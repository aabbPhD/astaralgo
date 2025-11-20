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



export default function Info(props) {
    return (
        <div className="info">
            {['.', 's', '~', '=', 'w'].map(item => {
                const curTerrain = terrains_map[item]
                const { asset, name, movecost, passable } = curTerrain

                const handleClick = () => {
                    props.setMode('TERRAIN')
                    props.setChosenTerrain(terNames_map[curTerrain.name])
                }

                return <TerrainButton 
                    key={item}
                    terrain={item}
                    chosenTerrain={props.chosenTerrain}
                    asset={asset}
                    name={name}
                    movecost={movecost}
                    passable={passable}
                    handleClick={handleClick}
                />

            })}
            <div className='start_finish_blocks'> 
            <Btn id={'START'} setChosenTerrain={props.setChosenTerrain} setMode={props.setMode} mode={props.mode} text={'Начало'} setStart={props.setStart} setFinish={props.setFinish} setPath={props.setPath}/>
            <Btn id={'FINISH'} setChosenTerrain={props.setChosenTerrain} setMode={props.setMode} mode={props.mode} text={'Конец'} setStart={props.setStart} setFinish={props.setFinish} setPath={props.setPath}/>
            </div>
            <div className='distance_block'>Расстояние: <span>{props.distance ? props.distance : 'не посчитано'}</span></div>
        </div>
    );
}



const TerrainButton = ({terrain, chosenTerrain, asset, name, movecost, passable, handleClick}) => {
    const buttonStyle = (terrain === chosenTerrain) ? 'terrain_info_button active' : 'terrain_info_button';

    return (
        <div className={buttonStyle} onClick={() => handleClick()}>
            <img
                className='terrain_img'
                src={asset}
                alt={''}
            />
            <div className="terrain_info">
                <h3>{name}</h3>
                {!passable ? 
                <p><span className='terrain_info-span'>непроходимая</span></p> :
                <p><span className='terrain_info-span'>стоимость:</span> {movecost ? movecost : 'нет'}</p>}
            </div>
        </div>
    )
}



const Btn = ({id, setChosenTerrain, setMode, mode, text, setStart, setFinish, setPath}) => {
    const buttonStyle = (id === mode) ? 'btn active' : 'btn';

    const handleClick = () => {
        setChosenTerrain(null)
        setMode(id)
        if (id === 'START') setStart(null)
        if (id === 'FINISH') setFinish(null)
        setPath([])
    }

    return (
        <div className={buttonStyle} onClick={() => handleClick()}>
            {text}
        </div>
    );
};