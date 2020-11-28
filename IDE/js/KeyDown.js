let charList = {
    8: "[backspace]",
    9: "[tab]",
    13: "[enter]",
    16: "[shift]",
    17: "[ctrl]",
    18: "[alt]",
    20: "[capsLock]",
    32: "  ",
    37: "[left]",
    38: "[up]",
    39: "[right]",
    40: "[down]",
    46: "[delete]",
    186: ";:",
    187: "=+",
    188: ",<",
    189: "-_",
    190: ".>",
    191: "/?",
    192: "`~",
    219: "[{",
    220: "\\|",
    221: "]}",
    222: "'\""
}

let numberChars = "0)1!2@3#4$5%6^7&8*9(",
    letters = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ";

//48 -- 57 : 0 -- 9
//65 -- 90 : aA -- zZ

function insert( string, cursor ) {
    Current = Current.slice( 0, cursor ) + string + Current.slice( cursor );
}

function del( s, e ) {
    let k;
    if ( s > e ) {k = s;s = e;e = k;}
    if ( s < 0 ) s = 0;
    if ( e > Current.length - 1 ) e = Current.length - 1;
    Current = Current.slice( 0, s ) + Current.slice( e );
}

function keys( e ) {
    let i,
        onShift = e.shiftKey;
    if ( charList.hasOwnProperty( e.keyCode ) ) {
        if ( charList[ e.keyCode ][0] + charList[ e.keyCode ][ charList[ e.keyCode ].length - 1 ] === "[]" ) {
            switch ( charList[ e.keyCode ] ) {
                case "[backspace]":
                    del( Cursor - 1, Cursor-- );
                    break;
                case "[delete]":
                    del( Cursor, Cursor + 1 );
                    break;
                case "[enter]":
                    insert( "\n", Cursor++ );
                    break;
            }
        } else insert( charList[ e.keyCode ][ onShift * 1 ].toString(), Cursor++ );
    } else {
        for ( i = 48; i < 58; i++ ) if ( e.keyCode === i ) insert( numberChars[ i * 2 - 96 + onShift ], Cursor++ );
        for ( i = 65; i < 91; i++ ) if ( e.keyCode === i ) insert( letters[ i * 2 - 130 + onShift ], Cursor++ );
    }
    if ( Cursor < 0 ) Cursor = 0;
    if ( Cursor > Current.length - 1 ) Cursor = Current.length - 1;
    SyntaxHighLighting();
}