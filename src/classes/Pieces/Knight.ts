import { PieceType } from '../../types';
import Piece from '../Piece';

class Knight extends Piece{
    constructor(color){
        super(color, ['♞', '♘'], PieceType.isKnight);
    }
}

export default Knight;