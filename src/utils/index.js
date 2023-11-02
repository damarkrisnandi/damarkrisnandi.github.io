export const unit = 16;
export const width = window.innerWidth;
export const height = window.innerHeight;

const maxY = (object) => Math.max(...object.map(t => t.nowy + 1))
const maxX = (object) => Math.max(...object.map(t => t.nowx + 1))
export const center = (object) => {return {x: Math.floor(width/(2*unit)) - Math.floor(maxX(object)/2), y: height/(2*unit) - Math.floor(maxY(object)/2)}}