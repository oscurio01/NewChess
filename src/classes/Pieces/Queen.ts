import { PieceType } from '../../types';
import Piece from '../Piece';

class Queen extends Piece{
    constructor(color){
        super(color, ['♛', '♕'], PieceType.isQueen);
    }
}

export default Queen;