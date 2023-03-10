import {Color, PieceType, Theme} from '../types';
import Cell from './Cell';
import King from './Pieces/King';

import socket from '../helpers/socket';

// Why do you still exist Again
class Board{
    width: number;
    height: number;
    files: number;
    ranks: number;
    theme: Theme;
    pieceTheme:Theme;

    cellWidth: number;
    cellHeight: number;
    pieceOffset: number;

    previousCell: Cell;
    previousCellXY = [];
    selectedCells:Cell[];

    boardMatrix: Cell[][];

    disabled: boolean;
    flip:boolean;

    $canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(width, height, files, ranks, theme, pieceTheme){

        this.width = width;
        this.height = height;
        this.files = files;
        this.ranks = ranks;
        this.theme = theme;
        this.pieceTheme = pieceTheme;

        this.disabled = true;
        this.flip = false;

        this.cellWidth = this.width / this.files;
        this.cellHeight = this.height / this.ranks;

        this.pieceOffset = this.cellHeight * 0.1;

        this.previousCell = null;
        this.previousCellXY = null;
        this.selectedCells = [];

        this.$canvas = document.createElement('canvas');
        this.ctx = this.$canvas.getContext('2d');

        this.$canvas.width = this.width;
        this.$canvas.height = this.height;

        document.body.appendChild(this.$canvas);

        document.body.style.display = 'grid';
        document.body.style.placeItems = 'center';
        document.body.style.height = '100%';
        document.body.parentElement.style.height = '100%';
        document.body.style.backgroundColor = '#333333';

        // Inicialize Board
        this.boardMatrix = [];
        for (let x = 0; x < this.files; x++) {
            this.boardMatrix[x] = [];
            for (let y = 0; y < this.ranks; y++) {
                this.boardMatrix[x][y] = new Cell(null);
            }
        };

        // Bind Methods
        this.setSelectedCell = this.setSelectedCell.bind(this);
        this.pickPiece = this.pickPiece.bind(this);
        this.dropPiece = this.dropPiece.bind(this);
        this.onSocketMove = this.onSocketMove.bind(this);
        this.onSocketTurn = this.onSocketTurn.bind(this);
        this.onSocketBlack = this.onSocketBlack.bind(this);

        // Mouse Events
        this.$canvas.addEventListener("mousedown", this.pickPiece);

        this.$canvas.addEventListener("mouseup", this.dropPiece);
        //console.clear();
        // Socket Events
        socket.on('move', this.onSocketMove);
        socket.on('u turn', this.onSocketTurn);
        socket.on('enemy turn', this.onSocketBlack);


    }

    onSocketMove([prev, next]){
        const [xPrev, yPrev] = prev;
        const [xNext, yNext] = next;

        console.log({xPrev, yPrev, xNext, yNext});

        const cell = this.boardMatrix[xNext][yNext];
        const previousCell = this.boardMatrix[xPrev][yPrev];

        cell.setPiece(previousCell.piece);

        cell.setSelected(true);
        this.selectedCells.push(cell);
        
        previousCell.piece.moved = true;
        previousCell.setPiece(null);
        this.previousCell = null;

        this.disabled = true;
        //this.flip = !this.flip;
        this.clearAvailableMoves();

        this.render();
    }

    onSocketTurn(){
        this.disabled = false;
        //this.render();
    }

    onSocketBlack(){
        this.flip = true;
        this.render();
    }

    mouseToCell(x: number, y: number){
        let file = Math.floor(x/this.cellWidth);
        let rank = Math.floor(y / this.cellHeight);
        if(this.flip){
            file = this.files - 1 - file;
            rank = this.ranks - 1 - rank;
        }
        return [file, rank];
    }

    clearSelections(){
        this.selectedCells.forEach(c => c.setSelected(false));
        this.selectedCells = [];
    }

    clearAvailableMoves(){
        this.boardMatrix.forEach((file) => {
            file.forEach((cell) => {
                cell.setAvailableMovement(false);
            });
        });
    }

    pickPiece(event:MouseEvent){
        if(this.disabled) return;
        this.clearSelections();
        this.clearAvailableMoves();
        if(this.previousCell) return;

        const {offsetX, offsetY} = event;
        const [file, rank] = this.mouseToCell(offsetX, offsetY);
        const cell = this.boardMatrix[file][rank];

        if(!cell.piece) return;
        if((this.flip && cell.piece.color == Color.light)||
         (!this.flip && cell.piece.color == Color.dark)) return;

        cell.piece.availableMovements([file,rank], this.boardMatrix);

        this.previousCellXY = [file, rank];
        this.previousCell = cell;
        this.selectedCells.push(cell);
        cell.setSelected(true);
        this.render();
    }

    dropPiece(event:MouseEvent){
        if(!this.previousCell) return;

        const {offsetX, offsetY} = event;
        const [file, rank] = this.mouseToCell(offsetX, offsetY);
        const cell = this.boardMatrix[file][rank];

        if(!cell.availableMove || cell == this.previousCell)
        { 
            this.previousCell = null;
            this.clearSelections();
            //this.clearAvailableMoves();
            this.render();
            return;
        }
        
        if(this.previousCell.piece.type == PieceType.isKing){
            const kingPiece = this.previousCell.piece as King;
            if(!kingPiece.moved
                || kingPiece.isCastling([file, rank])){
                    kingPiece.Castle([file, rank], this.boardMatrix);
                }
        }
        //console.log({drop: this.previousCell.piece});
        

        socket.emit('move', [this.previousCellXY, [file,rank]]);

    }

    setSelectedCell(event:MouseEvent){
        const {offsetX, offsetY} = event;
        const [file, rank] = this.mouseToCell(offsetX, offsetY);
        const cell = this.boardMatrix[file][rank];
        cell.setSelected(true);
        this.render();
    }

    initPlacePiece(x, y, piece){
        const cell = this.boardMatrix[x][y];
        cell.setPiece(piece);
    }

    render(){

        const colorLight = this.theme.light;
        const colorDark = this.theme.dark;

        let rectColor;
        let textColor;

        for (let x = 0; x < this.files; x++) {
            for (let y = 0; y < this.ranks; y++) {
                
                let drawX = x;
                let drawY = y;

                if(this.flip){
                    drawX = this.ranks - 1 - drawX;
                    drawY = this.ranks - 1 - drawY;
                }


                if((drawX + drawY) % 2){
                    rectColor = colorLight;
                    textColor = colorDark;
                }else{
                    rectColor = colorDark;
                    textColor = colorLight;
                }
                // Draw Cell
                this.ctx.fillStyle = rectColor;
                this.ctx.fillRect(drawX * this.cellWidth, drawY * this.cellHeight, this.cellWidth, this.cellHeight);
  
                // Draw the piece
                const cell = this.boardMatrix[x][y];

                if(cell.selected){
                    this.ctx.fillStyle = '#ffff00';
                    this.ctx.globalAlpha = 0.7;
                    this.ctx.fillRect(drawX * this.cellWidth, drawY * this.cellHeight, this.cellWidth, this.cellHeight);
                    this.ctx.globalAlpha = 1;
                }

                if(cell.availableMove ){
                    this.ctx.fillStyle = '#000000';
                    this.ctx.globalAlpha = 0.3;
                    this.ctx.beginPath();
                    this.ctx.arc(
                        drawX * this.cellWidth + this.cellWidth/2, 
                        drawY * this.cellHeight + this.cellHeight/2, 
                        16, 
                        0, 
                        2 * Math.PI
                    );
                    this.ctx.fill();
                    this.ctx.globalAlpha = 1;
                }

                // Draw Debug position
                this.ctx.fillStyle = textColor;
                this.ctx.textBaseline = 'top';
                this.ctx.textAlign = 'start';
                this.ctx.font = '8px Arial';
                this.ctx.fillText(`[${drawX},${drawY}]`,drawX * this.cellWidth + 10, drawY * this.cellHeight + 10);                

                const piece = cell?.piece;
                
                if(!piece) continue;
                this.ctx.textBaseline = 'middle';
                this.ctx.textAlign = 'center';
                this.ctx.font = '72px Arial';
                this.ctx.fillStyle = this.pieceTheme[piece.color];
                this.ctx.fillText(piece.render[0],
                    drawX * this.cellWidth + this.cellWidth / 2, 
                    drawY * this.cellHeight + this.cellHeight /2 + this.pieceOffset
                );
                    this.ctx.fillStyle = this.pieceTheme.dark;
                this.ctx.fillText(piece.render[1],
                    drawX * this.cellWidth + this.cellWidth / 2, 
                    drawY * this.cellHeight + this.cellHeight /2 + this.pieceOffset
                );
            }
        }
    }
}

export default Board;