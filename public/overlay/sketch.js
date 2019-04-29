
let myData;
let img
function preload(){
    myData = loadJSON('/api');
}

function setup(){
    // createCanvas(800, 800)
    noCanvas();
    noLoop();

    // colorMode(RGB)
}


function draw(){

    for(let p in myData){
        let item = myData[p];
        
        img = createImg(item.image)
        // img.hide()
        img.size(800, 800)
        img.elt.style.position = 'fixed';
        img.position(20,20)
        img.elt.style.opacity = "0.5";

        // const l = ceil(width/Object.keys(myData).length)
        // image(img, 0,0, 800, 800)
        
    }

}