import { Container, Sprite, Text, useTick } from "@pixi/react";
import { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import room from '../json-helper/room.json'
import { center, unit } from "../utils";

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
    const [colliders, setColliders] = useState([])
    const [key, setKey] = useState('down0');
    const containerRef = useRef();
    const collidersRef = useRef();

    const blockBuilder = (url, unit, source, destination) => {
        const baseTexture = PIXI.BaseTexture.from(url)
    
        let textureTemp = [];
        for (let position of source) {
            const rect1 = new PIXI.Rectangle((position.x - 1) * unit, (position.y - 1) * unit, unit, unit)
            const texture1 = new PIXI.Texture(baseTexture, rect1);
            const spr1 = new PIXI.Sprite(texture1);
            spr1.x = (destination.x + position.nowx) * unit;
            spr1.y = (destination.y + position.nowy) * unit;
            // sprites.push(spr1)
            textureTemp.push({texture: texture1, x: spr1.x, y: spr1.y});
            
        }

        setSprites(textureTemp)
    
    }

    const colliderBuilder = (url, unit, source, destination) => {
        const baseTexture = PIXI.BaseTexture.from(url)
    
        let textureTemp = [];
        for (let position of source) {
            const rect1 = new PIXI.Rectangle((position.x - 1) * unit, (position.y - 1) * unit, unit, unit)
            const texture1 = new PIXI.Texture(baseTexture, rect1);
            const spr1 = new PIXI.Sprite(texture1);
            spr1.x = (destination.x + position.nowx) * unit;
            spr1.y = (destination.y + position.nowy) * unit;
            // sprites.push(spr1)
            textureTemp.push({texture: texture1, x: spr1.x, y: spr1.y});
            
        }

        setColliders(textureTemp)
    
    }

    useEffect(() => {
        blockBuilder(room.src, unit, room.tiles, center(room.tiles))
        colliderBuilder(room.src, unit, room.collider, center(room.tiles))
        
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

        if (containerRef.current && collidersRef.current) {
            containerRef.current.x -=  movement[key].x * delta;
            containerRef.current.y -=  movement[key].y * delta;
        }
        
        
    })

    if (sprites.length !== room.tiles.length) {
        return (<Container>
            <Text text="load asset..." style={{'color': 'white'}}/>
        </Container>);
    }

    return ( 
        <Container ref={containerRef} anchor={0.5}>
            {sprites.map(sprite => (
                <Sprite {...sprite} />
            ))}
            <Container ref={collidersRef} >
                {colliders.map(coll => (
                    <Sprite {...coll}/>
                ))}
            </Container>
        </Container>
    );
}

export default LibraryScene;