'use strict'

var gLineIsDragging = false

var gStartPos

// That function call when user click on canvas
function onDown(ev) {
    const clickedPos = getEvPos(ev)
    const lines = getLines()
    const clickedLine = lineIsClicked(clickedPos, lines)
    if (clickedLine) {
        setSelectedLine(lines.indexOf(clickedLine))
        renderCanvas(gCurrImg)
        gLineIsDragging = true
        gStartPos = clickedPos
        document.body.style.cursor = 'grabbing'
    } else {
        resetSelectedLine()
        renderCanvas(gCurrImg)
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
    renderCanvas(gCurrImg)
}

// That function call when user stop dragging the line 
function onUp() {
    gLineIsDragging = false
    document.body.style.cursor = 'default'
    renderCanvas(gCurrImg)
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
    renderCanvas(gCurrImg)
}

// That function change text property by prop and value
function onChangeTxtProp(prop, val) {
    updateTxtProp(prop, val)
    renderCanvas(gCurrImg)
}

// That function change the text font  (input change)
function onChangeTxtFont(fontFamily) {
    updateTxtFont(fontFamily)
    renderCanvas(gCurrImg)
}

// That function change text stroke color  (input change)
function onChangeTxtStroke(strokeColor) {
    updateStrokeColor(strokeColor)
    renderCanvas(gCurrImg)
}

// That function change text fill color
function onChangeTxtColor(color) {
    updateTxtColor(color)
    renderCanvas(gCurrImg)
}

// That function switching between lines
function onSwitchLine() {
    updateSelectedLine()
    renderCanvas(gCurrImg)
}

// That function add a new line
function onAddLine() {
    createLine()
    renderCanvas(gCurrImg)
}

// That function remove the selected line
function onRemoveLine() {
    removeLine()
    renderCanvas(gCurrImg)
}

// That function set sticker on canvas
function onSetSticker(stickerId) {
    setSelectedSticker(stickerId)
    renderCanvas(gCurrImg)
}