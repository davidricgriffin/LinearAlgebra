
function Fraction(numerator, denominator) {
    this.numerator = numerator;
    this.denominator = denominator;
}

Fraction.prototype.add = function(other) {
    let numerator = this.numerator * other.denominator + this.denominator * other.numerator;
    let denominator = this.denominator * other.denominator;
    return new Fraction(numerator, denominator);
}

Fraction.prototype.subtract = function(other) {
    let numerator = this.numerator * other.denominator - this.denominator * other.numerator;
    let denominator = this.denominator * other.denominator;
    return new Fraction(numerator, denominator);
}

Fraction.prototype.multiply = function(other) {
    let numerator = this.numerator * other.numerator;
    let denominator = this.denominator * other.denominator;
    return new Fraction(numerator, denominator);
}

Fraction.prototype.divide = function(other) {
    let numerator = this.numerator * other.denominator;
    let denominator = this.denominator * other.numerator;
    return new Fraction(numerator, denominator);
}

Fraction.prototype.toString = function() {
    return `${this.numerator}/${this.denominator}`;
}

function gcd(a, b) {
    if (b === 0) {
        return a;
    } else {
        return gcd(b, a % b);
    }
}

Fraction.prototype.simplify = function() {
    let common = gcd(this.numerator, this.denominator);
    this.numerator /= common;
    this.denominator /= common;
    return this;
}

let rowsInput = document.getElementById('rows');
let colsInput = document.getElementById('cols');
let matrixAContainer = document.getElementById('matrix-a');
let matrixBContainer = document.getElementById('matrix-b');
let operationButton = document.getElementById('operation-button');
let operation = 'addition';

function generateMatrix(container, rows, cols) {
    container.innerHTML = '';
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let inputField = document.createElement('input');
            inputField.type = 'text'; // Allow users to enter fractions
            inputField.value = '0'; // Default value is 0/1
            inputField.id = container.id + '-' + i + '-' + j;
            container.appendChild(inputField);
        }
        container.appendChild(document.createElement('br'));
    }
}

function calculate() {
    let rows = parseInt(rowsInput.value);
    let cols = parseInt(colsInput.value);
    let matrixA = [];
    let matrixB = [];

    for (let i = 0; i < rows; i++) {
        matrixA[i] = [];
        matrixB[i] = [];
        for (let j = 0; j < cols; j++) {
            let valueA = document.getElementById('matrix-a-' + i + '-' + j).value
            let valueB = document.getElementById('matrix-b-' + i + '-' + j).value
            matrixA[i][j] = parseFraction(valueA)
            matrixB[i][j] = parseFraction(valueB)
        }
    }

    let result;
    if (operation == 'addition') {
        result = addMatrices(matrixA, matrixB);
    } else {
        result = subtractMatrices(matrixA, matrixB);
    }

    let resultHtml = '';
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].length; j++) {
            let fraction = result[i][j];
            if (fraction.denominator === 1) {
                resultHtml += `<input type="text" value="${fraction.numerator}" readonly>`;
            } else {
                resultHtml += `<input type="text" value="${fraction.toString()}" readonly>`;
            }
        }
        resultHtml += '<br>';
    }

    document.getElementById('result').innerHTML = resultHtml;
}

function addMatrices(a, b) {
    let result = [];
    for (let i = 0; i < a.length; i++) {
        result[i] = [];
        for (let j = 0; j < a[0].length; j++) {
            result[i][j] = a[i][j].add(b[i][j]);
        }
    }
    return result;
}

function subtractMatrices(a, b) {
    let result = [];
    for (let i = 0; i < a.length; i++) {
        result[i] = [];
        for (let j = 0; j < a[0].length; j++) {
            result[i][j] = a[i][j].subtract(b[i][j]);
        }
    }
    return result;
}

function parseFraction(str) {
    let parts = str.split('/');
    if (parts.length === 1) {
        return new Fraction(parseInt(parts[0]), 1);
    } else {
        return new Fraction(parseInt(parts[0]), parseInt(parts[1]));
    }
}

operationButton.addEventListener('click', () => {
    if (operation == 'addition') {
        operation = 'subtraction';
        operationButton.textContent = '-';
    } else {
        operation = 'addition';
        operationButton.textContent = '+';
    }
});

rowsInput.addEventListener('change', () => {
    let rows = parseInt(rowsInput.value);
    let cols = parseInt(colsInput.value);
    generateMatrix(matrixAContainer, rows, cols);
    generateMatrix(matrixBContainer, rows, cols);
});

colsInput.addEventListener('change', () => {
    let rows = parseInt(rowsInput.value);
    let cols = parseInt(colsInput.value);
    generateMatrix(matrixAContainer, rows, cols);
    generateMatrix(matrixBContainer, rows, cols);
});

generateMatrix(matrixAContainer, 3, 3);
generateMatrix(matrixBContainer, 3, 3);