export enum pathTypes{
    line="line",
    polyline="polyline",
    curve="curve"
}
export enum pathStyles{
    default="default",
    dashed="dashed",
    dotted="dotted"
}
export interface iPath{
    size:number,
    opacity:number,
    color:string,
    pathType: pathTypes,
    roundCap: boolean,
    pathStyle:pathStyles,
    dashArray: number[],
    dotArray: number[]
}
