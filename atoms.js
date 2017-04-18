var BG_COLOR = {
	R : 20,
	G : 10,
	B : 30
};

var ATOM_COLOR = {
	RED : 0,
	PURPLE : 1,
	YELLOW : 2,
	BLUE : 3,
	GREEN : 4
}

var X = 0, Y = 1;


var CANVAS_SIZE = {
	x : 1440,
	y : 900
};

var BG_ATOM_NUMS = 15;
var MAX_RADIUS = 100;
var MAX_SPEED = 0.4;
var MAX_ELECTRONS = 20;


class Atom {
    constructor(center, e_Num, e_radius, a_speed, atom_color) {
        this.center = center; //[X, Y];
        this.elcNum = e_Num;
        this.elcRadius = e_radius;
		this.aglr_speed = a_speed;
		this.electrons = [];
		this.atom_color = atom_color;
		this.add_electrons();
    }

	add_electrons(){
		for(var i = 0; i < this.elcNum; i++){
			this.electrons.push(new Electron(this.center, this.elcRadius, 360/this.elcNum * i, this.aglr_speed, this.atom_color));
		}
	}

	draw_update(){
		//Draw Nucleus
		this.draw_nucleus(20);
		//Draw Electrons
		for(var i = 0; i < this.elcNum; i++){
			this.electrons[i].set_center(this.center);
			this.electrons[i].draw_update();
		}
	}

	draw_nucleus(radius){
		var N_COLOR = {
			R : BG_COLOR.R,
			G : BG_COLOR.G,
			B : BG_COLOR.B
		};
		noStroke();
		for(var r = radius; r > 0; r-= 2){
			fill(N_COLOR.R, N_COLOR.G, N_COLOR.B);
			ellipse(this.center[X], this.center[Y], r, r);
			
			if(this.atom_color == ATOM_COLOR.RED){
				N_COLOR.R += 60; N_COLOR.G += 30; N_COLOR.B += 30;
			}
			else if(this.atom_color == ATOM_COLOR.PURPLE){
				N_COLOR.R += 60; N_COLOR.G += 30; N_COLOR.B += 60;
			}
			else if(this.atom_color == ATOM_COLOR.YELLOW){
				N_COLOR.R += 60; N_COLOR.G += 40; N_COLOR.B += 20;
			}
			else if(this.atom_color == ATOM_COLOR.BLUE){
				N_COLOR.R += 30; N_COLOR.G += 40; N_COLOR.B += 80;
			}
			else if(this.atom_color == ATOM_COLOR.GREEN){
				N_COLOR.R += 40; N_COLOR.G += 60; N_COLOR.B += 30;
			}
			else{
				N_COLOR.R += 30; N_COLOR.G += 30; N_COLOR.B += 30;
			}
			if(N_COLOR.R > 255) N_COLOR.R = 255;
			if(N_COLOR.G > 255) N_COLOR.G = 255;
			if(N_COLOR.B > 255) N_COLOR.B = 255;
		} 
	}

}

class Electron {
    constructor(center, e_radius, off_angle, a_speed, electron_color) {
        this.center = center;
        this.elcRadius = e_radius;
        this.off_angle = off_angle;
        //Other parameters
        //this.motion_phrase = map(Math.random(), 0, 1, 0, 360); //degree;
		this.motion_phrase = Math.random() * 360;
        this.aglr_speed = a_speed;
		//Color
		this.electron_color = electron_color;
    }

    draw_update(){
        var relative_pos = rotate_vector( this.elcRadius * Math.sin(this.motion_phrase) / 3,
                                         this.elcRadius * Math.cos(this.motion_phrase), this.off_angle );
        this.draw_electron(relative_pos);
        this.motion_phrase += this.aglr_speed;
    }

	draw_electron(relative_pos){
		var E_COLOR = {
			R : BG_COLOR.R,
			G : BG_COLOR.G,
			B : BG_COLOR.B
		};
		noStroke();
		for(var r = 10; r > 0; r--){
			fill(E_COLOR.R, E_COLOR.G, E_COLOR.B);
			ellipse(this.center[X] + relative_pos[X], this.center[Y] + relative_pos[Y], r, r);

			if(this.electron_color == ATOM_COLOR.RED){
				E_COLOR.R += 80; E_COLOR.G += 40; E_COLOR.B += 40;
			}
			else if(this.electron_color == ATOM_COLOR.PURPLE){
				E_COLOR.R += 80; E_COLOR.G += 40; E_COLOR.B += 40;
			}
			else if(this.electron_color == ATOM_COLOR.YELLOW){
				E_COLOR.R += 80; E_COLOR.G += 60; E_COLOR.B += 30;
			}
			else if(this.electron_color == ATOM_COLOR.BLUE){
				E_COLOR.R += 40; E_COLOR.G += 50; E_COLOR.B += 100;
			}
			else if(this.electron_color == ATOM_COLOR.GREEN){
				E_COLOR.R += 50; E_COLOR.G += 80; E_COLOR.B += 50;
			}
			else{
				E_COLOR.R += 30; E_COLOR.G += 30; E_COLOR.B += 30;
			}
			
			if(E_COLOR.R > 255) E_COLOR.R = 255;
			if(E_COLOR.G > 255) E_COLOR.G = 255;
			if(E_COLOR.B > 255) E_COLOR.B = 255;
		}
	}

	set_center(center){
		this.center = center;
	} 
}


var atom_array = [];
var atom_1 = new Atom([CANVAS_SIZE.x / 2, CANVAS_SIZE.y / 2], 14, 60, 0.1, ATOM_COLOR.YELLOW);

function setup() {
    createCanvas(CANVAS_SIZE.x, CANVAS_SIZE.y);
    background(BG_COLOR.R, BG_COLOR.G, BG_COLOR.B);
    frameRate(60);
	//Init Atoms:
	
	for(var i = 0; i < BG_ATOM_NUMS ; i ++){
		var new_center = [
			int(map(Math.random(), 0, 1, int(0.038 * CANVAS_SIZE.x), CANVAS_SIZE.x - int(0.038 * CANVAS_SIZE.x))),
			int(map(Math.random(), 0, 1, int(0.038 * CANVAS_SIZE.y), CANVAS_SIZE.y - int(0.038 * CANVAS_SIZE.y)))
		];
		var elc_nums = Math.ceil(map(Math.random(), 0, 1, 3, MAX_ELECTRONS));
		var elc_radius = Math.ceil(map(Math.random(), 0, 1, 30, MAX_RADIUS));
		var aglr_speed = map(Math.random(), 0, 1, 0.1, MAX_SPEED) ;
		var atom_color = Math.floor(Math.random() * 5);
		console.log(new_center, elc_nums, elc_radius, aglr_speed, atom_color);
		atom_array.push(new Atom(new_center, elc_nums, elc_radius, aglr_speed, atom_color));
	}
	
}


function draw() {
	refresh();

	console.log(atom_array.length);
	fill(200, 100, 255);


	for(var i = 0; i < atom_array.length; i++){
		atom_array[i].draw_update();
	} 

	atom_1.draw_update();
	atom_1.center[X] = mouseX;
	atom_1.center[Y] = mouseY;

}

function refresh() {
	background(BG_COLOR.R, BG_COLOR.G, BG_COLOR.B);
}

function rotate_vector(vector_x, vector_y, angle) {
	angle = radians(angle);
	var new_x = vector_x * cos(angle) - vector_y * sin(angle);
	var new_y = vector_x * sin(angle) + vector_y * cos(angle);
	return [new_x, new_y]; 
}








