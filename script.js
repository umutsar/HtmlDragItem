const items = document.querySelectorAll('.item');
const dropzones = document.querySelectorAll('.dropzone');
const checkButton = document.getElementById('checkButton');
const resetButton = document.getElementById('resetButton');
const feedback = document.getElementById('feedback');

setTimeout(() => {
    Array.from(document.getElementsByClassName("dropzone")).forEach((element) => {
        element.querySelector("img").classList.add("hidden")
    })

}, 1000);

let yukaridanSectigimiz = "";
let asagidakiHedef = "";
const degerler = {
    "dropzone1": "Köpek",
    "dropzone2": "Armut",
    "dropzone3": "Kedi",
    "dropzone4": "Elma"
}

const kontrol = () => {
    console.log("Log: ", yukaridanSectigimiz, ",,, ", degerler[asagidakiHedef.id])

    if (yukaridanSectigimiz == degerler[asagidakiHedef.id]) {
        console.log("Doğru")
        
        
    } else {
        console.log("Yanlış")
    }
}

let originalPositions = {};

items.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragover', dragOver);
    dropzone.addEventListener('drop', drop);
});

checkButton.addEventListener('click', checkMatches);
resetButton.addEventListener('click', resetMatches);

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    yukaridanSectigimiz = String(document.getElementById(event.target.id).innerText)
    event.target.classList.add('dragging');
    originalPositions[event.target.id] = event.target.parentNode.id;
}

function dragEnd(event) {
    event.target.classList.remove('dragging');

}

function dragOver(event) {
    event.preventDefault();
}



function drop(event) {
    event.preventDefault();
    const droppedItemId = event.dataTransfer.getData('text/plain');

    const dropzone = event.target;
    asagidakiHedef = dropzone.id

    if (dropzone.classList.contains('dropzone')) {
        asagidakiHedef = dropzone;
        kontrol();
    }
}

function checkMatches() {
    let allCorrect = true;
    dropzones.forEach(dropzone => {
        const itemId = dropzone.firstChild ? dropzone.firstChild.id : null;
        if (!itemId || correctMatches[itemId] !== dropzone.textContent.trim()) {
            allCorrect = false;
            dropzone.style.backgroundColor = '#fba';
        } else {
            dropzone.style.backgroundColor = '#bfb';
        }
    });

    if (allCorrect) {
        feedback.textContent = "Tebrikler! Tüm eşleştirmeler doğru.";
    } else {
        feedback.textContent = "Bazı eşleştirmeler hala yanlış. Lütfen tekrar deneyin.";
    }
}

function resetMatches() {
    dropzones.forEach(dropzone => {
        dropzone.innerHTML = '';
        dropzone.style.backgroundColor = '#ddd';
    });
    feedback.textContent = '';

    // Sürüklenen öğeleri başlangıç konumuna geri götürme
    items.forEach(item => {
        const originalPositionId = originalPositions[item.id];
        const originalPosition = document.getElementById(originalPositionId);
        originalPosition.appendChild(item);
    });
}
