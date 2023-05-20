
//*********************************************************************************
// A warning for small screens

if (window.innerWidth < 500){
    document.getElementById("message").style.display = "block";
}

//********************************************************************************** 


// Color Definers

let color = document.querySelector('#current-color').value;
let bgcolor = document.querySelector('#backg-color').value;


let currentcolor = document.querySelector('#current-color');
currentcolor.addEventListener('input', e =>{
    color = e.target.value;
})

let backgroundColor = document.querySelector('#backg-color');
backgroundColor.addEventListener('input', e =>{
    bgcolor = e.target.value;
})

//************************************************************************************ 


// Buttons and Modes fot the Control Panel

let cmode = 'color';
document.getElementById('eraser').addEventListener('click', ()=>{ cmode = 'eraser'; modeSwitch();})
document.getElementById('paint').addEventListener('click', ()=>{ cmode = 'color'; modeSwitch();})
document.getElementById('apply').addEventListener('click', ()=>{ cleanCanvas(); createCanvas(num); 
                                                                window.confirm('This will delete all your progress!!\nAre you sure?')})
document.getElementById('toggle').addEventListener('click', ()=>{ gridToggle()})
document.getElementById('save').addEventListener('click', ()=>{ window.alert('Not implemented yet 🫤')})


function modeSwitch(){ //These can be converted to .toggle in future
    if(cmode === 'color'){
        document.querySelector('#paint').classList.add('active');
        document.querySelector('#eraser').classList.remove('active');
    } else if (cmode === 'eraser'){
        document.querySelector('#paint').classList.remove('active');
        document.querySelector('#eraser').classList.add('active');
    }
}

let gridnum = document.querySelector('#grid-size');
let show = document.querySelector('#show-num');
show.textContent = gridnum.value + "x" + gridnum.value;
let num = gridnum.value;

gridnum.addEventListener("input",(event) =>{
    show.textContent = event.target.value + "x" + event.target.value;
    num = gridnum.value;
    })

//***************************************************************************************** 


// Creating a Canvas with the range input

function cleanCanvas(){
    document.querySelector('#canvas').innerHTML = null;
};

function createCanvas(num){
    let pixelSize = 600/num;
    document.querySelector('#canvas').style.gridTemplateColumns = `repeat(${num},${pixelSize}px)`;
    document.querySelector('#canvas').style.gridTemplateRows = `repeat(${num},${pixelSize}px)`;

    for(let i=0;i<num*num;i++){
        let pixel = document.createElement("div");
        pixel.className = "pixel pixel-grd";
        pixel.style.backgroundColor = bgcolor;
        pixel.addEventListener('mouseover', changeColor);  // These two lines are where painting happens
        pixel.addEventListener('mousedown', changeColor);  // with them, function calls changecolor wtih mouse movement
        document.querySelector('#canvas').appendChild(pixel);  
        };
};

// This function was created to reset the parameters to default, but for some reason, it didn't worked as intended. 
// I removed the reset button because, apply button does the same thing anyway.

// function resetCanvas(){
//     gridnum.value = '16';
//     bgcolor.value = '#ffffff';
//     document.querySelector('#current-color').value = 'black';
//     cleanCanvas();
//     createCanvas(16);
// }

createCanvas(num);

//****************************************************************************************** 

// Mouse Tracking - To Draw lines

let canvas = document.getElementById('canvas');
let mouseDown = false;
canvas.addEventListener('mousedown',()=>{ mouseDown = true;})
canvas.addEventListener('mouseup',()=>{ mouseDown = false;})

//*****************************************************************************************

// Canvas Actions to call

function changeColor(e){    
    if (e.type === 'mouseover' && !mouseDown) return // This means if event is mouseover, mouseDown must be true so it keeps drawing
    if (cmode === 'eraser'){
        e.target.style.backgroundColor = bgcolor;
    } else {  
        e.target.style.backgroundColor = color;
    }
}

function gridToggle(){
    let pixels = document.querySelectorAll('.pixel');
    let pixArr =[...pixels];
    pixArr.forEach(e => {
        e.classList.toggle('pixel-grd');
    });
}

//****************************************************************************************** 