import './wasd.css'
import { Container, Text, Sprite } from "@pixi/react";
import { height, textStyle, unit } from '../utils';


function WasdInfo() {
    return ( 
    <Container position={[unit, height - unit * 4]}>
        <Text
        text="Use"
        anchor={0}
        x={0}
        y={unit / 2}
        style={textStyle} />

        <Sprite 
        image={'./pixi-assets/WASD_grey.png'}
        x={unit * 5} y={0}
        />

        <Text
        text="to Move"
        anchor={0}
        x={unit * 9}
        y={unit / 2}
        style={textStyle}
    />
    </Container> 
    );
}

export default WasdInfo;