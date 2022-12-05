let input;


function preload() {
    input = loadStrings( "input.txt" );
}


function setup() {
    createCanvas( windowWidth, windowHeight );
    noLoop();
}


function draw() {

    background( "#21252b" );
    scale( 1, -1 );
    translate( 0, -windowHeight );
    colorMode( HSL );

}