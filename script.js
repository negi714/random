document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("span")?.focus();
});

function darkMode() {
    document.body.classList.toggle("dark");
}

function fontSizeAuto(element, maxFontSize) {
    let fontSize = maxFontSize;
    let text = element.querySelector("span");

    let maxHeight = element.clientHeight;
    let maxWidth = element.clientWidth;

    do {
        text.style.fontSize = fontSize + 'px';
        fontSize--;
    } while ((text.offsetHeight > maxHeight || text.offsetWidth > maxWidth) && fontSize > 3);
}

document.querySelector(".input span").addEventListener("input", () => {
    fontSizeAuto(textArea, 200);
});

function saveInput() {
    let text = document.querySelector(".input span");

    let valueinput = text.innerText

    let blobdtMIME = new Blob([valueinput], { type: "text/plain" })
    let url = URL.createObjectURL(blobdtMIME)
    let anele = document.createElement("a")
    anele.setAttribute("download", "namagawaki");
    anele.href = url;
    anele.click();
    console.log(blobdtMIME)
}

let textArea = document.querySelector(".input");
let wpmDisplay = document.querySelector(".wpm");
let wpmUnit = document.querySelector(".wpmstat");

let startTime = null;
let interval = null;
let wpmEnabled = false;

function calculateWPM() {
    let content = textArea.innerText.trim();

    let words = content.split(/\s+/).filter(word => word.length > 0).length;

    // Convert ms to minutes
    let elapsedTime = (new Date().getTime() - startTime) / 60000;

    // Calculate WPM
    let wpm = elapsedTime > 0 ? Math.round(words / elapsedTime) : 0;

    wpmDisplay.textContent = wpm;
}

textArea.addEventListener("input", () => {
    if (wpmEnabled) {
        if (!interval) {
            startWPM();
        }
    }
});

function startWPM() {
    if (!startTime) {
        startTime = new Date().getTime();
    }
    if (!interval) {
        interval = setInterval(calculateWPM, 1000);
    }
    wpmDisplay.style.visibility = "visible";
    wpmUnit.style.visibility = "visible";
}

function stopWPM() {
    clearInterval(interval);
    interval = null;
    startTime = null;
    wpmDisplay.textContent = 0; // Reset WPM display
    wpmDisplay.style.visibility = "hidden";
    wpmUnit.style.visibility = "hidden";
}

document.querySelector('.input').addEventListener('input', () => {
    let wordCount = textArea.innerText.trim().split(/\s+/).filter(word => word.length > 0).length;
    let charCount = textArea.innerText.length;
    if (textArea.innerText.trim() === "") {charCount = 0;}
    document.title = wordCount + "｜" + charCount;
});

// Keyboard Shortcuts
document.addEventListener('keydown', event => {
    // ctrl or cmd + B (dark mode)
    if ((event.ctrlKey || event.metaKey) && event.key === "1") {
        event.preventDefault(); // Prevents default browser shortcuts
        darkMode();
    } // ctrl or cmd + J (save file)
    else if ((event.ctrlKey || event.metaKey) && event.key === "2") {
        event.preventDefault();
        saveInput();
    } // ctrl or cmd + K (speedometer)
    else if ((event.ctrlKey || event.metaKey) && event.key === "3") {
        event.preventDefault();
        wpmEnabled = !wpmEnabled;
        if (wpmEnabled) {
            startWPM();
        } else {
            stopWPM();
        }
    } // ctrl or cmd + K (prank)
    else if ((event.ctrlKey || event.metaKey) && event.key === "4") {
        event.preventDefault();
        window.open("https://www.youtube.com/watch?v=At8v_Yc044Y&t=57s", "_blank");
    }
});
