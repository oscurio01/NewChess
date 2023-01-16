import Board from './classes/board';
import Piece from './classes/Piece';
import Bishop from './classes/Pieces/Bishop';
import King from './classes/Pieces/King';
import Knight from './classes/Pieces/Knight';
import Pawn from './classes/Pieces/Pawn';
import Queen from './classes/Pieces/Queen';
import Rook from './classes/Pieces/Rook';
import { Color, PieceType } from './types';

import socket from './helpers/socket';

const WIDTH = 800;
const HEIGHT = 800;

const FILES = 8;
const RANKS = 8;

const theme = {
    light: '#eed2aa',
    dark: '#90502f',


};

const pieceTheme = {
    light:'#ffffff',
    dark:'#000000'
};

const board = new Board(WIDTH, HEIGHT, FILES, RANKS, theme, pieceTheme);

// Ubicate Pieces

socket.on('init board', (serverPieces) =>{
    //console.log("bobo " + serverPieces);
    board.render();
    serverPieces.forEach((rank, y) =>{
        rank.forEach((p, x) =>{
            if(!p) return;
                const [colorType, pieceType = ''] = p.split('');
    
                const color = colorType == 'b'? Color.dark : Color.light;
                let piece;
                if(pieceType == PieceType.isPawn) piece = new Pawn(color);
                if(pieceType == PieceType.isRook) piece = new Rook(color);
                if(pieceType == PieceType.isKnight) piece = new Knight(color);
                if(pieceType == PieceType.isBishop) piece = new Bishop(color);
                if(pieceType == PieceType.isQueen) piece = new Queen(color);
                if(pieceType == PieceType.isKing) piece = new King(color);
    
                board.initPlacePiece(x, y, piece);
            }
        );
    });
    board.render();
});



// // Pawn
// for (let i = 0; i < RANKS; i++) {
//     board.initPlacePiece(i, 1, new Pawn(Color.dark));
//     board.initPlacePiece(i, 6, new Pawn(Color.light));
// };
// // allPieces except pawn
// let colortmp;
// for (let i = 0; i < 2; i++) {

//     colortmp = i % 2 ? Color.light: Color.dark;

//     board.initPlacePiece(0, (i * 7), new Rook(colortmp));
//     board.initPlacePiece(7, (i * 7), new Rook(colortmp));
//     //
//     board.initPlacePiece(1, (i * 7), new Knight(colortmp));
//     board.initPlacePiece(6, (i * 7), new Knight(colortmp));
//     //
//     board.initPlacePiece(2, (i * 7), new Bishop(colortmp));
//     board.initPlacePiece(5, (i * 7), new Bishop(colortmp));
//     //
//     board.initPlacePiece(3, (i * 7), new Queen(colortmp));
//     board.initPlacePiece(4, (i * 7), new King(colortmp));

    
// }
// Light

board.render();

