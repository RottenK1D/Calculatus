const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const currentOutput= document.querySelector('[data-current-output]')
const previousOutput= document.querySelector('[data-previous-output]')

class Calculator {
    constructor(previousOutput, currentOutput) {
        this.previousOutput = previousOutput;
        this.currentOutput = currentOutput;
        this.delete()
    }

    delete() {
        this.previousOperand= ''
        this.currentOperand = ''
        this.operation = undefined 
    }

    addNumber(number) {
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    addOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.calculate()
          }
        this.operation = operation 
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    calculate() {
        let compute
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                compute = prev + current
                break
            case '-':
                compute = prev - current
                break
            case '*':
                compute = prev * current
                break
            case '/':
                compute = prev / current
                break
            default:
                return
        }
        this.currentOperand = compute
        this.operation = undefined
        this.previousOperand = ''
    }

    getNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateField() {
        this.currentOutput.innerText = 
            this.getNumber(this.currentOperand)
        if(this.operation != null) {
            this.previousOutput.innerText = 
            `${this.previousOperand} ${this.operation}`
        }else { 
            this.previousOutput.innerText = ''
        }
    }
}

const calculator = new Calculator(previousOutput, currentOutput)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addNumber(button.innerText)
        calculator.updateField()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addOperation(button.innerText)
        calculator.updateField()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.calculate()
    calculator.updateField()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateField()
})
