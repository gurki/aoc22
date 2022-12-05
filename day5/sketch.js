let data;
const reCrate = /(\[\w\]\s?)|(\s{3}\s?)/g;
const reMove = /move (\d+) from (\d+) to (\d+)/;
let stacks; //  column major
let moves;
let maxStacks = 0;
let moveId = 0;


function preload() {
    data = loadStrings( "input.txt" );
}


function reduce( stacks, move ) {
    const count = move[ 0 ];
    const from = move[ 1 ] - 1;
    const to = move[ 2 ] - 1;
    console.log( count, from + 1, to + 1 );
    console.log( stacks[ from ], stacks[ to ] );
    const cargo = stacks[ from ].slice( -count );
    console.log( cargo );
    stacks[ from ] = stacks[ from ].slice( 0, -count );
    stacks[ to ] = stacks[ to ].concat( cargo );
    console.log( stacks[ from ], stacks[ to ] );
    console.log();
    return stacks;
}


function setup() {

    createCanvas( windowWidth, windowHeight );
    noLoop();

    //  parse rows of crates

    const stacksRowMajor = data.slice( 0, 8 ).reverse().map(
        row => [ ...row.matchAll( reCrate ) ].map(
            crate => crate[0].slice( 1, 2 )
        )
    );

    //  convert to column major and drop empty crates

    stacks = new Array( stacksRowMajor[ 0 ].length );

    for ( let col = 0; col < stacksRowMajor[ 0 ].length; col++ ) {
        stacks[ col ] = [];
        for ( let row = 0; row < stacksRowMajor.length; row++ ) {
            const item = stacksRowMajor[ row ][ col ];
            if ( item.match( /\s/ ) === null ) stacks[ col ].push( item );
        }
        maxStacks = Math.max( maxStacks, stacks[ col ].length );
    }

    //  parse moves

    moves = data.slice( 10 ).map(
        line => [ ...line.match( reMove ) ]
    ).map(
        match => match.slice( 1 ).map( Number )
    );

    colorMode( HSL );
    window.setInterval( step, 10 );

}


function keyPressed() {
    handleKeys();
}


function step() {

    // if ( ! keyIsDown( 32 ) ) return;
    if ( moveId >= moves.length ) return;

    console.log( Math.round( 10000 * moveId / ( moves.length - 1 ) ) / 100 );

    stacks = reduce( stacks, moves[ moveId ] );
    maxStacks = stacks.reduce( ( acc, curr ) => Math.max( acc, curr.length ), 0 );
    console.log( stacks.map( col => col.at( -1 ) ).join( "" ));
    moveId++;

    draw();

}


function draw() {

    background( "#21252b" );

    const m = 10;
    const w = ( windowWidth - 2 * m ) / stacks.length;
    const h = ( windowHeight - 2 * m ) / maxStacks;
    const hm = 120;
    const ho = 240;
    const lmin = 40;
    const lmax = 60;

    textAlign( CENTER, CENTER );
    textSize( h / 2 );

    for ( let col = 0; col < stacks.length; col++ ) {
        for ( let row = 0; row < stacks[ col ].length; row++ ) {

            const x = m + col * w;
            const y = windowHeight - m - ( row + 1 ) * h;
            const crate = stacks[ col ][ row ];
            const val = ( crate.charCodeAt() - 65 ) / ( 90 - 65 );
            const hue = ( val * ( 360 - 2 * hm ) + hm + ho ) % 360;
            const lightness = val * ( lmax - lmin ) + lmin;

            fill( hue, 80, lightness );
            rect( x, y, w, h );
            fill( "black" );
            text( crate, x + w / 2, y + h / 2 );

        }
    }

    save( "frame" + ( moveId + "").padStart( 3, '0' ) + ".png" );

}