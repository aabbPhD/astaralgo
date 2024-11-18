import { preset_1, preset_2 } from './presets';

export default function PresetBlock(props) {

    return (
        <div className="info presets">
            <div className='preset_block' onClick={()=>props.setW_map(preset_1)}>Пресет 1</div>
            <div className='preset_block' onClick={()=>props.setW_map(preset_2)}>Пресет 2</div>
        </div>
    )
}