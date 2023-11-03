import { textStyle, unit } from "../utils";
import { Container, Sprite, Text } from "@pixi/react";

function ObjectBuilder(props) {
    const { containerRef, name, sprites, colliders, interacts, interactMessage } = props;
    if (
        (!sprites || sprites.length === 0) || 
        (!colliders || colliders.length === 0) || 
        (!interacts || interacts.length === 0)
        ) {
            return (
                <Container ref={containerRef} position={[unit, unit]} anchor={0.5}>
                    <Text
                    text={`loading assets: ${name}...`}
                    anchor={0}
                    x={0}
                    y={unit / 2}
                    style={textStyle} />
                </Container>
            )
        }
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
                    <Sprite {...coll} key={idx} name={`interact-${name}`} message={interactMessage || `this is ${name}`}/>
                ))
            }
        </Container>
    );
}

export default ObjectBuilder;