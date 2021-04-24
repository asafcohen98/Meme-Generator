'use strict'

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
    const strHtmls = memes.map((meme,idx) => {
        return ` <div class="img-card">
        <img src=${meme} alt="No img here">
        <button class="remove-saved-meme-btn" onclick="removeMemeFromStorage(${idx})">x</button>
        <a href="#" class="download-saved-meme-btn" onclick="downloadMeme(this,'${meme}')" download="my-meme.jpg">
        Download
        </a>
    </div>`
    })
    document.querySelector('.memes-tab .img-wrapper').innerHTML = strHtmls.join(' ')
}


// That function remove meme from storage
function removeMemeFromStorage(memeIdx){
const savedMemes = getSavedMemes()
savedMemes.splice(memeIdx,1)
saveToStorage(MEME_DB_KEY, savedMemes)
renderSavedMemes()
}
    
