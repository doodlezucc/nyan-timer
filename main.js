const minSpeed = 3;
const maxSpeed = 15;

const minSize = 30;
const maxSize = 200;

const body = document.getElementById("body");
const t = document.getElementById("timer");
const sprites = document.getElementById("sprites");
let goal = moment().hour(9).minute(15).second(0).millisecond(0);

let sec = 0;
let diff = -moment().diff(goal);

let images = [];
let bgs = [];

const bgWidth = 1000;

const interval = setInterval(() => {
    diff = -moment().diff(goal);
    const seconds = moment.utc(diff).seconds();
    if (sec != seconds) {
        updateDisplay();
    }
    sec = seconds;
}, 10);

function updateDisplay() {
    if (moment().isBefore(goal)) {
        const m = moment.utc(diff).format("HH:mm:ss");
        t.innerText = m;
        const hue = 360 * Math.random();
        setHue(hue);
    } else {
        begone();
    }
}

function begone() {
    clearInterval(interval);
    t.innerText = "yay";
    setInterval(() => {
        setQuickHue();
    }, 50);
}

function setQuickHue() {
    body.style = "transition: 0s; background-color: hsl(0, 0%, " + 100 * Math.random() + "%)";
    sprites.style.filter = "brightness(0)";
    moveQuickly();
    moveQuickly();
    moveQuickly();
    moveQuickly();
    moveQuickly();
    moveQuickly();
    createEpicImage();
}

function setHue(hue) {
    body.style = "--hue: " + hue;
    sprites.animate([
        { filter: 'blur(5px) brightness(2)' },
        { filter: 'none' }
    ], {
        duration: 200,
        easing: 'ease-out'
    });

    moveQuickly();
}

function moveQuickly() {
    moveImages();
}

function moveImages() {
    images.forEach((o) => {
        fwd(o);
    });
    images = images.filter((o) => o.pos <= screen.width + o.speed + 20);
}

function moveBg() {
    bgs.forEach((i) => {
        fwd(i);
    });
    bgs = bgs.filter((o) => o.pos <= screen.width + o.speed + 20);

    if ((bgs.length && bgs[0].pos >= -100) || !bgs.length) {
        createLandscape();
    }
}

updateDisplay();

setInterval(() => {
    if (Math.random() <= 0.7) {
        createEpicImage();
    }
}, 1000);
setInterval(() => {
    moveImages();
    moveBg();
}, 50);

function fwd(o) {
    o.pos += o.speed;
    o.img.style.left = o.pos + "px";
    if (o.pos > screen.width) {
        o.img.remove();
    }
}

function createEpicImage() {
    const obj = {};
    const img = document.createElement("img");
    img.src = "cat.gif";
    img.className = "cat";
    const z = Math.random();
    img.style.height = (minSize + z * (maxSize - minSize)) + "px";
    img.style.top = (Math.random() * 50) + "%";
    obj.img = img;
    //obj.speed = minSpeed + Math.random() * (maxSpeed - minSpeed);
    obj.speed = minSpeed + z * (maxSpeed - minSpeed);
    obj.pos = -300;
    fwd(obj);
    sprites.append(img);
    images.push(obj);
}


function createLandscape(lol) {
    const img = document.createElement("img");
    img.src = "landscape.jpg";
    img.className = "bg";
    img.style.width = bgWidth + "px";
    let x = -bgWidth;

    if (lol) x = (lol - 1) * bgWidth;
    else if (bgs.length) x = bgs[0].pos - bgWidth;

    const obj = {
        img: img,
        speed: 2,
        pos: x
    };

    lol ? bgs.push(obj) : bgs.unshift(obj);
    document.getElementById("bgs").append(img);
}

for (var i = 0; i < 10; i++) {
    createLandscape(i);
}