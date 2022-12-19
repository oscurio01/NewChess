import { PieceType } from '../../types';
import Cell from '../Cell';
import Piece from '../Piece';

class Bishop extends Piece{
    constructor(color){
        super(color, ['♝', '♗'], PieceType.isBishop);
    }

    availableMovements(position: [number, number], boardMatrix: Cell[][]){
        const [x, y] = position;
        const directions =[
            [-1, -1],
            [1, -1],
            [-1, 1],
            [1, 1]
        ];
        directions.forEach(direction =>{
            const [deltaX, deltaY] = direction;

            let nextX = x + deltaX;
            let nextY = y + deltaY;

            if(this.inRange(nextX, nextY)){
                let cell = boardMatrix[nextX][nextY];

                while(cell && !cell.piece){
                    cell.setAvailableMovement(true);

                    nextX += deltaX;
                    nextY += deltaY;

                    if(!this.inRange(nextX, nextY)) break;
                    cell = boardMatrix[nextX][nextY];
                }

                if(cell && cell.piece && cell.piece.color != this.color){
                    cell.setAvailableMovement(true);
                }
            }
        });

    }
}

export default Bishop;