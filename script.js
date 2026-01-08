const sliderInput = document.querySelectorAll(".slider-box input"),
    priceInput = document.querySelectorAll(".price-input-box input"),
    fill = document.querySelector(".slider-fill"),
    minDisplay = document.getElementById("minDisplay"),
    maxDisplay = document.getElementById("maxDisplay");

let priceGap = 1;

const input = {
    get min() {
        return parseInt(sliderInput[0].value);
    },
    get max() {
        return parseInt(sliderInput[1].value);
    },
};

function updateDisplay() {
    minDisplay.textContent = `$${input.min}`;
    maxDisplay.textContent = `$${input.max}`;

    priceInput[0].value = input.min;
    priceInput[1].value = input.max;

    const maxRange = sliderInput[0].max;
    fill.style.left = (input.min / maxRange) * 100 + "%";
    fill.style.right = 100 - (input.max / maxRange) * 100 + "%";
}

sliderInput.forEach((slide) => {
    slide.addEventListener("input", (e) => {
        if (input.max - input.min < priceGap) {
            if (e.target.classList.contains("min-range")) {
                sliderInput[0].value = input.max - priceGap;
            } else {
                sliderInput[1].value = input.min + priceGap;
            }
        }
        updateDisplay();
    });
});

priceInput.forEach((el) => {
    el.addEventListener("input", (e) => {
        let minNum = parseInt(priceInput[0].value) || 0;
        let maxNum = parseInt(priceInput[1].value) || 0;
        if (maxNum - minNum >= priceGap && maxNum <= 5000) {
            if (e.target.classList.contains("input-min")) {
                sliderInput[0].value = minNum;
            } else {
                sliderInput[1].value = maxNum;
            }
            updateDisplay();
        }
    });
});

updateDisplay();
