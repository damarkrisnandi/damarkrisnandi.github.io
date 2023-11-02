import { Container, Sprite, Text, useTick } from "@pixi/react";
import { useEffect, useRef, useState } from "react";

import room from '../json-helper/room.json'
import { blockBuilder, center, isObjectsOverlap, movement, unit } from "../utils";
import PlayerSprite from "../players/Players";

function LibraryScene() {
    const [sprites, setSprites] = useState([])
    const [colliders, setColliders] = useState([])
    const [key, setKey] = useState('down0');
    const [playerMove, setPlayerMove] = useState(false);
    const containerRef = useRef();
    const collidersRef = useRef();

    // const blockBuilder = (url, unit, source, destination) => {
    //     const baseTexture = PIXI.BaseTexture.from(url)
    
    //     let textureTemp = [];
    //     for (let position of source) {
    //         const rect1 = new PIXI.Rectangle((position.x - 1) * unit, (position.y - 1) * unit, unit, unit)
    //         const texture1 = new PIXI.Texture(baseTexture, rect1);
    //         const spr1 = new PIXI.Sprite(texture1);
    //         spr1.x = (destination.x + position.nowx) * unit;
    //         spr1.y = (destination.y + position.nowy) * unit;

    //         textureTemp.push({texture: texture1, x: spr1.x, y: spr1.y});
            
    //     }

    //     setSprites(textureTemp)
    
    // }

    // const colliderBuilder = (url, unit, source, destination) => {
    //     const baseTexture = PIXI.BaseTexture.from(url)
    
    //     let textureTemp = [];
    //     for (let position of source) {
    //         const rect1 = new PIXI.Rectangle((position.x - 1) * unit, (position.y - 1) * unit, unit, unit)
    //         const texture1 = new PIXI.Texture(baseTexture, rect1);
    //         const spr1 = new PIXI.Sprite(texture1);
    //         spr1.x = (destination.x + position.nowx) * unit;
    //         spr1.y = (destination.y + position.nowy) * unit;

    //         textureTemp.push({texture: texture1, x: spr1.x, y: spr1.y});
            
    //     }

    //     setColliders(textureTemp)
    
    // }

    useEffect(() => {
        if (sprites.length === 0) {
            setSprites(blockBuilder(room.src, unit, room.tiles, center(room.tiles)))
        }
        
        if (colliders.length === 0) {
            setColliders(blockBuilder(room.src, unit, room.collider, center(room.tiles)))
        }
        
    }, [sprites, colliders])

    useTick((delta) => {
        window.addEventListener('keydown', (event) => { 
            if (event.key === 'd') { setKey('right'); }
            if (event.key === 'a') { setKey('left'); }
            if (event.key === 'w') { setKey('up'); }
            if (event.key === 's') { setKey('down'); }
        })

        window.addEventListener('keyup', (event) => { 
            if (event.key === 'd') { setKey('right0'); }
            if (event.key === 'a') { setKey('left0'); }
            if (event.key === 'w') { setKey('up0'); }
            if (event.key === 's') { setKey('down0'); }
        })

        if (containerRef.current && collidersRef.current) {
            const colliders = collidersRef.current.children.filter(ch => ch.isSprite)
            const player = collidersRef.current.children.find(ch => ch.name === 'player')
            const collides = colliders.map(coll => isObjectsOverlap(coll.getBounds(), player.getBounds(), movement[key]))
            if (!collides.includes(true)) {
                containerRef.current.x -=  movement[key].x;
                containerRef.current.y -=  movement[key].y;
                setPlayerMove(true);
            } else {
                containerRef.current.x +=  movement[key].x;
                containerRef.current.y +=  movement[key].y;
                setPlayerMove(false)
            };
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
                <PlayerSprite playerMove={playerMove}/>
                {colliders.map(coll => (
                    <Sprite {...coll}/>
                ))}
            </Container>
        </Container>
    );
}

export default LibraryScene;