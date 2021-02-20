const calculator = {
  displayNumber: '0',
  operator: null,
  firstNumb: null,
  waitingForSecondNumber: false
};

const updateDisplay = () => {
  document.querySelector('#displayNumber').innerHTML = calculator.displayNumber;
}

const clearCalculator = () => {
  calculator.displayNumber = '0';
  calculator.operator = null;
  calculator.firstNumb = null;
  calculator.waitingForSecondNumber = false;
}

const inputDigit = (digit) => {
  if (calculator.displayNumber === '0') {
    calculator.displayNumber = digit
  }else{
    calculator.displayNumber += digit;
  }
}

const buttons = document.querySelectorAll('.button');
for(let button of buttons){
  button.addEventListener('click', (event) => {
    // ambil objek elemen yang di klik
    const target = event.target;
    
    if (target.classList.contains('clear')) {
      clearCalculator();
      updateDisplay();
      return;
    }

    if (target.classList.contains('negative')) {
      inverseNumber();
      updateDisplay();
      return;
    }

    if (target.classList.contains('equals')) {
      performCalculation();
      updateDisplay();
      return;
    }

    if (target.classList.contains('operator')) {
      handleOperator(target.innerText);
      return;
    }

    inputDigit(target.innerText);
    updateDisplay();
  })
}

const inverseNumber = () => {
  if (calculator.displayNumber === '0') {
    return;
  }
  calculator.displayNumber *= -1;
}

const handleOperator = (operator) => {
  if(!calculator.waitingForSecondNumber) {
    calculator.operator = operator;
    calculator.waitingForSecondNumber = true;
    calculator.firstNumb = calculator.displayNumber;

    // ubah display ke 0
    calculator.displayNumber = '0';
  } else{
    alert('operator sudah ada');
  }
}

const performCalculation = () => {
  if (calculator.firstNumb == null || calculator.operator == null) {
    alert('operator belum ada');
    return;
  } 

  let result = 0;
  if (calculator.operator === '+') {
    result = parseInt(calculator.firstNumb) + parseInt(calculator.displayNumber);
  } else if(calculator.operator === '-') {
    result = parseInt(calculator.firstNumb) - parseInt(calculator.displayNumber);
  }

  // object untuk localstorage
  const history = {
    firstNumber: calculator.firstNumb,
    secondNumber: calculator.displayNumber,
    operator: calculator.operator,
    result: result
  }

  console.log(history);

  putHistory(history);
  calculator.displayNumber = result;
  renderHistory();
}