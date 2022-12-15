(()=>{"use strict";var t=function(){function t(t,i,e,s,l,h){this.width=t,this.height=i,this.files=e,this.ranks=s,this.theme=l,this.pieceTheme=h,this.cellWidth=this.width/this.files,this.cellHeight=this.height/this.ranks,this.pieceOffset=.1*this.cellHeight,this.$canvas=document.createElement("canvas"),this.ctx=this.$canvas.getContext("2d"),this.$canvas.width=this.width,this.$canvas.height=this.height,document.body.appendChild(this.$canvas),document.body.style.display="grid",document.body.style.placeItems="center",document.body.style.height="100%",document.body.parentElement.style.height="100%",document.body.style.backgroundColor="#333333",this.boardMatrix=[];for(var c=0;c<this.files;c++){this.boardMatrix[c]=[];for(var o=0;o<this.ranks;o++)this.boardMatrix[c][o]=null}}return t.prototype.setCell=function(t,i,e){this.boardMatrix[t][i]=e},t.prototype.render=function(){for(var t,i,e=this.theme.light,s=this.theme.dark,l=0;l<this.files;l++)for(var h=0;h<this.ranks;h++){(l+h)%2?(t=e,i=s):(t=s,i=e),this.ctx.fillStyle=t,this.ctx.fillRect(l*this.cellWidth,h*this.cellHeight,this.cellWidth,this.cellHeight),this.ctx.fillStyle=i,this.ctx.textBaseline="top",this.ctx.textAlign="start",this.ctx.font="8px Arial",this.ctx.fillText("[".concat(l,",").concat(h,"]"),l*this.cellWidth+10,h*this.cellHeight+10);var c=this.boardMatrix[l][h].piece;c&&(this.ctx.textBaseline="middle",this.ctx.textAlign="center",this.ctx.font="72px Arial",this.ctx.fillStyle=c.color,this.ctx.fillText(c.type[0],l*this.cellWidth+this.cellWidth/2,h*this.cellHeight+this.cellHeight/2+this.pieceOffset),this.ctx.fillStyle=this.pieceTheme.dark,this.ctx.fillText(c.type[1],l*this.cellWidth+this.cellWidth/2,h*this.cellHeight+this.cellHeight/2+this.pieceOffset))}},t}();for(var i,e={light:"#ffffff",dark:"#000000"},s=new t(800,800,8,8,{light:"#eed2aa",dark:"#90502f"},e),l={isKing:["♚","♔"],isQueen:["♛","♕"],isRook:["♜","♖"],isBishop:["♝","♗"],isKnight:["♞","♘"],isPawn:["♟","♙"]},h=0;h<8;h++)s.setCell(h,1,{type:l.isPawn,color:e.dark}),s.setCell(h,6,{type:l.isPawn,color:e.light});for(h=0;h<2;h++)i=h%2?e.light:e.dark,s.setCell(0,7*h,{type:l.isRook,color:i}),s.setCell(7,7*h,{type:l.isRook,color:i}),s.setCell(1,7*h,{type:l.isBishop,color:i}),s.setCell(6,7*h,{type:l.isBishop,color:i}),s.setCell(2,7*h,{type:l.isKnight,color:i}),s.setCell(5,7*h,{type:l.isKnight,color:i}),s.setCell(4,7*h,{type:l.isQueen,color:i}),s.setCell(3,7*h,{type:l.isKing,color:i});s.render()})();