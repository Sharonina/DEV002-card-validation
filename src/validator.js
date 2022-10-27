const validator = {
  isValid: (realCardNumbers) => {
    let cardNumbers = []
    if(typeof realCardNumbers === 'string'){
      cardNumbers = realCardNumbers.split('').map(number => parseInt(number))
    }else{
      cardNumbers = realCardNumbers
    }
    const validation = cardNumbers.map((item, index) => {
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
    const isCardValid = validationSum % 10 === 0
    console.log(isCardValid)
    return isCardValid
  },
  maskify: (cardNumber) => {
    if(cardNumber.length > 4){
      const maskedCard = cardNumber.split('').map((number, index) => {
        if(index < cardNumber.length - 4){
          return '#'
        }else{
          return number
        }
      })
      return maskedCard.join('')
    }else{
      return cardNumber
    }
  }
};

export default validator;
