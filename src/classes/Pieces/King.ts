import { PieceType } from '../../types';
import Piece from '../Piece';

class King extends Piece{
    constructor(color){
        super(color, ['♚', '♔'], PieceType.isKing);
    }
}

export default King;