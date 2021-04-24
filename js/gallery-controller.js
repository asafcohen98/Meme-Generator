'use strict'
var gCurrImg

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

// That function render and show the meme editor 
function renderImgOnCanvas(img){
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.meme-editor').style.display = 'flex'
    resizeCanvas()
    linesStartPos()
    renderCanvas(img)
}
    
// That function select img for canvas by user 
function onSelectedImg(imgId) {
    setSelectedImg(imgId)
    const currImg = getSelectedImg()
    const img = new Image()
    img.src = currImg.url
    img.onload = () => {
        gCurrImg = img
        renderImgOnCanvas(gCurrImg)
    }
    renderStickers()
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

// The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
function onImgInput(ev) {
    loadImageFromInput(ev, renderImgOnCanvas)
}

function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader()

    reader.onload = function (event) {
        var img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
        gCurrImg = img
        addImg(gCu)
    }
    reader.readAsDataURL(ev.target.files[0])
}
