const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");

// Load currency options
async function loadCurrencies() {
  const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
  const data = await res.json();
  const currencies = Object.keys(data.rates);

  currencies.forEach(code => {
    let option1 = document.createElement("option");
    option1.value = code;
    option1.textContent = code;

    let option2 = option1.cloneNode(true);

    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
  });

  fromCurrency.value = "USD";
  toCurrency.value = "INR";
}

// Convert currency
async function convertCurrency() {
  let amt = amount.value;
  if (amt === "" || amt <= 0) {
    result.innerHTML = "Please enter a valid amount.";
    return;
  }

  const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency.value}`);
  const data = await res.json();
  let rate = data.rates[toCurrency.value];
  let converted = (amt * rate).toFixed(2);

  result.innerHTML = `${amt} ${fromCurrency.value} = ${converted} ${toCurrency.value}`;
}

loadCurrencies();

