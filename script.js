const pixelsArray = []
const width = 100
const height = 50
const debug = false
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]



function start() {
    fireStructure()
    createFire()

    setInterval(firePropagation, 10)
}

function fireStructure() {
    const pixelsNumber = width * height

    for(let i=0; i<pixelsNumber; i++){
        pixelsArray[i] = 0
    }
}



function renderFire() {
    let html = '<table cellpadding=0 cellspacing=0 style="margin: auto">'

    for(let row=0; row<height; row++){
        html += '<tr>'

        for(let column=0; column<width; column++){
            const pixelIndex = column + width * row
            const fireIntensity = pixelsArray[pixelIndex]
            const color = fireColorsPalette[fireIntensity]
            const colorStr = `${color.r},${color.g},${color.b}`

            if(debug === true) {
                html += '<td>'
                html += `<div id="pixel-index">${pixelIndex}</div>`
                html += fireIntensity
                html += '</td>'
            } else {
                html += `<td id="pixel" style="background-color: rgb(${colorStr})">`
                html += '</td>'
            }
        }

        html += '</tr>'
    }

    html += '</table>'

    document.querySelector('#fireCanvas').innerHTML = html
}


function updateFireIntensity(pixelIndex) {
    const belowPixelIndex = pixelIndex + width

    if(belowPixelIndex >= width * height) {
        return 
    }

    const decay = Math.floor(Math.random() * 3)
    const belowPixelFireIntensity = pixelsArray[belowPixelIndex]
    const newFireIntensity = belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0 

    pixelsArray[pixelIndex - decay] = newFireIntensity
}


function firePropagation() {
    for(let column=0; column<width; column++){
        for(let row=0; row<height; row++){
            const pixelIndex = column + width * row

            updateFireIntensity(pixelIndex)
        }
    }

    renderFire()
}


function createFire() {
    for(let column=0; column<=width; column++) {
        const overFlowPixelIndex = width * height
        const pixelIndex = (overFlowPixelIndex - width) + column

        pixelsArray[pixelIndex] = 36
    }
}

start()