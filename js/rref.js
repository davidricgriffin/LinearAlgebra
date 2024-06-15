
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
let matrixContainer = document.getElementById('matrix');

function generateMatrix(container, rows, cols) {
    container.innerHTML = '';
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = '0';
            inputField.id = 'matrix-' + i + '-' + j;
            container.appendChild(inputField);
        }
        container.appendChild(document.createElement('br'));
    }
}

function calculate() {
    let rows = parseInt(rowsInput.value);
    let cols = parseInt(colsInput.value);
    let matrix = [];

    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < cols; j++) {
            let inputValue = document.getElementById('matrix-' + i + '-' + j).value;
            let fraction = parseFraction(inputValue);
            matrix[i][j] = fraction;
        }
    }

    let rref = reducedRowEchelonForm(matrix);

    let resultHtml = '';
    for (let i = 0; i < rref.length; i++) {
        for (let j = 0; j < rref[i].length; j++) {
            let fraction = rref[i][j].simplify();
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

function parseFraction(inputValue) {
    let parts = inputValue.split('/');
    if (parts.length == 2) {
        return new Fraction(parseInt(parts[0]), parseInt(parts[1]));
    } else {
        return new Fraction(parseInt(inputValue), 1);
    }
}

function reducedRowEchelonForm(matrix) {
    let lead = 0;
    for (let r = 0; r < matrix.length; r++) {
        if (matrix[0].length <= lead) {
            return matrix;
        }
        let i = r;
        while (matrix[i][lead].numerator == 0) {
            i++;
            if (matrix.length == i) {
                i = r;
                lead++;
                if (matrix[0].length == lead) {
                    return matrix;
                }
            }
        }
        let temp = matrix[i];
        matrix[i] = matrix[r];
        matrix[r] = temp;

        let val = matrix[r][lead];
        for (let j = 0; j < matrix[0].length; j++) {
            matrix[r][j] = matrix[r][j].divide(val);
        }

        for (let i = 0; i < matrix.length; i++) {
            if (i != r) {
                let val = matrix[i][lead];
                for (let j = 0; j < matrix[0].length; j++) {
                    matrix[i][j] = matrix[i][j].subtract(val.multiply(matrix[r][j]));
                }
            }
        }
        lead++;
    }
    return matrix;
}

rowsInput.addEventListener('change', () => {
    let rows = parseInt(rowsInput.value);
    let cols = parseInt(colsInput.value);
    generateMatrix(matrixContainer, rows, cols);
});

colsInput.addEventListener('change', () => {
    let rows = parseInt(rowsInput.value);
    let cols = parseInt(colsInput.value);
    generateMatrix(matrixContainer, rows, cols);
});

generateMatrix(matrixContainer, 3, 3);