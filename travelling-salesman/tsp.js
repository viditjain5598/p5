let cities = [];
let numCities = 7;

let leastDistance;
let bestPath;

function setup(){
	createCanvas(600, 400);
	for(let i=0; i<numCities; i++){
		let v = createVector(random(width), random(height));
		cities[i] = v;
	}
	leastDistance = pathDistance(cities);
	bestPath = cities.slice();
}

function draw(){
	background(0);
	fill(255);
	for(let i=0; i<cities.length; i++){
		ellipse(cities[i].x, cities[i].y, 8, 8);
	}

	stroke(255);
	strokeWeight(2);
	noFill();
	beginShape();
	for(let i=0; i<cities.length; i++){
		vertex(cities[i].x, cities[i].y);
	}
	endShape();
	
	stroke(200, 200, 0);
	strokeWeight(4);
	noFill();
	beginShape();
	for(let i=0; i<bestPath.length; i++){
		vertex(bestPath[i].x, bestPath[i].y);
	}
	endShape();
	
	let i = floor(random(cities.length));
	let j = floor(random(cities.length));
	swap(cities, i, j);

	let d = pathDistance(cities);
	if(d<leastDistance){
		leastDistance = d;
		bestPath = cities.slice();
		console.log(leastDistance);
	}
}

function pathDistance(points){
	let sum = 0;
	for(let i=0; i<points.length-1; i++){
		sum += dist(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
	}
	return sum;
}

function swap(arr, i, j){
	let t = arr[i];
	arr[i] = arr[j];
	arr[j] = t;
}