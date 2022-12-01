let lines = [];
let groups = [];    // [ 234,                       345987,        , ... ]
                    // [ 345987345,                 234,           , ... ]
let groupList = []; // [ [ 12397, 123987, 234987 ]. [ 234234, 234 ], ... ]
let maxCal = 0;

function preload() {
    lines = loadStrings( "input.txt" );
}


function setup() {

    createCanvas( windowWidth, windowHeight );

    let group = 0;
    let list = [];

    for ( const line of lines ) {

        if ( line.length === 0 ) {
            groups.push( group );
            groupList.push( list );
            list = [];
            group = 0;
            continue;
        }

        const cal = Number( line );
        maxCal = Math.max( cal, maxCal );
        list.push( cal );
        group += cal;

    }

    groups.sort( ( a, b ) => b - a );
    console.log( groups[ 0 ] );
    console.log( groups[ 0 ] + groups[ 1 ] + groups[ 2 ] );

    const sum = a => a.reduce( ( acc, curr ) => acc + curr, 0 );
    groupList.sort( ( a, b ) => sum( b ) - sum( a ) );
    console.log( groupList );

    noLoop();
}


function draw() {

    const m = 10;
    const n = groups.length;
    background( "#333" );
    scale( 1, -1 );
    translate( 0, -windowHeight );
    colorMode( HSL );

    const w = ( windowWidth - 2 * m ) / n;
    const h = windowHeight - 2 * m;
    const max = groups[ 0 ];
    const Lm = 10;

    for ( let i = 0; i < n; i++ ) {

        let y = m;
        const H = 360 * i / n;

        for ( const cal of groupList[ i ] ) {

            const val = cal / max;
            const currH = h * val;
            const x = m + i * w;
            const L = ( 100 - 2 * Lm ) * cal / maxCal + Lm;
            const L2 = ( 100 - 2 * 30 ) * cal / maxCal + 30;
            fill( L, 80, L2 );
            rect( x, y, w, currH );
            y += currH;

        }

    }

    save( "day1.png" );

}