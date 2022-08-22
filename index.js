class Calculator{
  constructor(previousOperandTextElement, currentOperandTextElement){
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear(){
    this.previous = ''
    this.current = ''
    this.operation = undefined
  }

  delete(){
    this.current = this.current.toString().slice(0, -1)
  }

  appendNumber(number){
    if(number === '.' && this.current.includes('.')) return
    // if(this.previous !== '' && this.operation === undefined) return
    this.current = this.current.toString() + number
  }

  chooseOperation(operation){
    if(this.current === '') return
    if(this.previous !== ''){ this.compute()}

    this.operation = operation
    this.previous = this.current
    this.current = ''
  }

  compute(){
    let result;
    let prev = parseFloat(this.previous)
    let curr = parseFloat(this.current)
    if(isNaN(prev) || isNaN(curr)) return
    switch(this.operation){
      case '+':
        result = prev + curr
        break;
      case '-':
        result = prev - curr
        break;
      case '/':
        result = prev / curr
        break;
      case '*':
        result = prev * curr
        break;
      default:
        return
    }

    this.previous = ''
    this.operation = undefined
    this.current = result
  }


  updateDisplay(){
    this.currentOperandTextElement.innerText = this.current
    
    if(this.operation){
      this.previousOperandTextElement.innerText = `${this.previous} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = this.previous
    }
    
  }


}

















const numberButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const equalButton = document.querySelector('[data-equals]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


numberButton.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

allClearButton.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})

operationButton.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalButton.addEventListener('click', () => {
  calculator.compute()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
})
































