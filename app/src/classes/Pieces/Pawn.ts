import { Color, PieceType } from '../../types';
import Cell from '../Cell';
import Piece from '../Piece';

class Pawn extends Piece{
    constructor(color: Color){
        super(color, ['♟', '♙'], PieceType.isPawn);
    }

    availableMovements(position: [number, number], boardMatrix: Cell[][]){
        const [x, y] = position;
        const yDirection = this.color == Color.dark ? 1 : - 1;

        for (let i = 1; i <= (this.moved ? 1:2); i++) {
            const cell = this.getCellFromCoords(
                [x, y + i*yDirection], boardMatrix);
            if(cell.piece) break;
            cell.setAvailableMovement(true);
        }
        
        // Attack left or right
        for (let i = 0; i < 2; i++) {
            const enemy = this.getCellFromCoords(
                [x + ( i? 1: -1), y + 1*yDirection], boardMatrix);
            if(enemy && enemy.piece && enemy.piece.color != this.color){
                enemy.setAvailableMovement(true);
            }
        }

    }
}

export default Pawn;