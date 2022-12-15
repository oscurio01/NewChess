import Piece from './Piece';
import {Theme} from '../types';
import Cell from './Cell';
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

    selectedCellPosition: [number, number];

    boardMatrix: Cell[][];

    $canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(width, height, files, ranks, theme, pieceTheme){

        this.width = width;
        this.height = height;
        this.files = files;
        this.ranks = ranks;
        this.theme = theme;
        this.pieceTheme = pieceTheme;

        this.cellWidth = this.width / this.files;
        this.cellHeight = this.height / this.ranks;

        this.pieceOffset = this.cellHeight * 0.1;

        this.selectedCellPosition = [null, null];

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
        this.setMouseCell = this.setMouseCell.bind(this);

        // Mouse Events
        this.$canvas.addEventListener("mousedown", this.setSelectedCell);

        this.$canvas.addEventListener("mouseup", ()=>{
            console.log("Drop");
            console.clear();
        });

        this.$canvas.addEventListener("mousemove", this.setMouseCell);

    }

    mouseToCell(x: number, y: number){
        const files = Math.floor(x/this.cellWidth);
        const ranks = Math.floor(y / this.cellHeight);
        return [files, ranks];
    }

    setSelectedCell(event:MouseEvent){
        const {offsetX, offsetY} = event;
        const [file, rank] = this.mouseToCell(offsetX, offsetY);
        const cell = this.boardMatrix[file][rank];
        cell.setSelected(true);
        this.render();
    }

    private setMouseCell(event: MouseEvent){
        const {offsetX, offsetY} = event;
        let x, y;

        x = Math.floor(offsetX/this.cellWidth);
        y = Math.floor(offsetY / this.cellHeight);

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
    
                if((x + y) % 2){
                    rectColor = colorLight;
                    textColor = colorDark;
                }else{
                    rectColor = colorDark;
                    textColor = colorLight;
                }
            
                this.ctx.fillStyle = rectColor;
                this.ctx.fillRect(x * this.cellWidth, y * this.cellHeight, this.cellWidth, this.cellHeight);
        
                this.ctx.fillStyle = textColor;
        
                this.ctx.textBaseline = 'top';
                this.ctx.textAlign = 'start';
                this.ctx.font = '8px Arial';
                this.ctx.fillText(`[${x},${y}]`,x * this.cellWidth + 10, y * this.cellHeight + 10);
        
                // Draw the piece
                const cell = this.boardMatrix[x][y];

                if(cell.selected){
                    this.ctx.strokeStyle = '#ffff00';
                    this.ctx.lineWidth = 8;
                    this.ctx.lineJoin = 'bevel';
                    this.ctx.strokeRect(x * this.cellWidth, y * this.cellHeight, this.cellWidth, this.cellHeight);
                }

                const piece = cell?.piece;
                
                if(!piece) continue;
                this.ctx.textBaseline = 'middle';
                this.ctx.textAlign = 'center';
                this.ctx.font = '72px Arial';
                this.ctx.fillStyle = piece.color;
                this.ctx.fillText(piece.type[0],
                    x * this.cellWidth + this.cellWidth / 2, 
                    y * this.cellHeight + this.cellHeight /2 + this.pieceOffset
                );
                    this.ctx.fillStyle = this.pieceTheme.dark;
                this.ctx.fillText(piece.type[1],
                    x * this.cellWidth + this.cellWidth / 2, 
                    y * this.cellHeight + this.cellHeight /2 + this.pieceOffset
                );
            }
        }
    }
}

export default Board;