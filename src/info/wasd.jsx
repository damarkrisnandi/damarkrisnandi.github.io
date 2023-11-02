import './wasd.css'
import { Container, Text, Sprite } from "@pixi/react";
import * as PIXI from "pixi.js";


const unit = 16;
const width = window.innerWidth;
const height = window.innerHeight;
const textStyle = new PIXI.TextStyle({
    align: 'center',
    fontFamily: '"Press Start 2P"',
    fontSize: 16,
    fontWeight: '200',
    fill: ['#ffffff'], // gradient
    // stroke: '#01d27e',
    strokeThickness: 2,
    letterSpacing: 10,
    dropShadow: true,
    // dropShadowColor: '#ccced2',
    dropShadowBlur: 0,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
});

function WasdInfo() {
    return ( 
    <Container position={[unit, height - unit * 4]}>
        <Text
        text="Use"
        anchor={0}
        x={0}
        y={unit / 4}
        style={textStyle} />

        <Sprite 
        image={'./pixi-assets/WASD_grey.png'}
        x={unit * 5} y={0}
        />

        <Text
        text="to Move"
        anchor={0}
        x={unit * 9}
        y={unit / 4}
        style={textStyle}
    />
    </Container> 
    );
}

export default WasdInfo;