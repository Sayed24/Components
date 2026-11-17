
function changeColor() {
    const colors = [
        "#dceeff",
        "#d1fae5",
        "#fce7f3",
        "#fef3c7",
        "#e9d5ff"
    ];

    const randomColor = colors[
        Math.floor(Math.random() * colors.length)
    ];

    document.querySelector(".hero").style.background = randomColor;
}

function updateClock() {
    const now = new Date();

    document.getElementById("clock").textContent =
        "Current Time: " + now.toLocaleTimeString();
}

updateClock();
setInterval(updateClock, 1000);
