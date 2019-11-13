// limit canvas area
const MAX_WIDTH = 512,
    MAX_HEIGHT = 512;

// our html elements
const upload = document.getElementById('upload'),
    submit = document.getElementById('submit'),
    download = document.getElementById('download'),
    spinner = document.getElementById('spinner'),
    content = document.getElementById('content'),
    text = document.getElementById('text');

const style_selector = document.getElementById("style_selector");

const API_URL = 'http://a197dcbcaa43111e9985606b182dacc2-0e4bd8d2e4f0ba4b.elb.us-west-2.amazonaws.com/demo/v1/style/apply';

let currentCanvas, currentImgData;
let currentStyle = "Candy";
let currentOptions = {"preserve_color": false}


// image load event
upload.addEventListener('change', function (e) {
    drawOnCanvas(e.target.files, MAX_WIDTH, MAX_HEIGHT, updateCanvas);
});

// image submit event
submit.addEventListener('click', function() {
    spinner.style.display = 'block';
    // disable submit button
    submit.setAttribute('disabled', 'disabled');
    currentStyle = getSelectedStyle();

    submitCanvas(API_URL, currentCanvas, currentStyle, 'image/jpeg', currentOptions, displayResult);
});

// download event
download.addEventListener('click', function() {
    downloadURI(currentImgData, 'image.jpg');
});

function getSelectedStyle(){
    return style_selector.options[style_selector.selectedIndex].text;
}

function checkColorOption(checkbox)
{
    if (checkbox.checked)
    {
        return currentOptions.preserve_color = true;
    }

    return currentOptions.preserve_color = false;
}

function displayResult(err, dataURI) {
    // stop spinner :)
    spinner.style.display = 'none';
    if (err) {
        text.innerText = 'Error occured: ' + err.message;
        text.style.display = 'table-cell';
        return;
    }
    // display resulting image
    const img = document.createElement('img');
    img.onload = function() {
        content.innerHTML = '';
        content.appendChild(img);
        currentImgData = dataURI;
    };
    img.src = dataURI;
    // enable download button
    download.removeAttribute('disabled');
}

function updateCanvas(context) {
    // display canvas on the page
    content.innerHTML = '';
    content.appendChild(context.canvas);
    // hide initial text
    text.style.display = 'none';
    // enable submit button
    submit.removeAttribute('disabled');
    // disable download button
    download.setAttribute('disabled', 'disabled');
    currentCanvas = context.canvas;
}
