import { PieceType } from '../../types';
import Cell from '../Cell';
import Piece from '../Piece';

class King extends Piece{
    constructor(color){
        super(color, ['♚', '♔'], PieceType.isKing);
    }

    availableMovements(position: [number, number], boardMatrix: Cell[][]){
        
        const directions=[
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
            [-1, -1],
            [-1 , 1],
            [1, -1],
            [1, 1]
        ];
        
        this.CheckOneDirection(position, directions, boardMatrix);
    }
}

export default King;