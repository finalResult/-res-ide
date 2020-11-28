function buttomViewBox( ctx, w, h, pos ) {
    ctx.fillStyle = "#141414";
    ctx.fillRect( 0, 0, w, h );
    ctx.fillStyle = "#141414";
    ctx.fillRect( 0, 1, w, 20 );
    ctx.fillStyle = "#333";
    ctx.fillRect( 0, 20, w, 1 );
    ctx.fillStyle = "#FFF";
    ctx.fillText( "Console", 5,15 );
}