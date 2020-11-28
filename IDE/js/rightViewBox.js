function rightViewBox( ctx, w, h, pos ) {
    ctx.font = fontSize + "px Monaco";
    let c = Count( Current, "\n" ),
        i,
        j = 1,
        min = 4294967296,
        l,
        mi;
    let xp = 10 + ctx.measureText( c.toString() ).width,
        yp = 20;
    for (i = 0;i < Current.length;i++) {
        xp += ctx.measureText( Current[i] ).width;
        l = getLength( xp, yp, pos.x, pos.y );
        if (l < min) min = l, mi = i;
        if ( (Cursor === i) && (((new Date).getMilliseconds()) % 1000 < 500) ) ctx.path(function (){
            ctx.fillStyle = "#FFF";
            ctx.fillRect(xp, yp - 13, 2, 16);
        });
        if (Current[i] === "\n"){
            ctx.fillStyle = "#555";
            ctx.fillText( j.toString(), 5, yp );
            xp = 10 + ctx.measureText( c.toString() ).width;
            yp += 20;
            j++;
        } else {
            ctx.path(function () {
                ctx.fillStyle = "#FFF";
                ctx.fillText(Current[i], xp, yp);
            });
        }
    }
    ctx.fillStyle = "#555";
    ctx.fillText( j.toString(), 5, yp );
    if ( MouseDown ) Cursor = mi;
}