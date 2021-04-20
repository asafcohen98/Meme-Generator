'use strict'

var gCanvas
var gCtx

// That function create the canvas context when page load
function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    // first position of the first lines
    linesStartPos()
    // rendering keywords filter
    renderKeywords()
    // rendering imgs to the gallery
    renderGallery()
}

// That function starts the line position
function linesStartPos() {
    let firstLinePos = {
        x: gCanvas.width / 2,
        y: 50
    }
    let secLinePos = {
        x: gCanvas.width / 2,
        y: gCanvas.height - 20
    }

    setFirstLinesPos(firstLinePos, secLinePos)
}

// That function render the imgs to the gallery
function renderGallery() {
    const imgs = getImgs()
    const strHtmls = imgs.map(img => {
        return ` <div class="img-card">
        <img data-id="${img.id}" src=${img.url} alt="No img here" onclick="onSelectedImg(this.dataset.id)">
    </div>`
    })
    document.querySelector('.img-wrapper').innerHTML = strHtmls.join('')
}

// That function render the keywords filter
function renderKeywords() {
    const keywords = getKeywords()
    document.querySelector('.category-filter').innerHTML = ''
    let strHtmls = ''
    for (const key in keywords) {
        strHtmls += `<span style="font-size:${keywords[key]}px;"
    onclick="onSetImgsFilter(this.innerText,event)">${key}</span>`
    }
    document.querySelector('.category-filter').innerHTML = strHtmls
}

// That function render the canvas
function renderCanvas() {
    const currImg = getSelectedImg()
    const img = new Image()
    img.src = currImg.url
    img.onload = () => {
        drawImg(img)
        const lines = getLines()
        lines.forEach(line => { drawLine(line) })
    }
}

// That function draw img on canvas
function drawImg(img) {
    const scale = Math.max(gCanvas.width / img.naturalWidth, gCanvas.height / img.naturalHeight)
    const x = (gCanvas.width / 2) - (img.naturalWidth / 2) * scale;
    const y = (gCanvas.height / 2) - (img.naturalHeight / 2) * scale;
    gCtx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale)
}


// That function draw line
function drawLine(line) {
    gCtx.font = `${line.size}px Impact`
    gCtx.fillStyle = `${line.color}`
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 2
    gCtx.textAlign = `${line.align}`
    // if line is selected draw rec around the text
    if (line.isSelected) {
        gCtx.strokeStyle = 'red'
        gCtx.restore()
    }
    gCtx.fillText(line.txt, line.pos.x, line.pos.y)
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
}

// That function change the text by user 
function onSetTxt(txt) {
    setLineTxt(txt)
    renderCanvas()
}

// That function change canvas img by user 
function onSelectedImg(imgId) {
    setSelectedImg(imgId)
    renderCanvas()
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.meme-editor').style.display = 'flex'
}

// That function change the text size by diff
function onChangeTxtSize(diff) {
    updateTxtSize(diff)
    renderCanvas()
}

// That function changes the text position up/down by diff
function onChangeTxtPos(diff) {
    updateTxtPos(diff)
    renderCanvas()
}

// That function switching between lines
function onSwitchLine() {
    updateSelectedLine()
    renderCanvas()
}

// That function change the filter by user 
function onSetImgsFilter(txt, ev) {
    if (ev.type === 'click') {
        updateKeyword(txt)
        renderKeywords()
    }
    setImgsFilter(txt)
    renderGallery()
}

