const pixelsArray = []
const width = 10
const height = 10


function start() {
    fireStructure()
    renderFire()
}

function fireStructure() {
    const pixelsNumber = width * height

    for(let i=0; i<pixelsNumber; i++){
        pixelsArray[i] = 0
    }
}

function firePropagation() {

}

function renderFire() {
    let html = '<table cellpadding=0 cellspacing=0>'

    for(let row=0; row<height; row++){
        html += '<tr>'

        for(let column=0; column<width; column++){
            const pixelIndex = column + width * row
            const fireIntensity = pixelsArray[pixelIndex]

            html += '<td>'
            html += `<div class="pixel-index">${pixelIndex}</div>`
            html += fireIntensity
            html += '</td>'
        }

        html += '</tr>'
    }

    html += '</table>'

    document.querySelector('#fireCanvas').innerHTML = html
}


function createFire() {
    for(let column=0; column<=width; column++) {
        const overFlowPixelIndex = width * height
        const pixelIndex = (overFlowPixelIndex - width) + column

        pixelsArray[pixelIndex] = 36
    }
}

start()