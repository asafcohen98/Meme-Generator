'use strict'

var gKeywords = { 'funny': 16, 'politic': 18, 'animal': 14, 'movie': 20 }

var gImgs = _createImgs()

var gFilterBy = ''

// That function create imgs 
function _createImgs() {
    return [createImg(1, 'politic'), createImg(2, 'animal'), createImg(3, 'funny'), createImg(4, 'animal'), createImg(5, 'funny'),
    createImg(6, 'funny'), createImg(7, 'funny'), createImg(8, 'movie'), createImg(9, 'funny'), createImg(10, 'politic'),
    createImg(11, 'funny'), createImg(12, 'funny'), createImg(13, 'movie'), createImg(14, 'movie'), createImg(15, 'movie'),
    createImg(16, 'movie'), createImg(17, 'politic'), createImg(18, 'movie')]
}

// That function create img
function createImg(id, keyword) {
    return {
        id,
        url: `img/${id}.jpg`,
        keyword
    }
}

// That function return imgs for display 
function getImgs() {
    if (!gFilterBy) return gImgs
    return gImgs.filter(img => img.keyword.includes(gFilterBy.toLowerCase()))
}

// That function return keywords for display
function getKeywords(){
    return gKeywords
}

// That function return imgs for display 
function getImgs() {
    if (!gFilterBy) return gImgs
    return gImgs.filter(img => img.keyword.includes(gFilterBy.toLowerCase()))
}

// That function get the img by user selected id
function getSelectedImg() {
    return gImgs.find(img => img.id === gMeme.selectedImgId)
}

// That function get selected img by img id
function setSelectedImg(imgId) {
    gMeme.selectedImgId = +imgId
}

// That function set imgs filter
function setImgsFilter(txt) {
    gFilterBy = txt
}

// That function update the keyword
function updateKeyword(txt) {
    gKeywords[txt.toLowerCase()]++
}