
//***************************************************************************
// A warning for small screens
//***************************************************************************

if (window.innerWidth < 500){
    document.getElementById("message").style.display = "block";
}


//***************************************************************************
// Color Definers
//***************************************************************************

// let bgcolor = document.querySelector('#backg-color').value;


// let backgroundColor = document.querySelector('#backg-color');
// backgroundColor.addEventListener('input', e =>{
//     bgcolor = e.target.value;
// })


//***************************************************************************
// Buttons and Modes fot the Control Panel
//***************************************************************************

let cmode = 'color';
document.getElementById('eraser').addEventListener('click', ()=>{ cmode = 'eraser'; modeSwitch();})
document.getElementById('paint').addEventListener('click', ()=>{ cmode = 'color'; modeSwitch();})
document.getElementById('apply').addEventListener('click', ()=>{ cleanCanvas(); createCanvas(num); createCanvas2(num);
                                                                window.confirm('This will delete all your progress!!\nAre you sure?')})
document.getElementById('toggle').addEventListener('click', ()=>{ gridToggle()})
document.getElementById('toggle2').addEventListener('click', ()=>{ gridToggle2()})
// document.getElementById('save').addEventListener('click', ()=>{ window.alert('Not implemented yet 🫤')})


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
// let show = document.querySelector('#show-num');
// show.textContent = gridnum.value + "x" + gridnum.value;
let num = gridnum.value;

gridnum.addEventListener("input",(event) =>{
    // show.textContent = event.target.value + "x" + event.target.value;
    num = gridnum.value;
    })


//***************************************************************************
// Creating a Canvas with the range input
//***************************************************************************

function cleanCanvas(){
    document.querySelector('#canvas').innerHTML = null;
    document.querySelector('#canvas2').innerHTML = null;
};

function createCanvas(num){
    let pixelSize = 780/num;
    document.querySelector('#canvas').style.gridTemplateColumns = `repeat(${num},${pixelSize}px)`;
    document.querySelector('#canvas').style.gridTemplateRows = `repeat(${num},${pixelSize}px)`;

    for(let i=0;i<num*num;i++){
        let pixel = document.createElement("div");
        pixel.id = i;
        pixel.className = "pixel pixel-grd";
        pixel.setAttribute('draggable', 'false');
        pixel.addEventListener('mouseover', changeColor);  // These two lines are where painting happens
        pixel.addEventListener('mousedown', changeColor);  // with them, function calls changecolor wtih mouse movement
        document.querySelector('#canvas').appendChild(pixel);
        };
};

function createCanvas2(num){
    let y = num/8
    let xxx = 780/y;
    document.querySelector('#canvas2').style.gridTemplateColumns = `repeat(${y},${xxx}px)`;
    document.querySelector('#canvas2').style.gridTemplateRows = `repeat(${y},${xxx}px)`;

    for(let i=0;i<y*y;i++){
        let pixel2 = document.createElement("div");
        pixel2.style.backgroundColor = "transparent";
        pixel2.className ="pixel2 pixel-grd2"; // with them, function calls changecolor wtih mouse movement
        document.querySelector('#canvas2').appendChild(pixel2);
        };
};

createCanvas(num);
createCanvas2(num);



//***************************************************************************
// HSL Sliders
//***************************************************************************

function hueSliderCrt(){
    let min = 260/360;
    document.querySelector('.Hue').style.gridTemplateColumns =  `repeat(360, ${min}px)`;

    for(let j=1; j<=360; j++){
        let miin = document.createElement("div");
        miin.style.backgroundColor = `hsl(${j},100%, 50%)`;
        document.querySelector('.Hue').appendChild(miin);
    }
}
hueSliderCrt();

let hueValue = 0;
let allHueValues = document.querySelectorAll(".hueValues");

allHueValues.forEach(i =>{
    i.addEventListener("input", hueChange);
    i.value = hueValue;
})

function hueChange() {
    hueValue = this.value;
    document.querySelector('.Sat').innerHTML = null;
    document.querySelector('.Light').innerHTML = null;
    satSliderCrt();
    lightSliderCrt();
    currentcol.style.backgroundColor = `hsl(${hueValue},${satValue}%,${lightValue}%)`;
    allHueValues.forEach(i =>{
        i.value = this.value;
    });
}

function satSliderCrt(){
    let min2 = 260/100;
    document.querySelector('.Sat').style.gridTemplateColumns =  `repeat(100, ${min2}px)`;

    for(let j=1; j<=100; j++){
        let miin2 = document.createElement("div");
        miin2.style.backgroundColor = `hsl(${hueValue},${j}%, 50%)`;
        document.querySelector('.Sat').appendChild(miin2);
    }
}
satSliderCrt();

let satValue= 100;
let allSatValues = document.querySelectorAll(".satValues");

allSatValues.forEach(i =>{
    i.addEventListener("input", satChange);
    i.value = satValue;
})

function satChange() {
    satValue = this.value;
    currentcol.style.backgroundColor = `hsl(${hueValue},${satValue}%,${lightValue}%)`;
    allSatValues.forEach(i =>{
        i.value = this.value;
    });
}


function lightSliderCrt(){
    let min2 = 260/100;
    document.querySelector('.Light').style.gridTemplateColumns =  `repeat(100, ${min2}px)`;

    for(let j=1; j<=100; j++){
        let miin2 = document.createElement("div");
        miin2.style.backgroundColor = `hsl(${hueValue}, 50%, ${j}%)`;
        document.querySelector('.Light').appendChild(miin2);
    }
}
lightSliderCrt();

let lightValue = 50;
let allLightValues = document.querySelectorAll(".lightValues");

allLightValues.forEach(i =>{
    i.addEventListener("input", lightChange);
    i.value = lightValue;
})

function lightChange(){
    lightValue = this.value;
    currentcol.style.backgroundColor = `hsl(${hueValue},${satValue}%,${lightValue}%)`;
    allLightValues.forEach(i =>{
        i.value = this.value;
    });
}




let currentcol = document.querySelector('#current-col');
let chosenColor = `hsl(${hueValue},${satValue}%,${lightValue}%)`
currentcol.style.backgroundColor = `hsl(${hueValue},${satValue}%,${lightValue}%)`

let currentcolor = document.querySelector('#current-col').style.backgroundColor;

console.log(currentcolor);

//---------------------------------------------------------------------------------------------

// document.getElementById("hueMinus").addEventListener('click', ()=>{
//     hueValue -= 10; 
//     hueSlider.value -= 10;
//     currentcol.style.backgroundColor = `hsl(${hueValue},${satValue}%,${lightValue}%)`
// });

//---------------------------------------------------------------------------------------------
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
        e.target.style.backgroundColor = '';
    } else {
        e.target.style.backgroundColor = `hsl(${hueValue},${satValue}%,${lightValue}%)`;
    }
}

function gridToggle(){
    let pixels = document.querySelectorAll('.pixel');
    let pixArr =[...pixels];
    pixArr.forEach(e => {
        e.classList.toggle('pixel-grd');
    });
    gridToggle2();
}

function gridToggle2(){
    let pixels = document.querySelectorAll('.pixel2');
    let pixArr =[...pixels];
    pixArr.forEach(e => {
        e.classList.toggle('pixel-grd2');
    });
}


//***************************************************************************
// Matrix Shit
//***************************************************************************

function downloadImage() {
    // Build Pixel Matrix from Grid
    const matrix = [];
    const divs = document.querySelectorAll('.pixel');
    for (let i = 0; i < divs.length; i++) {
        const css = (divs[i].style.backgroundColor) ? divs[i].style.backgroundColor : null;
        if (css) {
            const rgb = css.replace('rgb(', '').replace(')', '').split(', ');
            matrix.push(parseInt(rgb[0]));
            matrix.push(parseInt(rgb[1]));
            matrix.push(parseInt(rgb[2]));
            matrix.push(255);
        } else {
            matrix.push(0);
            matrix.push(0);
            matrix.push(0);
            matrix.push(0);
        }
    }

        // Set up Canvas
        const pixelCanvas  = document.getElementById('pixel_canvas');
        pixelCanvas.height = num;
        pixelCanvas.width  = num;

        // Create Image from Pixel Matrix
        const canvasContext = pixelCanvas.getContext('2d');
        const pixelImage   = canvasContext.createImageData(num, num);
        pixelImage.data.set(matrix);

        // Add Image to Canvas
        canvasContext.putImageData(pixelImage, 0, 0);

        // // Create Download Link
        const link = document.createElement('a');
        link.download = "image.png";
        link.href = pixelCanvas.toDataURL();
        link.id = 'download_image';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
//            document.getElementById('download_image').href = pixelCanvas.toDataURL('image/png');
        // document.getElementById('download_image').click();
};


 // Create Download Link
//  document.getElementById('download').href = pixelCanvas.toDataURL('image/png');
 document.getElementById('download').addEventListener('click', ()=>{ downloadImage()})


//  function downloadURI(uri, name) {
//     var link = document.createElement('a');
//     link.download = name;
//     link.href = uri;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     delete link;
//   }

//   document.getElementById('load').addEventListener(
//     'click',
//     function () {
//       var dataURL = pixelCanvas.toDataURL();
//       downloadURI(dataURL, 'stage.png');
//     },)



function storeImage() {
    // Check for Existing Image
    if (!this.localStorage.hasOwnProperty('paint_size') || localStorage.hasOwnProperty('paint_matrix')) {
        // Show Modal for First Save
        // this.openModal('save_modal');
    }

    // Build Matrix
    const matrix = [];
    const divs = document.querySelectorAll('.pixel');
    for (let i = 0; i < divs.length; i++) {
        matrix[i] = (divs[i].style.backgroundColor) ? divs[i].style.backgroundColor : null;
    }

    // Store Image
    localStorage.setItem('paint_matrix', JSON.stringify(matrix));
    localStorage.setItem('paint_size', num);
    console.log('Image Saved');
};

function loadImage(){
    if (localStorage.hasOwnProperty('paint_matrix')) {

        cleanCanvas();
        const savedNum = localStorage.getItem('paint_size');
        createCanvas(savedNum);
        // Build Image from Stored Matrix
        const matrix = JSON.parse(localStorage.getItem('paint_matrix'));
        const divs = document.querySelectorAll('.pixel');
        for (let i = 0; i < divs.length; i++) {
            divs[i].style.backgroundColor = matrix[i];
        }
    }
}

document.getElementById('save').addEventListener('click', ()=>{ storeImage()});
document.getElementById('load').addEventListener('click', ()=>{ loadImage() });

// WHEN LOAD IMAGE USED, CHANGE GRİD SİZE NUMBER AS WELL