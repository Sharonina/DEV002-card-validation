import validator from './validator.js'
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
        /* inputs[0].classList.add("hideNumbers");
        inputs[1].classList.add("hideNumbers");
        inputs[2].classList.add("hideNumbers"); */
        inputs[0].type = "password"
        inputs[1].type = "password"
        inputs[2].type = "password"

        hideNumbersButton.innerHTML = "Mostrar dígitos"
    }else{
        /* inputs[0].classList.remove("hideNumbers");
        inputs[1].classList.remove("hideNumbers");
        inputs[2].classList.remove("hideNumbers"); */
        inputs[0].type = "number"
        inputs[1].type = "number"
        inputs[2].type = "number"

        hideNumbersButton.innerHTML = "Ocultar dígitos"
    }
}

//Validación de tarjeta
//convertir node list a array de num
const validateCard = document.querySelector(".validate-card-button");
const userNameInput = document.querySelector(".user-name-input")
const card = document.querySelector(".data-card")
const cardImage = document.querySelector(".card-image")
const userNameSpan = document.querySelector(".user-name-span")
const cardNumbersSpan = document.querySelector(".card-numbers-span")

validateCard.onclick = () => {
    console.log('hello')
    const errors = {}
    cardImage.classList.remove("mistake-shake-color");
    cardNumbersSpan.classList.add("display-off");
    userNameSpan.classList.add("display-off");

    if(inputs[0].value.length == 0 || inputs[1].value.length == 0 || inputs[2].value.length == 0 || inputs[3].value.length == 0 ){
        errors.cardNumbers = true
        errors.name = true
        card.classList.add("mistake-shake");
        cardImage.classList.add("mistake-shake-color");
        cardNumbersSpan.classList.remove("display-off");
        setTimeout(() => card.classList.remove("mistake-shake"), 1000)
    }
    if(userNameInput.value.length == 0){
        errors.name = true
        card.classList.add("mistake-shake");
        cardImage.classList.add("mistake-shake-color");
        userNameSpan.classList.remove("display-off");
        setTimeout(() => card.classList.remove("mistake-shake"), 1000)
    }

    if(!errors.cardNumbers && !errors.name){
        const cardInputNumbers = [];

        let inputsValue = [...inputs]
        inputsValue.forEach(item => cardInputNumbers.push(item.value))

        const cardNumbers = cardInputNumbers.map(item => item.split(''))
        let newCardNumbers = [...cardNumbers[0], ...cardNumbers[1], ...cardNumbers[2], ...cardNumbers[3]];
        const realCardNumbers = newCardNumbers.map(item => parseInt(item))

    //operaciones
        const isCardValid = validator.isValid(realCardNumbers)

    //condicionales para el mensaje de validacion
        const validationMessage = document.querySelector(".validation-message");
        const messageSpan = document.querySelector(".message-span");
        const iconImg = document.querySelector(".icon-img");

        if(isCardValid){
            validationMessage.classList.remove("display-off");
            validateCard.classList.add("display-off")
            console.log('true')
        } else{
            validationMessage.classList.remove("display-off");
            messageSpan.innerHTML = "¡Lo sentimos! Tu tarjeta es invalida"
            validateCard.classList.add("display-off")
            iconImg.src = "imgs/x-mark.png"
            console.log('false')
        }
    }
}

//Validar nueva tarjeta
const validateNewCard = document.querySelector(".validate-new-card");

validateNewCard.onclick = () => {
    window.location.reload()
}
