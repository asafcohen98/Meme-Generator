'use strict'

const MEME_DB_KEY = 'memeDB'

var gStickers = _createStickers()

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'First Line',
            size: 40,
            align: 'center',
            fontFamily: 'Impact',
            color: 'white',
            strokeColor: 'black',
            pos: {
                x: 0,
                y: 0
            },
            isSelected: true
        },
        {
            txt: 'Second Line',
            size: 40,
            align: 'center',
            fontFamily: 'Impact',
            color: 'white',
            strokeColor: 'black',
            pos: {
                x: 0,
                y: 0
            },
            isSelected: false
        }
    ],
    stickersOnMeme: [],
}


// That function create stickers
function _createStickers() {
    return [{ id: 1, url: 'img/stickers/sticker1.png', pos: { x: 250, y: 250 } },
    { id: 2, url: 'img/stickers/sticker2.png', pos: { x: 50, y: 50 } },
    { id: 3, url: 'img/stickers/sticker3.png', pos: { x: 100, y: 150 } },
    { id: 4, url: 'img/stickers/sticker4.png', pos: { x: 200, y: 100 } } ]
}

// That function get stickers for canvas
function getMemeStickers() {
    return gMeme.stickersOnMeme
}

// That function return lines for display
function getLines() {
    return gMeme.lines
}

// That function create new line
function createLine() {
    resetSelectedLine()
    const line = {
        txt: 'New Line',
        size: 40,
        fontFamily: 'Impact',
        align: 'center',
        color: 'white',
        strokeColor: 'black',
        pos: {
            x: 250,
            y: 250
        },
        isSelected: true
    }
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

// That function remove line
function removeLine() {
    const selectedLineIdx = gMeme.selectedLineIdx
    gMeme.lines.splice(selectedLineIdx, 1)
    if (!gMeme.lines.length) return
    gMeme.selectedLineIdx = 0
    gMeme.lines[gMeme.selectedLineIdx].isSelected = true
}

// That function return stickers for display
function getStickers() {
    return gStickers
}

// That function set the first second lines position
function setFirstLinesPos(firstLinePos, secLinePos) {
    gMeme.lines[0].pos.x = firstLinePos.x
    gMeme.lines[0].pos.y = firstLinePos.y
    gMeme.lines[1].pos.x = secLinePos.x
    gMeme.lines[1].pos.y = secLinePos.y
}

// That function set the sticker / remove the sticker 
function setSelectedSticker(stickerId) {
    const sticker = gStickers.find(sticker => sticker.id === stickerId)
    if(!gMeme.stickersOnMeme.length){
        gMeme.stickersOnMeme.push(sticker)
        return
    }else if (checkStickerOnMeme(sticker)){
        const stickerIdx = gMeme.stickersOnMeme.indexOf(sticker)
        gMeme.stickersOnMeme.splice(stickerIdx,1)
        return
    } 
    gMeme.stickersOnMeme.push(sticker)
}

// That function get the line by user selected index
function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

// That function set text to the current line
function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}
// That function update line property by value
function updateTxtProp(prop,val){
  if(prop === 'align'){
      // prop is align
      gMeme.lines[gMeme.selectedLineIdx][prop] = val
  }else{
      // prop is size
    gMeme.lines[gMeme.selectedLineIdx][prop] += (+val)
  }
}

// That function update text font
function updateTxtFont(fontFamily) {
    gMeme.lines[gMeme.selectedLineIdx].fontFamily = fontFamily
}

// That function update the text position
function updateLinePos(linePos) {
    gMeme.lines[gMeme.selectedLineIdx].pos = {
        x: linePos.x,
        y: linePos.y
    }
}

// That function update the text stroke color
function updateStrokeColor(strokeColor) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = strokeColor
}

// That function update the text color
function updateTxtColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

// That function update the selected line
function updateSelectedLine() {
    if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) {
        gMeme.lines[gMeme.selectedLineIdx].isSelected = false
        gMeme.selectedLineIdx = 0
        gMeme.lines[gMeme.selectedLineIdx].isSelected = true
    } else {
        gMeme.lines[gMeme.selectedLineIdx].isSelected = false
        gMeme.selectedLineIdx++
        gMeme.lines[gMeme.selectedLineIdx].isSelected = true
    }
}

// That function get line index and set as selected
function setSelectedLine(lineIdx){
    resetSelectedLine()
    gMeme.lines[lineIdx].isSelected = true
    gMeme.selectedLineIdx = lineIdx
}

// That function reset the selected line
function resetSelectedLine(){
    gMeme.lines.forEach((line, idx) => {
        gMeme.lines[idx].isSelected = false
    })
}

// That function check if sticker already on the meme
function checkStickerOnMeme(sticker){
    return gMeme.stickersOnMeme.some(currSticker => sticker.id === currSticker.id)
}

// That function save meme to storage
function saveMemeToStorage(currMeme){
    var memes  = loadFromStorage(MEME_DB_KEY)
    if(!memes || memes === null){
        var memes =[currMeme]
        saveToStorage(MEME_DB_KEY, memes)
        return
    }
    memes.push(currMeme)
    saveToStorage(MEME_DB_KEY, memes)
}

// That function get saved memes to display
function getSavedMemes(){
    return loadFromStorage(MEME_DB_KEY)
}







