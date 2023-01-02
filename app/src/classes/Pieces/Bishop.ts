import { PieceType } from '../../types';
import Cell from '../Cell';
import Piece from '../Piece';

class Bishop extends Piece{
    constructor(color){
        super(color, ['♝', '♗'], PieceType.isBishop);
    }

    availableMovements(position: [number, number], boardMatrix: Cell[][]){

        const directions =[
            [-1, -1],
            [1, -1],
            [-1, 1],
            [1, 1]
        ];
        this.CheckMultiDirections(position, directions, boardMatrix);

    }
}

export default Bishop;