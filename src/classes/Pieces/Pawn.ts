import { Color, PieceType } from '../../types';
import Cell from '../Cell';
import Piece from '../Piece';

class Pawn extends Piece{
    constructor(color: Color){
        super(color, ['♟', '♙'], PieceType.isPawn);
    }

    availableMovements(position: [number, number], boardMatrix: Cell[][]){
        const [x, y] = position;
        for (let i = 1; i < 3; i++) {
            const cell = boardMatrix[x][this.color == Color.dark ? y + i: y - i ];
            if(cell.piece) break;
            cell.setAvailableMovement(true);
        }

    }
}

export default Pawn;