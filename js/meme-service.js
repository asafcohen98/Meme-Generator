'use strict'

var gKeywords = { 'funny': 16, 'politic': 18, 'animal': 14, 'movie': 20 }
var gImgs = _createImgs()
var gFilterBy = ''
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'First Line',
            size: 40,
            align: 'center',
            color: 'white',
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
            color: 'white',
            pos: {
                x: 0,
                y: 0
            },
            isSelected: false
        }
    ]
}

// That function create imgs 
function _createImgs(){
    return [createImg(1,'politic'),createImg(2,'animal'),createImg(3,'funny'),createImg(4,'animal'),createImg(5,'funny'),
        createImg(6,'funny'),createImg(7,'funny'),createImg(8,'movie'),createImg(9,'funny'),createImg(10,'politic'),
        createImg(11,'funny'),createImg(12,'funny'),createImg(13,'movie'),createImg(14,'movie'),createImg(15,'movie'),
        createImg(16,'movie'),createImg(17,'politic'),createImg(18,'movie')]
}

// That function create img
function createImg(id,keyword){
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

// That function return imgs for display 
function getImgs(){
    if(!gFilterBy) return gImgs
    return gImgs.filter(img => img.keyword.includes(gFilterBy.toLowerCase()))
}

// That function return keywords for display
function getKeywords(){
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
    gMeme.lines[gMeme.selectedLineIdx].size += diff
}

// That function update the text position
function updateTxtPos(diff) {
    gMeme.lines[gMeme.selectedLineIdx].pos.y += diff
}

// That function update the selected line
function updateSelectedLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
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
function setImgsFilter(txt){
    gFilterBy = txt
}

// That function update the keyword
function updateKeyword(txt){
    gKeywords[txt.toLowerCase()]++
}

