import { Container, Text, useTick } from "@pixi/react";
import { useEffect, useState } from "react";
import { textStyleSm, unit, width } from "../utils";

function TimeInfo() {
    const [time, setTime] = useState(new Date());
    useEffect(() => {}, [])
    useTick(() => {
        setTimeout(() => {
            setTime(new Date())
        }, 1000)
    })
    return ( 
    <Container>
        <Text
        text={time}
        anchor={0}
        x={width - (unit * 12)}
        y={unit}
        style={textStyleSm} />
    </Container> 
    );
}

export default TimeInfo;