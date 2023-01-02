import { PieceType, Color } from "../types";
import Cell from "./Cell";

class Piece{
    type: PieceType;
    color: Color;
    render: string[];
    moved: boolean;

    constructor(color, render, type){
        this.color = color;
        this.type = type;
        this.render = render;
        this.moved = false;
    }

    getCellFromCoords(position: [number, number], boardMatrix: Cell[][]): Cell | null
    {
        const [x,y] = position;
        const rank = boardMatrix[x] || [];
        const cell = rank[y];
        return cell;
    }

    CheckMultiDirections(position: [number, number], directions: number[][], boardMatrix:Cell[][]){
        const [x, y] = position;
        directions.forEach(direction =>{
            const [deltaX, deltaY] = direction;

            let nextX = x + deltaX;
            let nextY = y + deltaY;

            if(this.inRange(nextX, nextY)){
                let cell = this.getCellFromCoords([nextX, nextY], boardMatrix);

                while(cell){
                    if(!this.isEmpty(cell) && cell.piece.color == this.color) break;

                    cell.setAvailableMovement(true);
                    if(!this.isEmpty(cell)) break;
                    nextX += deltaX;
                    nextY += deltaY;

                    if(!this.inRange(nextX, nextY)) break;
                    cell = this.getCellFromCoords([nextX, nextY], boardMatrix);
                }
            }
        });
    }

    CheckOneDirection(position: [number, number], directions: number[][], boardMatrix:Cell[][]){
        const [x, y] = position;
        directions.forEach( direction =>{
            const [deltaX, deltaY] = direction;

            let nextX = x + deltaX;
            let nextY = y + deltaY;

            const cell = this.getCellFromCoords([nextX, nextY], boardMatrix);
            if(!cell) return;
            if(cell.piece && cell.piece.color == this.color) return;
            cell.setAvailableMovement(true);

        });
    }

    // eslint-disable-next-Line-no-unsuded-vars
    availableMovements(position: [number, number], boardMatrix: Cell[][]){
        throw new Error(`Missing availableMovements in ${this.type}`);
    }

    inRange(x, y){
        return x>= 0 && x < 8 && y >= 0 && y <8;
    }

    isEmpty(position:Cell){
        const cell = position;
        return !cell.piece;
    }
}

export default Piece;