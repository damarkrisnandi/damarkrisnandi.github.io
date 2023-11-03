import { Container, Sprite, Text, useTick } from "@pixi/react";
import { useEffect, useRef, useState } from "react";

import room from '../json-helper/room.json'
import { blockBuilder, center, height, isObjectsOverlap, movement, textStyle, textStyleSm, unit } from "../utils";
import PlayerSprite from "../players/Players";
import BookShelf from "../objects/bookshelf";

function LibraryScene() {
    const [sprites, setSprites] = useState([])
    const [colliders, setColliders] = useState([])
    const [key, setKey] = useState('down0');
    const [interactMsg, setInteractMsg] = useState('');
    const [playerMove, setPlayerMove] = useState(false);
    const containerRef = useRef();
    const collidersRef = useRef();

    useEffect(() => {
        if (sprites.length === 0) {
            setSprites(blockBuilder(room.src, unit, room.tiles, center(room.tiles)))
        }
        
        if (colliders.length === 0) {
            setColliders(blockBuilder(room.src, unit, room.collider, center(room.tiles)))
        }

        setTimeout(() => {
            console.log(containerRef.current.children.find(a => a.name === ('bookshelf-math')));
        }, 3000)
        
    }, [sprites, colliders])

    useTick((delta) => {
        window.addEventListener('keydown', (event) => { 
            if (event.key === 'd') { playerMove && setKey('right'); }
            if (event.key === 'a') { playerMove && setKey('left'); }
            if (event.key === 'w') { playerMove && setKey('up'); }
            if (event.key === 's') { playerMove && setKey('down'); }
        })

        window.addEventListener('keyup', (event) => { 
            if (event.key === 'd') { playerMove && setKey('right0'); }
            if (event.key === 'a') { playerMove && setKey('left0'); }
            if (event.key === 'w') { playerMove && setKey('up0'); }
            if (event.key === 's') { playerMove && setKey('down0'); }
        })

        if (containerRef.current && collidersRef.current) {
            const colliders = collidersRef.current.children.filter(ch => ch.isSprite)
            const player = containerRef.current.children.find(ch => ch.name === 'player')
            
            // objects
            const mathBookShelf = containerRef.current.children.find(a => a.name === ('bookshelf-math'));
            const biographBookShelf = containerRef.current.children.find(a => a.name === ('bookshelf-biograph'));
            const literatureBookShelf = containerRef.current.children.find(a => a.name === ('bookshelf-literature'));
            const historyBookShelf = containerRef.current.children.find(a => a.name === ('bookshelf-history'));
            
            const collides = 
            [
                ...colliders,
                ...mathBookShelf.children.filter(ch => ch.name === 'coll-bookshelf-math'),
                ...biographBookShelf.children.filter(ch => ch.name === 'coll-bookshelf-biograph'),
                ...literatureBookShelf.children.filter(ch => ch.name === 'coll-bookshelf-literature'),
                ...historyBookShelf.children.filter(ch => ch.name === 'coll-bookshelf-history'),
            ]
            .map(coll => isObjectsOverlap(coll.getBounds(), player.getBounds(), movement[key]))
            
            if (!collides.includes(true)) {
                containerRef.current.x -=  movement[key].x;
                containerRef.current.y -=  movement[key].y;
                setPlayerMove(true);
            } else {
                // containerRef.current.x +=  movement[key].x;
                // containerRef.current.y +=  movement[key].y;
                setPlayerMove(false)
            };

            const objectsChildren = [
                ...mathBookShelf.children.filter(ch => ch.name === 'interact-bookshelf-math'),
                ...biographBookShelf.children.filter(ch => ch.name === 'interact-bookshelf-biograph'),
                ...literatureBookShelf.children.filter(ch => ch.name === 'interact-bookshelf-literature'),
                ...historyBookShelf.children.filter(ch => ch.name === 'interact-bookshelf-history'),
            ];
            
            const interacts = objectsChildren.map(interact => 
                isObjectsOverlap(
                    interact.getBounds(), 
                    player.getBounds(), 
                    movement[key]
                )
            )
            
            if (interacts.includes(true)) {
                const idx = interacts.findIndex(i => i === true);
                setInteractMsg(objectsChildren[idx].message)
            } else {
                setInteractMsg('');
            }
        }
        
        
    })

    if (sprites.length !== room.tiles.length) {
        return (<Container>
            <Text text="load asset..." style={textStyle}/>
        </Container>);
    }

    return ( 
        <Container ref={containerRef} anchor={0.5}>
            {sprites.map(sprite => (
                <Sprite {...sprite} />
            ))}
            {/* room objects puts here...  */}
            <BookShelf name={'math'} position={{x: center(room.tiles).x, y: center(room.tiles).y}}/>
            <BookShelf name={'literature'} position={{x: center(room.tiles).x + 3, y: center(room.tiles).y}}/>
            <BookShelf name={'biograph'} position={{x: center(room.tiles).x, y: center(room.tiles).y + 3}}/>
            <BookShelf name={'history'} position={{x: center(room.tiles).x + 3, y: center(room.tiles).y + 3}}/>
            
            {/* player puts here.. */}
            <PlayerSprite playerMove={playerMove}/>

                {interactMsg ? (
                    <Text
                    text={interactMsg}
                    anchor={0}
                    x={(unit * 10)}
                    y={height / 2}
                    style={textStyleSm} />

                ) : null}
            
            <Container ref={collidersRef} >
                {colliders.map(coll => (
                    <Sprite {...coll}/>
                ))}
            </Container>
            
        </Container>
    );
}

export default LibraryScene;