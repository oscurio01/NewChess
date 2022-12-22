import { PieceType } from '../../types';
import Cell from '../Cell';
import Piece from '../Piece';

class Rook extends Piece{
    constructor(color){
        super(color, ['♜', '♖'], PieceType.isRook);
    }

    availableMovements(position: [number, number], boardMatrix: Cell[][]){
        const directions =[
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1]
        ];

        this.CheckMultiDirections(position, directions, boardMatrix);
    }
}

export default Rook;