import { PieceType } from '../../types';
import Piece from '../Piece';

class Rook extends Piece{
    constructor(color){
        super(color, ['♜', '♖'], PieceType.isRook);
    }
}

export default Rook;