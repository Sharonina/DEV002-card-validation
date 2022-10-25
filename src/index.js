//Validación de numero de caracteres, salto al siguiente input
const inputs = document.querySelectorAll(".cardInput");

inputs.forEach((input, index) => input.onkeyup = () => {
    const maxLength = input.getAttribute("maxlength");
    cardCharacterValidation(input, maxLength, index)
})

function cardCharacterValidation(input, maxLength, index){
    if(input.value.length === 4 && index < 3){
        inputs[index + 1].focus()
    }else if(input.value.length > 4){
        input.value = input.value.substring(0, maxLength)
    }
}

//Ocultar/mostrar card numbers
const hideNumbersButton = document.querySelector(".hideNumbersButton");

hideNumbersButton.onclick = () => {
    if(hideNumbersButton.innerHTML === 'Ocultar dígitos'){
        inputs[0].classList.add("hideNumbers");
        inputs[1].classList.add("hideNumbers");
        inputs[2].classList.add("hideNumbers");

        hideNumbersButton.innerHTML = "Mostrar dígitos"
    }else{
        inputs[0].classList.remove("hideNumbers");
        inputs[1].classList.remove("hideNumbers");
        inputs[2].classList.remove("hideNumbers");

        hideNumbersButton.innerHTML = "Ocultar dígitos"
    }
}

//Validación de tarjeta
const validateCard = document.querySelector(".validate-card-button");

validateCard.onclick = () => {
    const cardInputNumbers = [];

    let inputsValue = [...inputs]
    inputsValue.forEach(item => cardInputNumbers.push(item.value))

    const cardNumbers = cardInputNumbers.map(item => item.split(''))
    let newCardNumbers = [...cardNumbers[0], ...cardNumbers[1], ...cardNumbers[2], ...cardNumbers[3]];
    const realCardNumbers = newCardNumbers.map(item => parseInt(item))

    console.log(cardInputNumbers)
    console.log(cardNumbers)
    console.log(newCardNumbers)
    console.log(realCardNumbers)
}


