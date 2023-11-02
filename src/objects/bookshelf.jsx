import { Container, Sprite, useTick } from "@pixi/react";
import { useEffect, useRef, useState } from "react";
import bookshelf from '../json-helper/book-shelf.json'
import { blockBuilder, center, unit } from "../utils";
import ObjectBuilder from "./ObjectBuilder";

function BookShelf(props) {
    const {name, position} = props;
    const [sprites, setSprites] = useState([]);
    const [colliders, setColliders] = useState([]);
    const [interacts, setInteracts] = useState([]);
    const containerRef = useRef();
    const collidersRef = useRef();

    useEffect(() => {
        const centerplace = center(bookshelf.tiles);
        
        if (sprites.length === 0) {
            setSprites(blockBuilder(bookshelf.src, unit, bookshelf.tiles, position))
        }
        
        if (colliders.length === 0) {
            setColliders(blockBuilder(bookshelf.src, unit, bookshelf.collider, position))
        }

        if (interacts.length === 0) {
            setInteracts(blockBuilder(bookshelf.src, unit, bookshelf.interactZone, position))
        }

    }, [sprites, colliders, position])

    useTick((delta) => {

    })

    return ( 
        <ObjectBuilder {...{name: `bookshelf-${name}`,sprites, colliders, interacts, containerRef}} />
    );
}

export default BookShelf;