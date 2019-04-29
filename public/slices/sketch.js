
let myData;
// let img
function preload(){
    myData = loadJSON('/api');
}

function setup(){
    // createCanvas(800, 800)
    noCanvas();
    noLoop();
}


function draw(){

    for(let p in myData){
        let item = myData[p];
        
        let img = createImg(item.image).parent('main')
        // img.size(400, 400)
        // img.elt.style.position = 'fixed';
        const l = ceil(800/Object.keys(myData).length)
        img.position(10 + p*l,20)
        // img.elt.style.opacity = "0.5";
        img.elt.id = p;

        img.elt.addEventListener('mouseenter', (e) => {
            document.querySelectorAll('img').forEach(thing => {
                thing.style.zIndex = e.currentTarget.id;
            })
            e.currentTarget.style.zIndex = "999999"
        })

        
        // tint(255, 100)
        
        // image(img, p*l,0, 800, 800)
        
    }

    document.querySelector('body').addEventListener('mouseout', (e) => {
        document.querySelectorAll('img').forEach(thing => {
            thing.style.zIndex = e.currentTarget.id;
        })
    })

}