const inputs = document.querySelectorAll(".cardInput");
inputs.forEach((input, index) => input.onkeyup = () => {
    const maxLength = input.getAttribute("maxlength");
    cardValidation(input, maxLength, index)
})

function cardValidation(input, maxLength, index){
    if(input.value.length === 4 && index < 3){
        inputs[index + 1].focus()
    }else if(input.value.length > 4){
        input.value = input.value.substring(0, maxLength)
    }
}