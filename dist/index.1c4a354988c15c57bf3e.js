(()=>{"use strict";const t=function(){function t(t){this.piece=t,this.selected=!1}return t.prototype.setSelected=function(t){this.selected=t},t.prototype.setPiece=function(t){this.piece=t},t}();var e=function(t,e){var i="function"==typeof Symbol&&t[Symbol.iterator];if(!i)return t;var l,s,h=i.call(t),c=[];try{for(;(void 0===e||e-- >0)&&!(l=h.next()).done;)c.push(l.value)}catch(t){s={error:t}}finally{try{l&&!l.done&&(i=h.return)&&i.call(h)}finally{if(s)throw s.error}}return c},i=function(){function i(e,i,l,s,h,c){this.width=e,this.height=i,this.files=l,this.ranks=s,this.theme=h,this.pieceTheme=c,this.cellWidth=this.width/this.files,this.cellHeight=this.height/this.ranks,this.pieceOffset=.1*this.cellHeight,this.selectedCellPosition=[null,null],this.$canvas=document.createElement("canvas"),this.ctx=this.$canvas.getContext("2d"),this.$canvas.width=this.width,this.$canvas.height=this.height,document.body.appendChild(this.$canvas),document.body.style.display="grid",document.body.style.placeItems="center",document.body.style.height="100%",document.body.parentElement.style.height="100%",document.body.style.backgroundColor="#333333",this.boardMatrix=[];for(var n=0;n<this.files;n++){this.boardMatrix[n]=[];for(var o=0;o<this.ranks;o++)this.boardMatrix[n][o]=new t(null)}this.setSelectedCell=this.setSelectedCell.bind(this),this.setMouseCell=this.setMouseCell.bind(this),this.$canvas.addEventListener("mousedown",this.setSelectedCell),this.$canvas.addEventListener("mouseup",(function(){console.log("Drop"),console.clear()})),this.$canvas.addEventListener("mousemove",this.setMouseCell)}return i.prototype.mouseToCell=function(t,e){return[Math.floor(t/this.cellWidth),Math.floor(e/this.cellHeight)]},i.prototype.setSelectedCell=function(t){var i=t.offsetX,l=t.offsetY,s=e(this.mouseToCell(i,l),2),h=s[0],c=s[1];this.boardMatrix[h][c].setSelected(!0),this.render()},i.prototype.setMouseCell=function(t){var e=t.offsetX,i=t.offsetY;Math.floor(e/this.cellWidth),Math.floor(i/this.cellHeight)},i.prototype.initPlacePiece=function(t,e,i){this.boardMatrix[t][e].setPiece(i)},i.prototype.render=function(){for(var t,e,i=this.theme.light,l=this.theme.dark,s=0;s<this.files;s++)for(var h=0;h<this.ranks;h++){(s+h)%2?(t=i,e=l):(t=l,e=i),this.ctx.fillStyle=t,this.ctx.fillRect(s*this.cellWidth,h*this.cellHeight,this.cellWidth,this.cellHeight),this.ctx.fillStyle=e,this.ctx.textBaseline="top",this.ctx.textAlign="start",this.ctx.font="8px Arial",this.ctx.fillText("[".concat(s,",").concat(h,"]"),s*this.cellWidth+10,h*this.cellHeight+10);var c=this.boardMatrix[s][h];c.selected&&(this.ctx.fillStyle="#ffff00",this.ctx.fillRect(s*this.cellWidth,h*this.cellHeight,this.cellWidth,this.cellHeight));var n=null==c?void 0:c.piece;n&&(this.ctx.textBaseline="middle",this.ctx.textAlign="center",this.ctx.font="72px Arial",this.ctx.fillStyle=n.color,this.ctx.fillText(n.type[0],s*this.cellWidth+this.cellWidth/2,h*this.cellHeight+this.cellHeight/2+this.pieceOffset),this.ctx.fillStyle=this.pieceTheme.dark,this.ctx.fillText(n.type[1],s*this.cellWidth+this.cellWidth/2,h*this.cellHeight+this.cellHeight/2+this.pieceOffset))}},i}();const l=function(t,e){this.type=t,this.color=e};for(var s,h={light:"#ffffff",dark:"#000000"},c=new i(800,800,8,8,{light:"#eed2aa",dark:"#90502f"},h),n=["♚","♔"],o=["♛","♕"],r=["♜","♖"],a=["♝","♗"],d=["♞","♘"],f=["♟","♙"],u=0;u<8;u++)c.initPlacePiece(u,1,new l(f,h.dark)),c.initPlacePiece(u,6,new l(f,h.light));for(u=0;u<2;u++)s=u%2?h.light:h.dark,c.initPlacePiece(0,7*u,new l(r,s)),c.initPlacePiece(7,7*u,new l(r,s)),c.initPlacePiece(1,7*u,new l(a,s)),c.initPlacePiece(6,7*u,new l(a,s)),c.initPlacePiece(2,7*u,new l(d,s)),c.initPlacePiece(5,7*u,new l(d,s)),c.initPlacePiece(4,7*u,new l(o,s)),c.initPlacePiece(3,7*u,new l(n,s));c.render()})();