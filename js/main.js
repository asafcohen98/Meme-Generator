'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']


// That function create the canvas context when page load
function onInit() {
    // create canvas
    createCanvas()
    // rendering keywords filter
    renderKeywords()
    // rendering imgs to the gallery
    renderGallery()
    // render stickers
    renderStickers()
    // adding listeners
    addListeners()
}

// That function add listeners
function addListeners(){
addMouseListeners()
addTouchListeners()
addResizeListener() 
}

// That function add mouse events 
function addMouseListeners() {
    // canvas events
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

// That function add touch events 
function addTouchListeners() {
    // canvas events
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

// That function add resize event on window
function addResizeListener() {
    window.addEventListener("resize", () => {
        resizeCanvas()
        linesStartPos()
        if(!gCurrImg) return
        renderCanvas(gCurrImg)
    })
}

// That function render stickers for the meme editor
function renderStickers() {
    const stickers = getStickers()
    const strHtmls = stickers.map(sticker => {
        return `<img src="${sticker.url}" alt="" onclick="onSetSticker(${sticker.id})">`
    })
    document.querySelector('.stickers').innerHTML = strHtmls.join('')
}

// That function render the canvas
function renderCanvas(img) {
    drawImg(img)
    const lines = getLines()
    lines.forEach(line => { drawLine(line) })
    const stickers = getMemeStickers()
    if (stickers.length) stickers.forEach(sticker => { drawSticker(sticker) })
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

// That function get the event position 
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

// That function toggle the menu on mobile version
function toggleMenu() {
    document.querySelector('.menu-btn').classList.toggle('hamburger-animite')
    document.body.classList.toggle('menu-open')
}




