let data;

function preload() {
  data = loadStrings( "input.txt" );
}

console.log( "a".charCodeAt(), "z".charCodeAt(), "A".charCodeAt(), "Z".charCodeAt() );

function setup() {

  createCanvas(400, 400);

  const charToScore = c => ( c >= 97 ? c - 96 : c - 65 + 27 );
  let totalScoreA = 0;

  for ( const line of data ) {
    const s1 = new Set( line.slice( 0, line.length / 2 ) );
    const s2 = new Set( line.slice( line.length / 2, line.length ));
    const inter = [...s1].filter( x => s2.has( x ) );
    const res = inter.map( x => charToScore( x.charCodeAt() ) );
    const score = res.reduce( ( acc, curr ) => acc + curr, 0 );
    totalScoreA += score;
  }

  console.log( totalScoreA );
  let totalScoreB = 0;

  for ( let i = 0; i < data.length; i += 3 ) {
    const s1 = new Set( data[i]);
    const s2 = new Set( data[i+1] );
    const s3 = new Set( data[i+2] );
    let inter1 = [...s1].filter( x => s2.has( x ) );
    let inter2 = inter1.filter( x => s3.has( x ) );
    const res = inter2.map( x => charToScore( x.charCodeAt() ) );
    const score = res.reduce( ( acc, curr ) => acc + curr, 0 );
    totalScoreB += score;
  }

  console.log( totalScoreB );

}

function draw() {
  background(220);
}