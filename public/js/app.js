// limit canvas area
const MAX_WIDTH = 224,
    MAX_HEIGHT = 224;

// our html elements
const upload = document.getElementById('upload'),
    submit = document.getElementById('submit'),
    download = document.getElementById('download'),
    spinner = document.getElementById('spinner'),
    content = document.getElementById('content'),
    text = document.getElementById('text');

const API_URL = 'http://a197dcbcaa43111e9985606b182dacc2-0e4bd8d2e4f0ba4b.elb.us-west-2.amazonaws.com/demo/v1/portal-style/apply';

let currentCanvas, currentImgData;

// image load event
upload.addEventListener('change', function (e) {
    drawOnCanvas(e.target.files, MAX_WIDTH, MAX_HEIGHT, updateCanvas);
});

// image submit event
submit.addEventListener('click', function() {
    spinner.style.display = 'block';
    // disable submit button
    submit.setAttribute('disabled', 'disabled');
    submitCanvas(currentCanvas, 'starry_night', API_URL, 'image/jpeg', displayResult);
});

// download event
download.addEventListener('click', function() {
    downloadURI(currentImgData, 'image.jpg');
});

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
