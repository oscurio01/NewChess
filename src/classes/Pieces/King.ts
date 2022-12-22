import { PieceType } from '../../types';
import Cell from '../Cell';
import Piece from '../Piece';

class King extends Piece{
    constructor(color){
        super(color, ['♚', '♔'], PieceType.isKing);
    }

    isCastling(position:[number, number]){
        const [x, y] = position;
        return ((y == 7 || y == 0) && (x == 6 || x == 2));
    }

    Castle(position: [number, number], boardMatrix: Cell[][]){
        const [x, y] = position;
        if(x == 6){
            const rook = boardMatrix[7][y];
            boardMatrix[5][y].setPiece(rook.piece);
            rook.setPiece(null);
        }else if(x == 2){
            const rook = boardMatrix[0][y];
            boardMatrix[3][y].setPiece(rook.piece);
            rook.setPiece(null);
        }
    }

    availableMovements(position: [number, number], boardMatrix: Cell[][]){
        const [x, y] = position;
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

        if(this.moved) return;

        const cellKingSide1 = this.getCellFromCoords([x + 1, y], boardMatrix);
        const cellKingSide2 = this.getCellFromCoords([x + 2, y], boardMatrix);
        const cellKingCastlingRook = this.getCellFromCoords([x + 3, y], boardMatrix);

        const cellKingSide =[cellKingSide1, cellKingSide2];

        this.Castling(cellKingSide, cellKingSide2, cellKingCastlingRook);

        const cellQueenSide1 = this.getCellFromCoords([x - 1, y], boardMatrix);
        const cellQueenSide2 = this.getCellFromCoords([x - 2, y], boardMatrix);
        const cellQueenSide3 = this.getCellFromCoords([x - 3, y], boardMatrix);
        const cellQueenCastlingRook = this.getCellFromCoords([x - 4, y], boardMatrix);

        const cellQueenSide =[cellQueenSide1, cellQueenSide2, cellQueenSide3];

        this.Castling(cellQueenSide, cellQueenSide2, cellQueenCastlingRook);
        
    }

    Castling(cells:Cell[], cellCastling:Cell, CastilingRook:Cell){
        let noPiece:boolean = true;

        cells.forEach(cell => {
            noPiece = this.isEmpty(cell);
        });

        //SomePieceInMiddle
        if(!noPiece) return;

        if(CastilingRook.piece == null) return;
        console.log(CastilingRook.piece);

        if(CastilingRook.piece.type == PieceType.isRook && !CastilingRook.piece.moved){
            cellCastling.setAvailableMovement(true);
            // cells[0].setPiece(CastilingRook.piece);
            // CastilingRook.setPiece(null);
        }
    }
}

export default King;