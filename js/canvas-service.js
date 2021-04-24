'use strict'

var gCanvas

var gCtx

// That function create a canvas
function createCanvas(){
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
}

// That function resize the canvas 
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

// That function draw img on canvas
function drawImg(img) {
    const scale = Math.max(gCanvas.width / img.width, gCanvas.height / img.naturalHeight)
    const x = (gCanvas.width / 2) - (img.naturalWidth / 2) * scale;
    const y = (gCanvas.height / 2) - (img.naturalHeight / 2) * scale;
    gCtx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale)
}

// That function draw sticker on canvas
function drawSticker(sticker) {
    const img = new Image()
    img.src = sticker.url
    img.onload = () => {
        gCtx.drawImage(img, sticker.pos.x, sticker.pos.y, img.naturalWidth, img.naturalHeight)
    }
}

// That function draw line
function drawLine(line) {
    gCtx.font = `${line.size}px ${line.fontFamily}`
    gCtx.fillStyle = `${line.color}`
    gCtx.strokeStyle = line.strokeColor
    gCtx.lineWidth = 2
    gCtx.textAlign = `center`
    // if line is selected mark the text
    if (line.isSelected) {
        gCtx.strokeStyle = 'red'
        gCtx.restore()
    }
    // align on the canvas 
    const txtAlignCtx = line.align
    if (txtAlignCtx === 'right') {
        gCtx.fillText(line.txt, line.pos.x + (gCanvas.width - line.pos.x) / 2, line.pos.y)
        gCtx.strokeText(line.txt, line.pos.x + (gCanvas.width - line.pos.x) / 2, line.pos.y)
        return
    } else if (txtAlignCtx === 'left') {
        gCtx.fillText(line.txt, line.pos.x - (gCanvas.width - line.pos.x) / 2, line.pos.y)
        gCtx.strokeText(line.txt, line.pos.x - (gCanvas.width - line.pos.x) / 2, line.pos.y)
        return
    }
    // align center on the canvas
    gCtx.fillText(line.txt, line.pos.x, line.pos.y)
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
}

    
