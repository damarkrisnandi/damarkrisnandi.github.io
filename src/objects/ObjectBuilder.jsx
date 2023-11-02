import { unit } from "../utils";
import { Container, Sprite } from "@pixi/react";

function ObjectBuilder(props) {
    const { containerRef, name, sprites, colliders, interacts } = props;
    return ( 
        <Container ref={containerRef} position={[unit, unit]} anchor={0.5} name={name}>
            {
                sprites.map((sprite, idx) => (
                    <Sprite {...sprite} key={idx} />
                ))
            }
            {
            colliders.map((coll, idx) => (
                <Sprite {...coll} key={idx} name={`coll-${name}`}/>
            ))
            }
            {
            interacts.map((coll, idx) => (
                <Sprite {...coll} key={idx} name={`interact-${name}`}/>
            ))
            }
        </Container>
    );
}

export default ObjectBuilder;