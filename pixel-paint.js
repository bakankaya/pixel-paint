
//***************************************************************************
// A warning for small screens
//***************************************************************************

if (window.innerWidth < 500){
    document.getElementById("message").style.display = "block";
}


//***************************************************************************
// Color Definers
//***************************************************************************

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


//***************************************************************************
// Buttons and Modes fot the Control Panel
//***************************************************************************

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


//***************************************************************************
// Creating a Canvas with the range input
//***************************************************************************

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



//***************************************************************************
// HSL Sliders
//***************************************************************************

function hueslider(){
    let min = 360/360;
    document.querySelector('.Hue').style.gridTemplateColumns =  `repeat(361, ${min}px)`;

    for(let j=0; j<=360; j++){
        let miin = document.createElement("div");
        miin.className = "miin-clr";
        miin.style.backgroundColor = `hsl(${j},100%, 50%)`;
        document.querySelector('.Hue').appendChild(miin);
    }
}

hueslider();

var slider = document.getElementById("hueRange");
var output = document.getElementById("hue");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
  document.querySelector('.Sat').innerHTML = null;
  document.querySelector('.Light').innerHTML = null;
  satslider();
  lightslider();
}

function satslider(){
    let min2 = 360/100;
    document.querySelector('.Sat').style.gridTemplateColumns =  `repeat(101, ${min2}px)`;

    for(let j=0; j<=100; j++){
        let miin2 = document.createElement("div");
        miin2.className = "miin-clr";
        miin2.style.backgroundColor = `hsl(${output.innerHTML},${j}%, 50%)`;
        document.querySelector('.Sat').appendChild(miin2);
    }
}
satslider();

function lightslider(){
    let min2 = 360/100;
    document.querySelector('.Light').style.gridTemplateColumns =  `repeat(101, ${min2}px)`;

    for(let j=0; j<=100; j++){
        let miin2 = document.createElement("div");
        miin2.className = "miin-clr";
        miin2.style.backgroundColor = `hsl(${output.innerHTML}, 50%, ${j}%)`;
        document.querySelector('.Light').appendChild(miin2);
    }
}
lightslider();



var slider2 = document.getElementById("myRange2");
var output2 = document.getElementById("demo2");
output2.innerHTML = slider2.value;

slider2.oninput = function() {
  output2.innerHTML = this.value;
}

var slider3 = document.getElementById("myRange3");
var output3 = document.getElementById("demo3");
output3.innerHTML = slider3.value;

slider3.oninput = function() {
  output3.innerHTML = this.value;
}
//***************************************************************************
// Mouse Tracking - To Draw lines
//***************************************************************************

let canvas = document.getElementById('canvas');
let mouseDown = false;
canvas.addEventListener('mousedown',()=>{ mouseDown = true;})
canvas.addEventListener('mouseup',()=>{ mouseDown = false;})


//***************************************************************************
// Canvas Actions to call
//***************************************************************************

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
