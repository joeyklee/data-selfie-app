
let myData;
let img
function preload(){
    myData = loadJSON('/api');
}

function setup(){
    createCanvas(800, 800)
    noLoop();
}


function draw(){

    for(let p in myData){
        let item = myData[p];
        
        img = createImg(item.image)
        img.hide()

        // tint(255, 100)
        const l = ceil(width/Object.keys(myData).length)
        image(img, p*l,0, 800, 800)
        
    }

}