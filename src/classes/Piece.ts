import { PieceType, Color } from "../types";
import Cell from "./Cell";

class Piece{
    type: PieceType;
    color: Color;
    render: string[];

    constructor(color, render, type){
        this.color = color;
        this.type = type;
        this.render = render;
    }

    // eslint-disable-next-Line-no-unsuded-vars
    availableMovements(position: [number, number], boardMatrix: Cell[][]){
        throw new Error(`Missing availableMovements in ${this.type}`);
    }

    inRange(x, y){
        return x>= 0 && x < 8 && y >= 0 && y <8;
    }
}

export default Piece;