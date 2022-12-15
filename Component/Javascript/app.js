const WIDTH = 800;
const HEIGHT = 800;

const FILES = 8;
const RANKS = 8;

const CELL_WIDTH = WIDTH / FILES;
const CELL_HEIGHT = HEIGHT / RANKS;

const PIECE_OFFSET = CELL_HEIGHT * 0.1;

const theme = {
    woood:{
        light: '#eed2aa',
        dark: '#90502f'
    }

};

const pieceTheme = {
    light:'#ffffff',
    dark:'#000000'
};

const colorLight = theme.woood.light;
const colorDark = theme.woood.dark;

let rectColor;
let textColor;

//♔,♕,♖,♗,♘,♙
const pieces = {
    isKing: ['♚', '♔'],
    isQueen: ['♛', '♕'],
    isRook: ['♜', '♖'],
    isBishop: ['♝', '♗'],
    isKnight: ['♞', '♘'],
    isPawn: ['♟', '♙']
};

const $canvas = document.createElement('canvas');
const ctx = $canvas.getContext('2d');

$canvas.width = WIDTH;
$canvas.height = HEIGHT;

document.body.appendChild($canvas);

document.body.style.display = 'grid';
document.body.style.placeItems = 'center';
document.body.style.height = '100%';
document.body.parentElement.style.height = '100%';
document.body.style.backgroundColor = '#333333';

// Inicialize Board
const boardMatrix = [];
for (let x = 0; x < FILES; x++) {
    boardMatrix[x] = [];
    for (let y = 0; y < RANKS; y++) {
     boardMatrix[x][y] = null;
    }
}

const renderBoard = () => {
    for (let x = 0; x < FILES; x++) {
        for (let y = 0; y < RANKS; y++) {

         if((x + y) % 2){
            rectColor = colorLight;
            textColor = colorDark;
         }else{
            rectColor = colorDark;
            textColor = colorLight;
         }
    
         ctx.fillStyle = rectColor;
         ctx.fillRect(x * CELL_WIDTH, y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);

         ctx.fillStyle = textColor;

         ctx.textBaseline = 'top';
         ctx.textAlign = 'start';
         ctx.font = '8px Arial';
         ctx.fillText(`[${x},${y}]`,x * CELL_WIDTH + 10, y * CELL_HEIGHT + 10);

         // Draw the piece
         const piece = boardMatrix[x][y];
         if(!piece) continue;
         ctx.textBaseline = 'middle';
         ctx.textAlign = 'center';
         ctx.font = '72px Arial';
         ctx.fillStyle = piece.color;
         ctx.fillText(piece.type[0],x * CELL_WIDTH + CELL_WIDTH / 2, y * CELL_HEIGHT + CELL_HEIGHT /2 + PIECE_OFFSET);
         ctx.fillStyle = pieceTheme.dark;
         ctx.fillText(piece.type[1],x * CELL_WIDTH + CELL_WIDTH / 2, y * CELL_HEIGHT + CELL_HEIGHT /2 + PIECE_OFFSET);
        }
    }
};

// Ubicate Pieces
// Pawn
for (let i = 0; i < RANKS; i++) {
    boardMatrix[i][1] = {
        type: pieces.isPawn,
        color: pieceTheme.dark
    };
    boardMatrix[i][6] = {
        type: pieces.isPawn,
        color: pieceTheme.light
    };
}
// allPieces except pawn
let colortmp;
for (let i = 0; i < 2; i++) {

    colortmp = i % 2 ? pieceTheme.light: pieceTheme.dark;

    boardMatrix[0][i * 7] = {
        type: pieces.isRook,
        color: colortmp
    };
    boardMatrix[7][i * 7] = {
        type: pieces.isRook,
        color: colortmp
    };
    //
    boardMatrix[1][i * 7] = {
        type: pieces.isBishop,
        color: colortmp
    };
    boardMatrix[6][i * 7] = {
        type: pieces.isBishop,
        color: colortmp
    };
    //
    boardMatrix[2][i * 7] = {
        type: pieces.isKnight,
        color: colortmp
    };
    boardMatrix[5][i * 7] = {
        type: pieces.isKnight,
        color: colortmp
    };
    //
    boardMatrix[4][i * 7] = {
        type: pieces.isQueen,
        color: colortmp
    };
    boardMatrix[3][i * 7] = {
        type: pieces.isKing,
        color: colortmp
    };

    
}
// Light

renderBoard();