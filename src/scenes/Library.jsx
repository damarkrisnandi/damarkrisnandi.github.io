import { Container, Sprite, useTick } from "@pixi/react";
import { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import room from '../json-helper/room.json'

const unit = 16;
const width = window.screen.width;
const height = window.screen.height;
const movement = {
    up: {x: 0, y: -1},
    left: {x: -1, y: 0}, 
    down: {x: 0, y: 1}, 
    right: {x: 1, y: 0},
    up0: {x: 0, y: 0},
    left0: {x: 0, y: 0}, 
    down0: {x: 0, y: 0}, 
    right0: {x: 0, y: 0},
}
function LibraryScene() {
    const [sprites, setSprites] = useState([])
    const [key, setKey] = useState('down0');
    const containerRef = useRef();

    const blockBuilder = (url, unit, source, destination) => {
        const baseTexture = PIXI.BaseTexture.from(url)
    
        let textureTemp = [];
        for (let position of source) {
            const rect1 = new PIXI.Rectangle((position.x - 1) * unit, (position.y - 1) * unit, unit, unit)
            const texture1 = new PIXI.Texture(baseTexture, rect1);
            const spr1 = new PIXI.Sprite(texture1);
            spr1.x = (destination.x + position.nowx - 2) * unit;
            spr1.y = (destination.y + position.nowy - 2) * unit;
            // sprites.push(spr1)
            textureTemp.push({texture: texture1, x: spr1.x, y: spr1.y});
            
        }

        setSprites(textureTemp)
    
    }

    useEffect(() => {
        blockBuilder(room.src, unit, room.tiles, {x: 0, y: 0})
        console.log(containerRef);
        if (containerRef.current) {
            containerRef.current.x = width/2 - (6 * unit);
            containerRef.current.y = height/2 - (4 * unit);
        }
    }, [])

    useTick((delta) => {
        window.addEventListener('keydown', (event) => { 
            if (event.key === 'd') { key !== 'right' && setKey('right'); }
            if (event.key === 'a') { key !== 'left' && setKey('left'); }
            if (event.key === 'w') { key !== 'up' && setKey('up'); }
            if (event.key === 's') { key !== 'down' && setKey('down'); }
        })

        window.addEventListener('keyup', (event) => { 
            if (event.key === 'd') { setKey('right0'); }
            if (event.key === 'a') { setKey('left0'); }
            if (event.key === 'w') { setKey('up0'); }
            if (event.key === 's') { setKey('down0'); }
        })

        if (containerRef.current) {
            containerRef.current.x -=  movement[key].x * delta;
            containerRef.current.y -=  movement[key].y * delta;
        }
        
        
    })

    if (sprites.length === 0) {
        return (<Container ref={containerRef}></Container>);
    }

    return ( 
        <Container ref={containerRef}>
            {sprites.map(sprite => (
                <Sprite {...sprite} />
            ))}
        </Container>
    );
}

export default LibraryScene;