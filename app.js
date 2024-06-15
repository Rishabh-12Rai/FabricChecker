document.getElementById('suitImageInput').addEventListener('change', handleSuitImageUpload);
document.getElementById('fabricImageInput').addEventListener('change', handleFabricImageUpload);

let suitImage = new Image();
let fabricImage = new Image();
let suitImageLoaded = false;
let fabricImageLoaded = false;

function handleSuitImageUpload(event) {
    const reader = new FileReader();
    reader.onload = function(e) {
        suitImage.onload = () => {
            console.log('Suit image loaded');
            suitImageLoaded = true;
            if (fabricImageLoaded) {
                changeFabric();
            }
        };
        suitImage.src = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}

function handleFabricImageUpload(event) {
    const reader = new FileReader();
    reader.onload = function(e) {
        fabricImage.onload = () => {
            console.log('Fabric image loaded');
            fabricImageLoaded = true;
            if (suitImageLoaded) {
                changeFabric();
            }
        };
        fabricImage.src = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}

function changeFabric() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = suitImage.width;
    canvas.height = suitImage.height;
    
    ctx.drawImage(suitImage, 0, 0);
    console.log('Suit image drawn on canvas');
    
    const regionX = suitImage.width * 0.10;
    const regionY = suitImage.height * 0.30;
    const regionWidth = suitImage.width * 0.80;
    const regionHeight = suitImage.height * 0.95;
    
    const patternCanvas = document.createElement('canvas');
    const patternCtx = patternCanvas.getContext('2d');
    patternCanvas.width = regionWidth;
    patternCanvas.height = regionHeight;
    patternCtx.fillStyle = ctx.createPattern(fabricImage, 'repeat');
    patternCtx.fillRect(0, 0, regionWidth, regionHeight);
    
    ctx.drawImage(patternCanvas, regionX, regionY, regionWidth, regionHeight, regionX, regionY, regionWidth, regionHeight);
    console.log('Fabric pattern applied on canvas');
    
    ctx.globalCompositeOperation = 'multiply';
    ctx.drawImage(suitImage, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    console.log('Blending applied');
    
    const resultImage = document.getElementById('resultImage');
    resultImage.src = canvas.toDataURL();
    resultImage.style.display = 'block';
    console.log('Result image updated');
}
