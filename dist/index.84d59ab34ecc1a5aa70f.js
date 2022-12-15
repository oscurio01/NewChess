(()=>{"use strict";var t=function(){function t(t,e,i,s,l,h){this.width=t,this.height=e,this.files=i,this.ranks=s,this.theme=l,this.pieceTheme=h,this.cellWidth=this.width/this.files,this.cellHeight=this.height/this.ranks,this.pieceOffset=.1*this.cellHeight,this.$canvas=document.createElement("canvas"),this.ctx=this.$canvas.getContext("2d"),this.$canvas.width=this.width,this.$canvas.height=this.height,document.body.appendChild(this.$canvas),document.body.style.display="grid",document.body.style.placeItems="center",document.body.style.height="100%",document.body.parentElement.style.height="100%",document.body.style.backgroundColor="#333333",this.boardMatrix=[];for(var c=0;c<this.files;c++){this.boardMatrix[c]=[];for(var n=0;n<this.ranks;n++)this.boardMatrix[c][n]=null}this.setMouseCell=this.setMouseCell.bind(this),this.$canvas.addEventListener("mousedown",(function(){console.log("Drag")})),this.$canvas.addEventListener("mouseup",(function(){console.log("Drop"),console.clear()})),this.$canvas.addEventListener("mousemove",this.setMouseCell)}return t.prototype.setMouseCell=function(t){var e,i,s,l,h=t.offsetX,c=t.offsetY;e=Math.floor(h/this.cellWidth),i=Math.floor(c/this.cellHeight),e==s&&i==l||(s=e,l=i,console.log(s,l,e,i))},t.prototype.setCell=function(t,e,i){this.boardMatrix[t][e]=i},t.prototype.render=function(){for(var t,e,i,s=this.theme.light,l=this.theme.dark,h=0;h<this.files;h++)for(var c=0;c<this.ranks;c++){(h+c)%2?(e=s,i=l):(e=l,i=s),this.ctx.fillStyle=e,this.ctx.fillRect(h*this.cellWidth,c*this.cellHeight,this.cellWidth,this.cellHeight),this.ctx.fillStyle=i,this.ctx.textBaseline="top",this.ctx.textAlign="start",this.ctx.font="8px Arial",this.ctx.fillText("[".concat(h,",").concat(c,"]"),h*this.cellWidth+10,c*this.cellHeight+10);var n=null===(t=this.boardMatrix[h][c])||void 0===t?void 0:t.piece;n&&(this.ctx.textBaseline="middle",this.ctx.textAlign="center",this.ctx.font="72px Arial",this.ctx.fillStyle=n.color,this.ctx.fillText(n.type[0],h*this.cellWidth+this.cellWidth/2,c*this.cellHeight+this.cellHeight/2+this.pieceOffset),this.ctx.fillStyle=this.pieceTheme.dark,this.ctx.fillText(n.type[1],h*this.cellWidth+this.cellWidth/2,c*this.cellHeight+this.cellHeight/2+this.pieceOffset))}},t}();const e=function(t,e){this.type=t,this.color=e};for(var i,s={light:"#ffffff",dark:"#000000"},l=new t(800,800,8,8,{light:"#eed2aa",dark:"#90502f"},s),h=["♚","♔"],c=["♛","♕"],n=["♜","♖"],o=["♝","♗"],a=["♞","♘"],r=["♟","♙"],d=0;d<8;d++)l.setCell(d,1,new e(r,s.dark)),l.setCell(d,6,new e(r,s.dark));for(d=0;d<2;d++)i=d%2?s.light:s.dark,l.setCell(0,7*d,new e(n,i)),l.setCell(7,7*d,new e(n,i)),l.setCell(1,7*d,new e(o,i)),l.setCell(6,7*d,new e(o,i)),l.setCell(2,7*d,new e(a,i)),l.setCell(5,7*d,new e(a,i)),l.setCell(4,7*d,new e(c,i)),l.setCell(3,7*d,new e(h,i));l.render()})();