const photoObjs = [
    { src: "Assets/Reel1.jpg", alt:"HAND DDC Demo 1"},
    { src: "Assets/Reel2.jpg", alt:"HAND DDC Demo 1"},
    { src: "Assets/Reel3.jpg", alt:"HAND DDC Demo 1"},
    { src: "Assets/Reel4.jpg", alt:"HAND DDC Demo 1"},
    { src: "Assets/Reel5.jpg", alt:"HAND DDC Demo 1"},
    { src: "Assets/Reel6.jpg", alt:"HAND DDC Demo 1"},
];

let photoReelContainer;
let photoReel;
let curPhoto = 0;
let intervalID = undefined;

function addPhotoReel() {
    photoReelContainer = document.getElementById("photo-reel-container");
    photoReel = document.getElementById("photo-reel");
    
    if (!photoReel) return;

    photoReel.innerHTML = "";
    photoObjs.forEach((photo, index) => {
        let img = document.createElement("img");
        img.src = photo.src;
        img.alt = photo.alt;
        img.setAttribute("aria-hidden", index === 0 ? "false" : "true");
        photoReel.appendChild(img);
    });

    photoReelContainer.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
    });

    let touchStartX = 0;
    photoReelContainer.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    photoReelContainer.addEventListener("touchend", (e) => {
        let touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) next();
        if (touchEndX - touchStartX > 50) prev();
    }, { passive: true });

    resetInterval();
}

function goToPhoto(index) {
    curPhoto = index;
    const offset = -curPhoto * 100;
    photoReel.style.transform = `translateX(${offset}%)`;

    Array.from(photoReel.children).forEach((img, idx) => {
        img.setAttribute("aria-hidden", idx === curPhoto ? "false" : "true");
    });
}

function next() {
    if (curPhoto === photoObjs.length - 1) {
        goToPhoto(0);
    } else {
        goToPhoto(curPhoto + 1);
    }
    resetInterval();
}

function prev() {
    if (curPhoto === 0) {
        goToPhoto(photoObjs.length - 1);
    } else {
        goToPhoto(curPhoto - 1);
    }
    resetInterval();
}

function resetInterval(){
    clearInterval(intervalID);
    intervalID = setInterval(next, 5000);
}