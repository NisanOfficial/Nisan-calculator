let display = document.getElementById('display');
let currentInput = '';
let operator = null;
let previousValue = null;

function appendNumber(num) {
    currentInput += num;
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '' && op !== '-') return;
    
    if (operator !== null && currentInput !== '') {
        calculateResult();
    }
    
    if (op === '-' && currentInput === '') {
        currentInput = '-';
        updateDisplay();
        return;
    }
    
    previousValue = currentInput;
    operator = op;
    currentInput = '';
}

function clearDisplay() {
    currentInput = '';
    operator = null;
    previousValue = null;
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function calculateResult() {
    if (operator === null || currentInput === '' || previousValue === null) return;

    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousValue = null;
    updateDisplay();
}

function updateDisplay() {
    display.value = currentInput || '0';
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '.') appendNumber('.');
    if (e.key === '+' || e.key === '-') appendOperator(e.key);
    if (e.key === '*') {
        e.preventDefault();
        appendOperator('*');
    }
    if (e.key === '/') {
        e.preventDefault();
        appendOperator('/');
    }
    if (e.key === 'Enter') {
        e.preventDefault();
        calculateResult();
    }
    if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLast();
    }
    if (e.key === 'Escape') clearDisplay();
});