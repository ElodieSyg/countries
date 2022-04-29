const country_name = document.getElementById("country_name");
const time = document.getElementById("time");
const result_name = document.getElementById("result");
const result_countries = document.getElementById("random_countries");
const toogle_countries = document.getElementById("toogle_countries");
///
const replace_sentence = document.getElementById("replace_sentence");
const replace_letter = document.getElementById("replace_letter");
const replace_result = document.getElementById("replace_result");
///
const binary = document.getElementById("binary");
const binary_result = document.getElementById("binary_result");
///
const math_value = document.getElementById("math_random");
const math_result = document.getElementById("math_result");
///
const stair_input = document.getElementById("stairs");
const stair_result = document.getElementById("stair_result")

/* Variables */
let date = new Date().toLocaleString();
let randomCountries = [];
let isShow = false;
let country;
let result;

let replaceSentence;
let replaceLetter;

let binarySentence;

let mathValue;

let stairValue;

/* Render */
time.innerHTML = `
    ${date}
`;

/* AddEventListenner */
country_name.addEventListener("input", e => {
    country = e.target.value;
});

replace_sentence.addEventListener("input", e => {
    replaceSentence = e.target.value;
});

replace_letter.addEventListener("input", e => {
    replaceLetter = e.target.value;
});

binary.addEventListener("input", e => {
    binarySentence = e.target.value;
});

math_value.addEventListener("input", e => {
    mathValue = e.target.value;
});

stair_input.addEventListener("input", e => {
    stairValue = e.target.value
})

/* Functions for rest countries project */
const fetch_api = async () => {
    play_audio().play();

    if (!country) return alert("Merci d'indiquer un pays");

    await fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then(response => response.json())
        .then(data => result = data[0]);

    if (result) {
        return result_name.innerHTML = `
            <div class="card">
                ${result.name.common}</br>
                Capitale : ${result.capital[0]}</br>
                Population : ${result.population}</br>
                <img src=${result.flags.png} alt="flag" width="100%" height="100%"/>
            </div>
        `;
    };

    return result_name.innerHTML = `
        Pas de pays correspondant...
    `;
};

const fetch_second_api = async () => {
    let res;
    randomCountries = [];
    
    await fetch(`https://restcountries.com/v2/all`)
        .then(response => response.json())
        .then(data => res = data);

    for (let i = 0; i <= 9; i++) {
        let random = Math.floor(Math.random() * res.length);
        randomCountries.push(res[random]);
    };

    if (randomCountries.length === 10 && isShow) {
        result_countries.innerHTML = ``;
        return randomCountries.forEach(element => {
            result_countries.innerHTML += `
                <div class="card">
                    ${element.name}</br>
                    Capitale : ${element.capital}</br>
                    Population : ${element.population}</br>
                    <img src=${element.flags.svg} alt="flag" width="100%" height="100%" /></br>
                </div>
            `;
        });
    };

    return result_countries.innerHTML = ``;
};

const toogle_function = () => {
    play_audio().play();
    isShow ? isShow = false : isShow = true;
    fetch_second_api();
};

const play_audio = () => {
    let audio = new Audio("Enter.mp3");
    return audio;
};

/* Replace random letter in sentence function */
const replace = () => {
    play_audio().play();

    let random = Math.floor(Math.random() * replaceSentence.length);

    replaceSentence = replaceSentence.replace(replaceSentence[random], replaceLetter.toUpperCase());
    
    replace_result.innerHTML = `
        La phrase à été remplacée : ${replaceSentence}
    `;
};

/* Translate sentence in binary function */
const translate_binary = () => {
    play_audio().play();

    let value = "";

    for (var i = 0; i < binarySentence.length; i++) {
        value += binarySentence[i].charCodeAt(0).toString(2) + " ";
    };

    binary_result.innerHTML = `
        La phrase en binaire : ${value}
    `;
};

/* Pick a random number */
const math_random = () => {
    play_audio().play();

    let random = Math.floor(Math.random() * mathValue);

    math_result.innerHTML = `
        ${random}
    `;
};

/* Input * */
const stairs = () => {
    let temp = "";

    for (let i = 0; i < stairValue; i++) {
        temp += "*";
        stair_result.innerHTML += `
            ${temp}</br>
        `
    };
};