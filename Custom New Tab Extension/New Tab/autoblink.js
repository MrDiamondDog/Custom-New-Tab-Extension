function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.getElementById('blinker').onclick = async function () {
    for (let index = 0; index < 100; index++) {
        document.getElementById("blinker").src = "blink1.jpg"
        await sleep(1000)
        document.getElementById("blinker").src = "blink2.jpg"
        await sleep(100)
    }
}