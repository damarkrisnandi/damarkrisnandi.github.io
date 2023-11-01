import { Container, AnimatedSprite, useTick } from "@pixi/react";
import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";
// import AnimatedSprite from "../custom-components/AnimatedSprite";
// import { Sprite, Stage } from "react-pixi-fiber/index.js";
// import { Container } from "react-pixi-fiber";

const unit = 16;
const width = window.screen.width;
const height = window.screen.height;

const standLeftFrames = [{x: 2, y: 2}]
const walkLeftFrames = [
    {x: 1, y: 2},
    {x: 2, y: 2},
    {x: 3, y: 2},
    {x: 4, y: 2}
]
const standRightFrames = [{x: 2, y: 3}]
const walkRightFrames = [
    {x: 1, y: 3},
    {x: 2, y: 3},
    {x: 3, y: 3},
    {x: 4, y: 3}
]
const standDownFrames = [{x: 2, y: 1}];
const walkDownFrames = [
    {x: 1, y: 1},
    {x: 2, y: 1},
    {x: 3, y: 1},
    {x: 4, y: 1}
]
const standUpFrames = [{x: 2, y: 4}]
const walkUpFrames = [
    {x: 1, y: 4},
    {x: 2, y: 4},
    {x: 3, y: 4},
    {x: 4, y: 4}
]

const frames = {
    left: walkLeftFrames,
    right: walkRightFrames,
    up: walkUpFrames,
    down: walkDownFrames,
    left0: standLeftFrames,
    right0: standRightFrames,
    up0: standUpFrames,
    down0: standDownFrames
}
function PlayerSprite(props) {
    const url = './pixi-assets/tilemap.png';
    const [isPlaying, setIsPlaying] = useState(true);
    const [key, setKey] = useState('down0')
    const animationRef = useRef(null);

    const createAnimationFrame = (base, unit) => {
        const baseTexture = PIXI.BaseTexture.from(url);
        const animationFrames = [];
        
        for (let position of base) {
            const rect1 = new PIXI.Rectangle((position.x - 1) * unit, (position.y - 1) * unit, unit, unit)
            const texture1 = new PIXI.Texture(baseTexture, rect1);
            animationFrames.push(texture1);
        }

        return animationFrames;
    }

    const entries = [];
        for (let key of Object.keys(frames)) {
            entries.push([key, createAnimationFrame(frames[key], unit)])
            
        }
    const mainFrames = Object.fromEntries(entries);

    useEffect(() => {
        setIsPlaying(true);
    }, [])

    useTick((delta) => {
        window.addEventListener('keydown', (event) => { 
            if (event.key === 'd') { key !== 'right' && setKey('right'); }
            if (event.key === 'a') { key !== 'left' && setKey('left'); }
            if (event.key === 'w') { key !== 'up' && setKey('up'); }
            if (event.key === 's') { key !== 'down' && setKey('down'); }

        })

        window.addEventListener('keyup', (event) => { 
            if (event.key === 'd') { key !== 'right0' && setKey('right0'); }
            if (event.key === 'a') { key !== 'left0' && setKey('left0'); }
            if (event.key === 'w') { key !== 'up0' && setKey('up0'); }
            if (event.key === 's') { key !== 'down0' && setKey('down0'); }

        })
        
        setIsPlaying(true);
    })

    const validateFrames = () => 
    mainFrames.left.length > 0 && 
    mainFrames.left0.length > 0 &&
    mainFrames.right.length > 0 &&
    mainFrames.right0.length > 0 &&
    mainFrames.up.length > 0 &&
    mainFrames.up0.length > 0 &&
    mainFrames.down.length > 0 &&
    mainFrames.down0.length > 0

    if (!validateFrames()) {
        return (<Container position={[width/2, height/2]}></Container>);
    }

    return ( 
        <Container position={[width/2, height/2]}>
            <AnimatedSprite
                key={key}
                ref={animationRef}
                anchor={0.5}
                textures={mainFrames[key]}
                isPlaying={isPlaying}
                initialFrame={0}
                animationSpeed={0.1}
                loop={true}
            />
        </Container>
    );
}

export default PlayerSprite;