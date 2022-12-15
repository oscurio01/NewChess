import Board from './classes/Board';
import Piece from './classes/Piece';

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


//♔,♕,♖,♗,♘,♙
const pieces = {
    isKing: ['♚', '♔'],
    isQueen: ['♛', '♕'],
    isRook: ['♜', '♖'],
    isBishop: ['♝', '♗'],
    isKnight: ['♞', '♘'],
    isPawn: ['♟', '♙']
};

// Ubicate Pieces
// Pawn
for (let i = 0; i < RANKS; i++) {
    board.initPlacePiece(i, 1, new Piece(pieces.isPawn, pieceTheme.dark));
    board.initPlacePiece(i, 6, new Piece(pieces.isPawn, pieceTheme.light));
};
// allPieces except pawn
let colortmp;
for (let i = 0; i < 2; i++) {

    colortmp = i % 2 ? pieceTheme.light: pieceTheme.dark;

    board.initPlacePiece(0, (i * 7), new Piece(pieces.isRook, colortmp));
    board.initPlacePiece(7, (i * 7), new Piece(pieces.isRook, colortmp));
    //
    board.initPlacePiece(1, (i * 7), new Piece(pieces.isBishop, colortmp));
    board.initPlacePiece(6, (i * 7), new Piece(pieces.isBishop, colortmp));
    //
    board.initPlacePiece(2, (i * 7), new Piece(pieces.isKnight, colortmp));
    board.initPlacePiece(5, (i * 7), new Piece(pieces.isKnight, colortmp));
    //
    board.initPlacePiece(4, (i * 7), new Piece(pieces.isQueen, colortmp));
    board.initPlacePiece(3, (i * 7), new Piece(pieces.isKing, colortmp));

    
}
// Light

board.render();