
function makeArray(rows, cols) {
	let arr = new Array(cols);
	for(let i=0; i<arr.length; i++){
		arr[i] = new Array(rows);
	}
	return arr;
}

let grid;
let cols;
let rows;
let res = 20;

function setup() {
	createCanvas(600, 800);
	fr = 10;
	frameRate(fr);
	cols = width/res;
	rows = height/res;

	grid = makeArray(rows, cols);
	for(let i=0; i<cols; i++){
		for(let j=0; j<rows; j++){
			grid[i][j] = floor(random(2));
		}
	}
}

function draw() {
	background(255);

	for(let i=0; i<cols; i++){
		for(let j=0; j<rows; j++){
			let x = i*res;
			let y = j*res;
			if(grid[i][j] == 1){
				fill(0);
				stroke(255);
				rect(x, y, res-1, res-1);
			}
		}
	}

	let next = makeArray(rows, cols);

	for(let i=0; i<cols; i++){
		for(let j=0; j<rows; j++){
			let n = numNeighbours(grid, i, j, rows, cols);
			let st = grid[i][j];
			if(st===0 && n===3){
				next[i][j] = 1;
			}else if(st===1 && (n>3||n<2)){
				next[i][j] = 0;
			}else{
				next[i][j] = st;
			}
		}
	}
	grid = next;
}

function numNeighbours(grid, x, y, rows, cols){
	let num = 0;
	for(let i=-1; i<2; i++){
		for(let j=-1; j<2; j++){
	      let col = (x + i + cols) % cols;
	      let row = (y + j + rows) % rows;
	      num += grid[col][row];
		}
	}
	num -= grid[x][y];
	return num;
}