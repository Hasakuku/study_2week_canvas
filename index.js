const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const buttons = document.querySelectorAll("button")
const colors = document.querySelectorAll(".colors button")
const eraser = document.querySelector("#eraser");
const download = document.querySelector("#download")
const lineWidth = document.querySelector("#pen-line");
const fillButton = document.querySelector('#fill')


// 그리기 설정
let isDrawing = false;
let isErasing = false;


ctx.lineWidth = 3; // 선의 초기굵기값
ctx.strokeStyle = 'black'; // 선의 초기색상

// 이벤트 리스너
function startDrawing(e) { // 그리기 활성화
    isDrawing = true;
    ctx.beginPath() // 새로운 경로를 시작, 이후의 그리기 명령들은 이 경로에 추가됨
    ctx.moveTo(e.offsetX, e.offsetY)
}

// 그리기 & 지우기
function drawing(e) {
    if (!isDrawing) return;
    if (isErasing) {
        ctx.clearRect(e.offsetX, e.offsetY, 10, 10)
    }
    else {
        ctx.lineTo(e.offsetX, e.offsetY)
        ctx.stroke();
    }
}

// 그리기 비활성화
function stopDrawing() {
    isDrawing = false;
    ctx.closePath();
}

// 내가 선택한 색상버튼 활성화
function chageColor(e) {
    isErasing = false;
    ctx.strokeStyle = e.currentTarget.dataset.color;
    colors.forEach(button => {
        if (button === e.currentTarget) {
            button.classList.add("selected");
        } else {
            button.classList.remove("selected")
        }
    })
    eraser.classList.remove('selected')
}

// 지우개 버튼활성화 
function startErasing(e) {
    isErasing = true;
    buttons.forEach(button => button.classList.remove('selected'))
    e.currentTarget.classList.add('selected')
    
}

// 다운로드 
function downloadLink() {
    const image = canvas.toDataURL(); //캔버스의 내용을 데이터 URL로 변환 이 URL은 이미지의 모든 픽셀 데이터를 포함
    const link = document.createElement('a');
    link.href = image;
    link.download = 'canvas.png';
    link.click();
}
// 펜버튼 클릭시 선 굵기 조절
function changeLineWidth(e) {
    buttons.forEach(button => button.classList.remove('selected'))
    e.currentTarget.classList.add('selected')
    
    const lineWidthBar = document.createElement('input'); // 선 굵기 선택 바 생성
    lineWidthBar.style.display = 'block';
    lineWidthBar.style.position = 'absolute'
    lineWidthBar.style.top = '445px' 
    lineWidthBar.style.left = '480px'
    lineWidthBar.type = 'range';
    lineWidthBar.id = 'line-width-bar';
    lineWidthBar.min = '1';
    lineWidthBar.max = '10';
    lineWidthBar.value = '3';
    lineWidthBar.step = '0.5';
    
    lineWidthBar.addEventListener('input', function () {
        ctx.lineWidth = lineWidthBar.value; // 선굵기와 선택바의 값을 일치시킴
    })

    // 사용자가 마우스 버튼을 놓으면 바를 제거
    lineWidthBar.addEventListener('mouseup', function () {
        document.body.removeChild(lineWidthBar);
    })

    document.body.appendChild(lineWidthBar);
}

// 배경 채우기
function fillBackground(e) {
    buttons.forEach(button => button.classList.remove('selected'))
    e.currentTarget.classList.add('selected')
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


// 캔버스 이벤트
canvas.addEventListener("mousedown", startDrawing)
canvas.addEventListener("mousemove", drawing)
canvas.addEventListener("mouseup", stopDrawing)
colors.forEach(button => button.addEventListener('click', chageColor))
// 기능 이벤트
eraser.addEventListener('click', startErasing)
download.addEventListener('click', downloadLink)
lineWidth.addEventListener('click', changeLineWidth);
fillButton.addEventListener('click', fillBackground)