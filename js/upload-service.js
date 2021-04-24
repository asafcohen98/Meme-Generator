'use strict'

// That function download the meme
function downloadMeme(elLink, imgContent = null) {
    if (!imgContent) {
        imgContent = gCanvas.toDataURL('image/jpeg')
    }
    elLink.href = imgContent
}

// That function save the meme 
function onSaveMeme() {
    const currMeme = gCanvas.toDataURL('image/jpeg')
    saveMemeToStorage(currMeme)
    const saveBtnTxt = document.querySelector('.save-btn').innerHTML
    document.querySelector('.save-btn').innerText = 'Successfully saved'
    setTimeout(() => {
        document.querySelector('.save-btn').innerHTML = saveBtnTxt
    }, 2000)
}

// That function share the meme
// on submit call to this function
function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-link').innerHTML = `
        <a class="facebook-share-btn" href="//www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
        <i class="fab fa-facebook"></i>
           Share on facebook
        </a>`
    }
    let inputVal = elForm.querySelector('input').value
    doUploadImg(elForm, onSuccess, inputVal);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    console.log('doUploadImg -> formData', formData)
    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function (err) {
            console.error(err)
        })
}

// //
