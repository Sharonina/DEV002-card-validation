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

validateCard.onclick = () => {

    if(userNameInput.value.length == 0){
        card.classList.add("mistake-shake");
        cardImage.classList.add("mistake-shake-color");
        userNameSpan.classList.remove("display-off");
    } else {
        cardImage.classList.remove("mistake-shake-color");
        userNameSpan.classList.add("display-off");

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
    //Sumatoria
        const validationSum = validation.reduce((previo, actual) => previo + actual)
        console.log(validationSum)

    //condicionales para el mensaje de validacion
        const validationMessage = document.querySelector(".validation-message");
        const messageSpan = document.querySelector(".message-span");
        const iconImg = document.querySelector(".icon-img");

        if(validationSum % 10 === 0){
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
