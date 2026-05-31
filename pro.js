const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");

        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }

        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;

    if (amountVal === "" || amountVal <= 0) {
        amountVal = 1;
        amount.value = "1";
    }

    const from = fromCurr.value.toLowerCase();
    const to = toCurr.value.toLowerCase();

    const URL =
    `https://latest.currency-api.pages.dev/v1/currencies/${from}.json`;

    try {
        let response = await fetch(URL);
        let data = await response.json();

        let rate = data[from][to];

        let finalAmount = amountVal * rate;

        console.log(finalAmount);

        msg.innerText =
        `${amountVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;

    } catch (error) {
        console.log(error);
        msg.innerText = "Error fetching exchange rate";
    }
};

const updateFlag = (element) => {
    let currCode = element.value;

    let countryCode = countryList[currCode];

    let newSrc =
    `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img =
    element.parentElement.querySelector("img");

    img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});