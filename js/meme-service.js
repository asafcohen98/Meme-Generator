'use strict'

var gKeywords = { 'funny': 16, 'politic': 18, 'animal': 14, 'movie': 20 }

var gImgs = _createImgs()

var gStickers = _createStickers()

var gFilterBy = ''

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
    isLineSelected: true
}

// That function create imgs 
function _createImgs() {
    return [createImg(1, 'politic'), createImg(2, 'animal'), createImg(3, 'funny'), createImg(4, 'animal'), createImg(5, 'funny'),
    createImg(6, 'funny'), createImg(7, 'funny'), createImg(8, 'movie'), createImg(9, 'funny'), createImg(10, 'politic'),
    createImg(11, 'funny'), createImg(12, 'funny'), createImg(13, 'movie'), createImg(14, 'movie'), createImg(15, 'movie'),
    createImg(16, 'movie'), createImg(17, 'politic'), createImg(18, 'movie')]
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

// That function create img
function createImg(id, keyword) {
    return {
        id,
        url: `img/${id}.jpg`,
        keyword
    }
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
    if(!gMeme.isLineSelected) return
    const selectedLineIdx = gMeme.selectedLineIdx
    gMeme.lines.splice(selectedLineIdx, 1)
    if (!gMeme.lines.length) return
    gMeme.selectedLineIdx = 0
    gMeme.lines[gMeme.selectedLineIdx].isSelected = true
}

// That function return imgs for display 
function getImgs() {
    if (!gFilterBy) return gImgs
    return gImgs.filter(img => img.keyword.includes(gFilterBy.toLowerCase()))
}

// That function return stickers for display
function getStickers() {
    return gStickers
}

// That function return keywords for display
function getKeywords() {
    return gKeywords
}

// That function set the first second lines position
function setFirstLinesPos(firstLinePos, secLinePos) {
    gMeme.lines[0].pos.x = firstLinePos.x
    gMeme.lines[0].pos.y = firstLinePos.y
    gMeme.lines[1].pos.x = secLinePos.x
    gMeme.lines[1].pos.y = secLinePos.y
}

// That function get the img by user selected id
function getSelectedImg() {
    return gImgs.find(img => img.id === gMeme.selectedImgId)
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

// That function get selected img by img id
function setSelectedImg(imgId) {
    gMeme.selectedImgId = +imgId
}

// That function get the line by user selected index
function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

// That function set text to the current line
function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

// That function update text size
function updateTxtSize(diff) {
    if(!gMeme.isLineSelected) return
    gMeme.lines[gMeme.selectedLineIdx].size += diff
}

// That function update text align on canvas
function updateTxtAlign(align) {
    if(!gMeme.isLineSelected) return
    gMeme.lines[gMeme.selectedLineIdx].align = align
}

// That function update text font
function updateTxtFont(fontFamily) {
    if(!gMeme.isLineSelected) return
    gMeme.lines[gMeme.selectedLineIdx].fontFamily = fontFamily
}

// That function update the text position
function updateTxtPos(diff) {
    if(!gMeme.isLineSelected) return
    gMeme.lines[gMeme.selectedLineIdx].pos.y += diff
}

// That function update the text stroke color
function updateStrokeColor(strokeColor) {
    if(!gMeme.isLineSelected) return
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = strokeColor
}

// That function update the text color
function updateTxtColor(color) {
    if(!gMeme.isLineSelected) return
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

// That function update the selected line
function updateSelectedLine() {
    gMeme.isLineSelected = true
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

// That function set imgs filter
function setImgsFilter(txt) {
    gFilterBy = txt
}

// That function update the keyword
function updateKeyword(txt) {
    gKeywords[txt.toLowerCase()]++
}

// That function reset the selected line
function resetSelectedLine(){
    gMeme.lines.forEach((line, idx) => {
        gMeme.lines[idx].isSelected = false
    })
    gMeme.isLineSelected = false
}

// That function check if sticker already on the meme
function checkStickerOnMeme(sticker){
    return gMeme.stickersOnMeme.some(currSticker => sticker.id === currSticker.id)
}






