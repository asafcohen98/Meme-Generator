'use strict'
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gLineIsDragging = false
var gStartPos
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
    addMouseListeners()
    addTouchListeners()
}

// add mouse events 
function addMouseListeners() {
    // canvas events
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}
// add touch events 
function addTouchListeners() {
    // canvas events
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
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
    document.querySelector('.main-gallery .img-wrapper').innerHTML = strHtmls.join('')
}

// That function render stickers for the meme editor
function renderStickers() {
    const stickers = getStickers()
    const strHtmls = stickers.map(sticker => {
        return `<img src="${sticker.url}" alt="" onclick="onSetSticker(${sticker.id})">`
    })
    document.querySelector('.stickers').innerHTML = strHtmls.join('')
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
    const stickers = getMemeStickers()
    if (stickers.length) stickers.forEach(sticker => { drawSticker(sticker) })
}

// That function render the saved memes 
function renderSavedMemes() {
    toggleMenu()
    document.querySelector('.main-gallery').style.display = 'none'
    document.querySelector('.meme-editor').style.display = 'none'
    document.querySelector('.memes-tab').style.display = 'flex'
    const memes = getSavedMemes()
    if (!memes || memes === null) {
        document.querySelector('.memes-tab h1').innerText = 'NO MEMES FOR SHOW'
        return
    }
    const strHtmls = memes.map(meme => {
        return ` <div class="img-card">
        <a href="#" class="btn" onclick="downloadMeme(this)" download="my-meme.jpg">
        <img src=${meme} alt="No img here">
        </a>
    </div>`
    })
    document.querySelector('.memes-tab .img-wrapper').innerHTML = strHtmls.join('')
}

// That function draw img on canvas
function drawImg(img) {
    const scale = Math.max(gCanvas.width / img.naturalWidth, gCanvas.height / img.naturalHeight)
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

// That fucntion get the event position 
function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

// That function call when user click on canvas
function onDown(ev) {
    ev.stopPropagation()
    const clickedPos = getEvPos(ev)
    const lines = getLines()
    const clickedLine = lineIsClicked(clickedPos, lines)
    if (clickedLine) {
        setSelectedLine(lines.indexOf(clickedLine))
        renderCanvas()
        gLineIsDragging = true
        gStartPos = clickedPos
        document.body.style.cursor = 'grabbing'
    } else {
        resetSelectedLine()
        renderCanvas()
    }
}

// That function call when user move the line on canvas
function onMove(ev) {
    if (!gLineIsDragging) return
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    const newPos = {
        x: gStartPos.x + dx,
        y: gStartPos.y + dy
    }
    updateLinePos(newPos)
    gStartPos = pos
    renderCanvas()
}

// That function call when user stop dragging the line 
function onUp() {
    gLineIsDragging = false
    document.body.style.cursor = 'default'
    renderCanvas()
}

// That function check and return the clicked line return undefined if no line clicked
function lineIsClicked(clickedPos, lines) {
    const clickedLine = lines.find(line => {
        if ((clickedPos.x <= line.pos.x + (gCtx.measureText(line.txt).width / 2)) &&
            (clickedPos.x >= line.pos.x - (gCtx.measureText(line.txt).width / 2)) &&
            (clickedPos.y <= line.pos.y) && (clickedPos.y >= (line.pos.y - line.size))) {
            return line
        }
    })
    return clickedLine
}

// That function change the text by user 
function onSetTxt(txt) {
    setLineTxt(txt)
    renderCanvas()
}

// That function select img for canvas by user 
function onSelectedImg(imgId) {
    setSelectedImg(imgId)
    renderStickers()
    renderCanvas()
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.meme-editor').style.display = 'flex'
}

// That function change the text size by diff
function onChangeTxtSize(diff, ev) {
    updateTxtSize(diff)
    renderCanvas()
}

// That function change the text align on canvas
function onChangeTxtAlign(align) {
    updateTxtAlign(align)
    renderCanvas()
}

// That function change the text font 
function onChangeTxtFont(fontFamily) {
    updateTxtFont(fontFamily)
    renderCanvas()
}

// That function change text stroke color 
function onChangeTxtStroke(strokeColor) {
    updateStrokeColor(strokeColor)
    renderCanvas()
}

// That function change text fill color
function onChangeTxtColor(color) {
    updateTxtColor(color)
    renderCanvas()
}

// That function switching between lines
function onSwitchLine() {
    updateSelectedLine()
    renderCanvas()
}

// That function add a new line
function onAddLine() {
    createLine()
    renderCanvas()
}

// That function remove the selected line
function onRemoveLine() {
    removeLine()
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

// That function set sticker on canvas
function onSetSticker(stickerId) {
    setSelectedSticker(stickerId)
    renderCanvas()
}


//////

// That function toggle the menu on mobile version
function toggleMenu() {
    document.querySelector('.menu-btn').classList.toggle('hamburger-animite')
    document.body.classList.toggle('menu-open')
}




