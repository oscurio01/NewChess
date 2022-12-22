import { PieceType } from '../../types';
import Cell from '../Cell';
import Piece from '../Piece';

class Knight extends Piece{
    constructor(color){
        super(color, ['♞', '♘'], PieceType.isKnight);
    }

    availableMovements(position: [number, number], boardMatrix: Cell[][]){
        
        const directions=[
            [-2, -1],
            [-1, -2],
            [1, -2],
            [2, -1],
            [2, 1],
            [1, 2],
            [-1, 2],
            [-2, 1]
        ];
        
        this.CheckOneDirection(position, directions, boardMatrix);
    }
}

export default Knight;