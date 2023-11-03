import { Container, Sprite, Text, useTick } from "@pixi/react";
import { useEffect, useRef, useState } from "react";

import room from '../json-helper/room.json'
import { blockBuilder, center, height, isObjectsOverlap, movement, textStyle, textStyleSm, unit, width } from "../utils";
import PlayerSprite from "../players/Players";
import BookShelf from "../objects/bookshelf";

function LibraryScene() {
    const [sprites, setSprites] = useState([])
    const [colliders, setColliders] = useState([])
    const [key, setKey] = useState('down0');
    const [interactMsg, setInteractMsg] = useState('walk to bookshelves to get all informations');
    const [playerMove, setPlayerMove] = useState(false);
    const containerRef = useRef();
    const collidersRef = useRef();

    const current = new Date().getFullYear()
    const bookshelves = [
        { name: 'createdby', position:{x: center(room.tiles).x, y: center(room.tiles).y}, interactMessage: 'created by: damarkrisnandi as frontend-developer'},
        { name: 'tech stacks', position:{x: center(room.tiles).x + 3, y: center(room.tiles).y}, interactMessage: 'tech-stacks: angular, react, vuejs, java, nodejs'},
        { name: 'projects', position:{x: center(room.tiles).x + 6, y: center(room.tiles).y}, interactMessage: `projects: sakti-frontend-web (angular) 2019-${current} \n bca-bds-webgen-2 (angular) 2021 \n sakti-web-micro-frontend (webpack&angular) 2022-${current}`},
        { name: 'education', position:{x: center(room.tiles).x + 9, y: center(room.tiles).y}, interactMessage: `educations: 2013-2019 math univ gadjah mada,\n2018 binar academy yogyakarta`},

        { name: 'framework', position:{x: center(room.tiles).x + 6, y: center(room.tiles).y + 5}, interactMessage: `create-this-with: react, pixijs, react-pixijs`},

        { name: 'assets', position:{x: center(room.tiles).x + 9, y: center(room.tiles).y + 5}, interactMessage: 
        `this-page-assets: https://opengameart.org/content/classic-rpg-tileset, https://limezu.itch.io/moderninteriors/devlog/207713/free-version-overview`},
    ]

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
            const bookshelfChildren = bookshelves.map(b => containerRef.current.children.find(a => a.name === (`bookshelf-${b.name}`)))
            
            const objectColliders = [];
            bookshelfChildren.forEach(bs => {
                const colliders = bs.children.filter(ch => ch.name && ch.name.startsWith('coll-'))
                
                objectColliders.push(...colliders)
            })
            const collides = 
            [
                ...colliders,
                ...objectColliders
            ]
            .map(coll => isObjectsOverlap(coll.getBounds(), player.getBounds(), movement[key]))
            
            if (!collides.includes(true)) {
                containerRef.current.x -=  movement[key].x * 2;
                containerRef.current.y -=  movement[key].y * 2;
                setPlayerMove(true);
            } else {
                setPlayerMove(false)
            };

            const objectInteract = [];
            bookshelfChildren.forEach(bs => {
                const interacts = bs.children.filter(ch => ch.name && ch.name.startsWith('interact-'))
                objectInteract.push(...interacts)
            })
            const objectsChildren = [
                ...objectInteract
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
                // setInteractMsg('');
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
            <Text
            text={"damarkrisnandi's portofolio"}
            anchor={0.5}
            x={(width / 2)}
            y={(height / 2) - (unit * 8) }
            style={textStyle} />
            {sprites.map(sprite => (
                <Sprite {...sprite} />
            ))}
            {/* room objects puts here...  */}
            {bookshelves.map(b => (
                <BookShelf name={b.name} position={b.position} interactMessage={b.interactMessage}/>
            ))}
            {/* <BookShelf name={'literature'} position={{x: center(room.tiles).x + 3, y: center(room.tiles).y}}/>
            <BookShelf name={'biograph'} position={{x: center(room.tiles).x, y: center(room.tiles).y + 3}}/>
            <BookShelf name={'history'} position={{x: center(room.tiles).x + 3, y: center(room.tiles).y + 3}}/> */}
            
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