import * as PIXI from "pixi.js";

export const unit = 16;
export const width = window.innerWidth;
export const height = window.innerHeight;

const maxY = (object) => Math.max(...object.map(t => t.nowy + 1))
const maxX = (object) => Math.max(...object.map(t => t.nowx + 1))
export const center = (object) => {return {x: Math.floor(width/(2*unit)) - Math.floor(maxX(object)/2), y: height/(2*unit) - Math.floor(maxY(object)/2)}}

const standLeftFrames = [{x: 2, y: 2}]
const walkLeftFrames = [
    {x: 1, y: 2},
    {x: 2, y: 2},
    {x: 3, y: 2},
    {x: 4, y: 2}
]
const standRightFrames = [{x: 2, y: 3}]
const walkRightFrames = [
    {x: 1, y: 3},
    {x: 2, y: 3},
    {x: 3, y: 3},
    {x: 4, y: 3}
]
const standDownFrames = [{x: 2, y: 1}];
const walkDownFrames = [
    {x: 1, y: 1},
    {x: 2, y: 1},
    {x: 3, y: 1},
    {x: 4, y: 1}
]
const standUpFrames = [{x: 2, y: 4}]
const walkUpFrames = [
    {x: 1, y: 4},
    {x: 2, y: 4},
    {x: 3, y: 4},
    {x: 4, y: 4}
]

export const frames = {
    left: walkLeftFrames,
    right: walkRightFrames,
    up: walkUpFrames,
    down: walkDownFrames,
    left0: standLeftFrames,
    right0: standRightFrames,
    up0: standUpFrames,
    down0: standDownFrames
}

export const movement = {
    up: {x: 0, y: -1},
    left: {x: -1, y: 0}, 
    down: {x: 0, y: 1}, 
    right: {x: 1, y: 0},
    up0: {x: 0, y: 0},
    left0: {x: 0, y: 0}, 
    down0: {x: 0, y: 0}, 
    right0: {x: 0, y: 0},
}

export const isObjectsOverlap = (object, player, dir) => {
    let playerT = player.y + dir.y; 
    let playerB = (player.y + unit) + dir.y; 
    let playerL = player.x + dir.x; 
    let playerR = (player.x + unit) + dir.x;

    let boundT = object.y; 
    let boundB = object.y + unit; 
    let boundL = object.x; 
    let boundR = object.x + unit;

    // return true if overlap
    return boundL < playerR && boundT < playerB && boundR > playerL && boundB > playerT
}

export const blockBuilder = (url, unit, source, destination) => {
    const baseTexture = PIXI.BaseTexture.from(url)

    let textureTemp = [];
    for (let position of source) {
        const rect1 = new PIXI.Rectangle((position.x - 1) * unit, (position.y - 1) * unit, unit, unit)
        const texture1 = new PIXI.Texture(baseTexture, rect1);
        const spr1 = new PIXI.Sprite(texture1);
        spr1.x = (destination.x + position.nowx) * unit;
        spr1.y = (destination.y + position.nowy) * unit;

        textureTemp.push({texture: texture1, x: spr1.x, y: spr1.y});
        
    }

    return textureTemp

}

export const textStyle = new PIXI.TextStyle({
    align: 'center',
    fontFamily: '"Press Start 2P"',
    fontSize: 12,
    fontWeight: '200',
    fill: ['#ffffff'], // gradient
    // stroke: '#01d27e',
    strokeThickness: 2,
    letterSpacing: 10,
    dropShadow: true,
    // dropShadowColor: '#ccced2',
    dropShadowBlur: 0,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
});

export const textStyleSm = new PIXI.TextStyle({
    align: 'center',
    fontFamily: '"Press Start 2P"',
    fontSize: 10,
    fontWeight: '100',
    fill: ['#ffffff'], // gradient
    // stroke: '#01d27e',
    strokeThickness: 2,
    letterSpacing: 5,
    dropShadow: true,
    // dropShadowColor: '#ccced2',
    dropShadowBlur: 0,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 4,
    wordWrap: true,
    wordWrapWidth: unit * 5,
    
});