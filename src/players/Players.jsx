import { Container, AnimatedSprite, useTick } from "@pixi/react";
import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";
import { unit, height, width, frames, movement } from "../utils";

function PlayerSprite(props) {
    const url = './pixi-assets/tilemap.png';
    const [isPlaying, setIsPlaying] = useState(true);
    const [key, setKey] = useState('down0')
    const animationRef = useRef(null);
    const containerRef = useRef(null);

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
        setTimeout(() => {
            if (containerRef.current) {
                containerRef.current.x = width / 2;
                containerRef.current.y = height / 2;
            }
        }, 10)
    }, [])

    useTick((delta) => {
        window.addEventListener('keydown', (event) => { 
            if (event.key === 'd') { props.playerMove && setKey('right'); }
            if (event.key === 'a') { props.playerMove && setKey('left'); }
            if (event.key === 'w') { props.playerMove && setKey('up'); }
            if (event.key === 's') { props.playerMove && setKey('down'); }

        })

        window.addEventListener('keyup', (event) => { 
            if (event.key === 'd') { props.playerMove && setKey('right0'); }
            if (event.key === 'a') { props.playerMove && setKey('left0'); }
            if (event.key === 'w') { props.playerMove && setKey('up0'); }
            if (event.key === 's') { props.playerMove && setKey('down0'); }

        })

        if (containerRef.current) {
            if (props.playerMove) {
                containerRef.current.x += movement[key].x;
                containerRef.current.y += movement[key].y;
            } else {
                // containerRef.current.x -= movement[key].x;
                // containerRef.current.y -= movement[key].y;
            }
        }
        
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
        <Container ref={containerRef} name={'player'}>
            <AnimatedSprite
                key={key}
                ref={animationRef}
                // anchor={0.5}
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