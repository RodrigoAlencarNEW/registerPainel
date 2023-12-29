const genClass = document.querySelector(".genClass");
const passClass = document.querySelector(".passClass");
const submitBtn = document.querySelector(".submitBtn");
const btnOpenContainer = document.querySelector(".generatorText a");

const generatorContainer = document.querySelector(".generator");
const charAmount = document.querySelector(".chars");
const btnGenerate = document.querySelector(".btn");
const generatedPass = document.querySelector(".inputGenerator");
const numberInput = document.querySelector("#number");
const letterInput = document.querySelector("#letter");
const symbolInput = document.querySelector("#symbol");
const useBtn = document.querySelector(".useBtn");

const password = document.querySelector("#password");
const repeatPass = document.querySelector("#repeatPassword");
const repeatContainer = document.querySelector(
  "#repeatPasswordContainer label"
);

const toggleHide = () => {
  genClass.classList.toggle("hide");
  passClass.classList.toggle("hide");
  submitBtn.classList.toggle("hide");
};

const getUpperLetter = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};
const getLowerLetter = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getNumber = () => {
  return Math.floor(Math.random() * 10).toString();
};

const getSymbol = () => {
  const symbols = "[]{}()*%$#@!&=+^~";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const generatePass = (getUpperLetter, getLowerLetter, getNumber, getSymbol) => {
  let amountCharacter = charAmount.value;
  if (amountCharacter <= 0) {
    amountCharacter = 6;
    charAmount.value = amountCharacter;
  }

  if (amountCharacter > 15) {
    amountCharacter = 15;
    charAmount.value = amountCharacter;
  }

  let password = "";

  const generators = [];

  if (letterInput.checked) {
    generators.push(getUpperLetter, getLowerLetter);
  }

  if (numberInput.checked) {
    generators.push(getNumber);
  }

  if (symbolInput.checked) {
    generators.push(getSymbol);
  }

  if (generators.length === 0) {
    charAmount.value = "";
    generatedPass.value = "";
    return;
  }

  for (i = 0; i < amountCharacter; i = i + generators.length) {
    generators.forEach(() => {
      const valuePass =
        generators[Math.floor(Math.random() * generators.length)]();
      password += valuePass;
    });
  }

  generatedPass.value = password.slice(0, amountCharacter);
};

const usePass = (pass) => {
  repeatPass.value = pass;
  password.value = pass;
};

const clear = () => {
  repeatPass.value = "";
  password.value = "";
  generatedPass.value = "";
  charAmount.value = "";
};

validationPassword = () => {
  repeatContainer.innerText = "As senhas devem ser iguais";
  repeatContainer.style.color = "red";
  repeatPass.style.border = "red 1px solid";
  repeatPass.style.rotate = "360deg";

  setTimeout(() => {
    repeatContainer.innerText = "Confirme sua senha";
    repeatContainer.style.color = "";
    repeatPass.style.border = "";
  }, 1000);
};

btnOpenContainer.addEventListener("click", (e) => {
  e.preventDefault();
  clear();
  toggleHide();
});

btnGenerate.addEventListener("click", () => {
  generatePass(getUpperLetter, getLowerLetter, getNumber, getSymbol);
});

useBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (generatedPass.value) {
    usePass(generatedPass.value);
  } else {
    return;
  }

  toggleHide();
});

charAmount.addEventListener("keyup", (e) => {
  e.preventDefault();
  let valueInput = charAmount.value;
  if (valueInput <= 0) {
    charAmount.value = 1;
  }
  if (valueInput > 15) {
    charAmount.value = 15;
  }
  if (isNaN(valueInput)) {
    charAmount.value = 1;
  }
});

generatedPass.addEventListener("click", (e) => {
  e.preventDefault();
  const valueInput = generatedPass.value;
  let oldValue = valueInput;

  if (!valueInput) {
    return;
  }

  navigator.clipboard.writeText(valueInput).then(() => {
    generatedPass.value = "Copiado!";

    setTimeout(() => {
      generatedPass.value = oldValue;
    }, 1000);
  });
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const pass = password.value;
  const rePass = repeatPass.value;

  if (!pass || !rePass) {
    return;
  }

  if (pass != rePass) {
    validationPassword();
    return;
  }
});
