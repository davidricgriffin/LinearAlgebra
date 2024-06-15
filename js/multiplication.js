
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

let rowsAInput = document.getElementById('rows-a');
let colsAInput = document.getElementById('cols-a');
let rowsBInput = document.getElementById('rows-b');
let colsBInput = document.getElementById('cols-b');
let matrixAContainer = document.getElementById('matrix-a');
let matrixBContainer = document.getElementById('matrix-b');

function generateMatrix(container, rows, cols) {
    container.innerHTML = '';
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let inputField = document.createElement('input');
            inputField.type = 'text'; // Change type from 'number' to 'text'
            inputField.value = '0'; // Initialize with a fraction
            inputField.id = container.id + '-' + i + '-' + j;
            container.appendChild(inputField);
        }
        container.appendChild(document.createElement('br'));
    }
}

function calculate() {
    let rowsA = parseInt(rowsAInput.value);
    let colsA = parseInt(colsAInput.value);
    let rowsB = parseInt(rowsBInput.value);
    let colsB = parseInt(colsBInput.value);
    let matrixA = [];
    let matrixB = [];

    if (colsA !== rowsB) {
        alert("Number of columns in Matrix A must be equal to number of rows in Matrix B.");
        return;
    }

    for (let i = 0; i < rowsA; i++) {
        matrixA[i] = [];
        for (let j = 0; j < colsA; j++) {
            let input = document.getElementById('matrix-a-' + i + '-' + j).value;
            matrixA[i][j] = parseFraction(input); // Parse input as a fraction
        }
    }

    for (let i = 0; i < rowsB; i++) {
        matrixB[i] = [];
        for (let j = 0; j < colsB; j++) {
            let input = document.getElementById('matrix-b-' + i + '-' + j).value;
            matrixB[i][j] = parseFraction(input); // Parse input as a fraction
        }
    }

    let result = multiplyMatrices(matrixA, matrixB);

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

function multiplyMatrices(a, b) {
    let result = [];
    for (let i = 0; i < a.length; i++) {
        result[i] = [];
        for (let j = 0; j < b[0].length; j++) {
            let sum = new Fraction(0, 1);
            for (let k = 0; k < a[0].length; k++) {
                sum = sum.add(a[i][k].multiply(b[k][j]));
            }
            result[i][j] = sum.simplify();
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

        rowsAInput.addEventListener('change', () => {
            let rows = parseInt(rowsAInput.value);
            let cols = parseInt(colsAInput.value);
            generateMatrix(matrixAContainer, rows, cols);
        });

        colsAInput.addEventListener('change', () => {
            let rows = parseInt(rowsAInput.value);
            let cols = parseInt(colsAInput.value);
            generateMatrix(matrixAContainer, rows, cols);
        });

        rowsBInput.addEventListener('change', () => {
            let rows = parseInt(rowsBInput.value);
            let cols = parseInt(colsBInput.value);
    generateMatrix(matrixBContainer, rows, cols);
});

colsBInput.addEventListener('change', () => {
    let rows = parseInt(rowsBInput.value);
    let cols = parseInt(colsBInput.value);
    generateMatrix(matrixBContainer, rows, cols);
});

generateMatrix(matrixAContainer, 3, 3);
generateMatrix(matrixBContainer, 3, 3);