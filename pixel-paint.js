
// Creating a Canvas with a range input

let gridnum = document.querySelector('#grid-size');
let show = document.querySelector('#show-num');
show.textContent = gridnum.value + "x" + gridnum.value;
let num = gridnum.value;

gridnum.addEventListener("input",(event) =>{
    cleanCanvas();
    show.textContent = event.target.value + "x" + event.target.value;
    let num = gridnum.value;
    createCanvas(num);
    })

function cleanCanvas(){
    document.querySelector('#canvas').innerHTML = null;
};

function createCanvas(num){
    let pixelSize = 600/num;
    document.querySelector('#canvas').style.gridTemplateColumns = `repeat(${num},${pixelSize}px)`;
    document.querySelector('#canvas').style.gridTemplateRows = `repeat(${num},${pixelSize}px)`;

    for(let i=0;i<num*num;i++){
        let pixel = document.createElement("div");
        pixel.className = "pixel";
        pixel.addEventListener('mouseover', changeColor);
        pixel.addEventListener('mousedown', changeColor);
        document.querySelector('#canvas').appendChild(pixel);  
        };
};

createCanvas(num);


// Mouse Tracking - To Draw lines

let canvas = document.getElementById('canvas');
let mouseDown = false;
canvas.addEventListener('mousedown',()=>{ mouseDown = true;})
canvas.addEventListener('mouseup',()=>{ mouseDown = false;})

let color = document.querySelector('#current-color').value;


// Buttons and Modes

let cmode = 'color';
document.getElementById('eraser').addEventListener('click', ()=>{ cmode = 'eraser'; modeSwitch();})
document.getElementById('paint').addEventListener('click', ()=>{ cmode = 'color'; modeSwitch();})

function modeSwitch(){
    if(cmode === 'color'){
        document.querySelector('#paint').classList.add('active');
        document.querySelector('#eraser').classList.remove('active');
    } else if (cmode === 'eraser'){
        document.querySelector('#paint').classList.remove('active');
        document.querySelector('#eraser').classList.add('active');

    }

}

function changeColor(e){    
    if (e.type === 'mouseover' && !mouseDown) return // This means if event is mouseover, mouseDown must be true so it keeps drawing
    if (cmode === 'eraser'){
        e.target.style.backgroundColor = 'white';
    } else {  
        e.target.style.backgroundColor = color;
    }
}

let currentcolor = document.querySelector('#current-color');
currentcolor.addEventListener('input', e =>{
    color = e.target.value;
})

