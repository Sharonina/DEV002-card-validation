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
//convertir node list a array de num
const validateCard = document.querySelector(".validate-card-button");

validateCard.onclick = () => {
    const cardInputNumbers = [];

    let inputsValue = [...inputs]
    inputsValue.forEach(item => cardInputNumbers.push(item.value))

    const cardNumbers = cardInputNumbers.map(item => item.split(''))
    let newCardNumbers = [...cardNumbers[0], ...cardNumbers[1], ...cardNumbers[2], ...cardNumbers[3]];
    const realCardNumbers = newCardNumbers.map(item => parseInt(item))

//operaciones
    const validation = realCardNumbers.map((item, index) => {
        if((index + 1) % 2 === 0){
            let numberDouble = item * 2
            if(numberDouble > 9){
                const numberDobleString = numberDouble.toString()
                const numberDoubleSum = parseInt(numberDobleString.charAt(0)) + parseInt(numberDobleString.charAt(1))
                return numberDoubleSum
            } else{
                return numberDouble
            }
        } else{
            return item
        }
    })

    const validationSum = validation.reduce((previo, actual) => previo + actual)

    const validationMessageRight = document.querySelectorAll(".validation-message");

    console.log(validationSum)
    //Condicional de validación
    if(validationSum % 10 === 0){
        validationMessageRight.classList.remove("display-off");
        console.log('true')
    } else{
        console.log('false')
    }
}

