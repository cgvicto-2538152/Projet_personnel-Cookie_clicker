// = = = = = = = = = = = = = = = //
// = = = = = VARIABLES = = = = = //
// = = = = = = = = = = = = = = = //


const cookie_btn = document.getElementById('cookie');

const cookieCount = document.getElementById('cookie-count');
const cookiePerClick = document.getElementById('cookie-per-click');
const cookiePerSecond = document.getElementById('cookie-per-second');

const addCursorBtn = document.getElementById('add-cursor-btn');
const addCursorCost = document.getElementById('add-cursor-cost');
const addCursorCount = document.getElementById('add-cursor-count');

const upgradesCursorBtn = document.getElementById('upgrades-cursor-btn');
const upgradesCursorCost = document.getElementById('upgrades-cursor-cost');
const upgradesCursorCount = document.getElementById('upgrades-cursor-count');


const reset = document.getElementById('reset');
const save = document.getElementById('save');


let cookie = 0;

let cookiePerClickValue = 133;
let cookiePerSecondValue = 0;

// = = = = = = = = = = = = = = = //
// = = = = = FUNCTIONS = = = = = //
// = = = = = = = = = = = = = = = //

function AddCookie(value = 1) {
    cookie += value;
    UpdateBtnState();
}

function UpdateUI(element, value) {
    element.innerHTML = value;
}

function UpdateBtnState() {
    if (cookie >= CalculerPrixAssistant()) {
        addCursorBtn.classList.remove('disabled');
    }
    else {
        addCursorBtn.classList.add('disabled');
    }
    if (cookie >= CalculerPrixForce()) {
        upgradesCursorBtn.classList.remove('disabled');
    }
    else {
        upgradesCursorBtn.classList.add('disabled');
    }
}

function CalculerPrixAssistant() {
    const base = 50;
    const alpha = 0.25;
    const beta = 1.05;
    const prix = base * Math.pow(1 + alpha, Math.pow(cookiePerSecondValue, beta));
    return Math.round(prix);
}

function CalculerPrixForce() {
    const base = 200;
    const alpha = 0.25;
    const beta = 1.05;
    const prix = base * Math.pow(1 + alpha, Math.pow(cookiePerClickValue, beta));
    return Math.round(prix);
}

// = = = = = = = = = = = = = = = //
// = = = = = EVENT LISTENER = = = //
// = = = = = = = = = = = = = = =  //

cookie_btn.addEventListener('click', () => {
    AddCookie(cookiePerClickValue);
    UpdateUI(cookieCount, cookie + ' Cookie(s)');
    UpdateBtnState();
});

addCursorBtn.addEventListener('click', () => {
    if (cookie >= CalculerPrixAssistant()) {
        cookie -= CalculerPrixAssistant();
        cookiePerSecondValue += 1;
        UpdateUI(cookieCount, cookie + ' Cookie(s)');
        UpdateUI(cookiePerSecond, cookiePerSecondValue + ' Cookie(s) / sec');
        UpdateUI(addCursorCost, CalculerPrixAssistant() + ' Cookie(s)');
        UpdateUI(addCursorCount, cookiePerSecondValue);
    }
});

upgradesCursorBtn.addEventListener('click', () => {
    if (cookie >= CalculerPrixForce()) {
        cookie -= CalculerPrixForce();
        cookiePerClickValue += 1;
        UpdateUI(cookieCount, cookie + ' Cookie(s)');
        UpdateUI(cookiePerClick, cookiePerClickValue + ' Cookie(s) / clic');
        UpdateUI(upgradesCursorCost, CalculerPrixForce() + ' Cookie(s)');
        UpdateUI(upgradesCursorCount, cookiePerClickValue);
    }
});



reset.addEventListener('click', () => {
    if (confirm('Etes-vous sur de vouloir reset ?\n(Vous perdrez tout vos cookies et votre progression)')) {
        cookie = 0;
        cookiePerClickValue = 1;
        cookiePerSecondValue = 0;
        localStorage.clear();
        UpdateUI(cookieCount, cookie + ' Cookie(s)');
        UpdateUI(cookiePerClick, cookiePerClickValue + ' Cookie(s) / clic');
        UpdateUI(cookiePerSecond, cookiePerSecondValue + ' Cookie(s) / sec');
        UpdateUI(addCursorCost, CalculerPrixAssistant() + ' Cookie(s)');
        UpdateUI(addCursorCount, cookiePerSecondValue);
        UpdateUI(upgradesCursorCost, CalculerPrixForce() + ' Cookie(s)');
        UpdateUI(upgradesCursorCount, cookiePerClickValue);
    }
});


save.addEventListener('click', () => {
    if (confirm('Etes-vous sur de vouloir sauvegarder ?')) {
        localStorage.setItem('cookie', cookie);
        localStorage.setItem('cookiePerClickValue', cookiePerClickValue);
        localStorage.setItem('cookiePerSecondValue', cookiePerSecondValue);
    }
});

window.addEventListener('load', () => {

    let storedCookie = localStorage.getItem('cookie');
    let storedClick = localStorage.getItem('cookiePerClickValue');
    let storedSecond = localStorage.getItem('cookiePerSecondValue');

    if (storedCookie === null) {
        cookie = 0;
    }
    else {
        cookie = Number(storedCookie);
    }
    if (storedClick === null) {
        cookiePerClickValue = 1;
    }
    else {
        cookiePerClickValue = Number(storedClick);
    }
    if (storedSecond === null) {
        cookiePerSecondValue = 0;
    }
    else {
        cookiePerSecondValue = Number(storedSecond);
    }

    UpdateUI(cookieCount, cookie + ' Cookie(s)');
    UpdateUI(cookiePerClick, cookiePerClickValue + ' Cookie(s) / clic');
    UpdateUI(cookiePerSecond, cookiePerSecondValue + ' Cookie(s) / sec');


    UpdateUI(addCursorCost, CalculerPrixAssistant() + ' Cookie(s)');
    UpdateUI(upgradesCursorCost, CalculerPrixForce() + ' Cookie(s)');


});

// = = = = = = = = = = = = = = = //
// = = = = = = = Misc = = = = = = //
// = = = = = = = = = = = = = = = //



// at each 1000ms (1s)
setInterval(() => {
    AddCookie(cookiePerSecondValue);
    UpdateUI(cookieCount, cookie + ' Cookie(s)');
    UpdateBtnState();
}, 1000);

setInterval(() => {
    UpdateBtnState();
}, 100);



