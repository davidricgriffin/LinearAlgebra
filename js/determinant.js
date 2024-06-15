
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

let rows = 3;
let cols = 3;

// Create the matrix input fields
createMatrix();

// Add event listeners to the rows and cols input fields
document.getElementById('rows').addEventListener('input', updateMatrix);
document.getElementById('cols').addEventListener('input', updateMatrix);

function createMatrix() {
    const matrixContainer = document.getElementById('matrix');
    matrixContainer.innerHTML = '';

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let inputField = document.createElement('input');
            inputField.type = 'text'; // Change this to text to allow fraction input
            inputField.value = '0'; // Initialize the input box with a value of zero
            matrixContainer.appendChild(inputField);
        }
        matrixContainer.innerHTML += '<br>';
    }
}

function updateMatrix() {
    rows = parseInt(document.getElementById('rows').value);
    cols = parseInt(document.getElementById('cols').value);

    // Clear the previous matrix
    document.getElementById('matrix').innerHTML = '';

    // Recreate the matrix with the new dimensions
    createMatrix();
}

function calculate() {
    // Get the values from the input fields
    let matrix = [];
    let inputs = document.getElementById('matrix').getElementsByTagName('input');
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            let inputValue = inputs[i * cols + j].value;
            let parts = inputValue.split('/');
            let numerator = parseInt(parts[0]);
            let denominator = parts.length > 1 ? parseInt(parts[1]) : 1;
            let fraction = new Fraction(numerator, denominator);
            row.push(fraction);
        }
        matrix.push(row);
    }

    // Calculate the determinant
    let determinant = calculateDeterminant(matrix);

    // Simplify the determinant
    determinant = determinant.simplify();

    // Display the result
    if (determinant.denominator === 1) {
        document.getElementById('result').innerHTML = `Determinant: ${determinant.numerator}`;
    } else {
        document.getElementById('result').innerHTML = `Determinant: ${determinant.toString()}`;
    }
}

// Update the calculateDeterminant function to work with fractions
function calculateDeterminant(matrix) {
    if (matrix.length === 2) {
        return matrix[0][0].multiply(matrix[1][1]).subtract(matrix[0][1].multiply(matrix[1][0]));
    }

    let determinant = new Fraction(0, 1);
    for (let i = 0; i < matrix.length; i++) {
        // Create a sub-matrix by removing the current row and column
        let subMatrix = [];
        for (let j = 1; j < matrix.length; j++) {
            let row = [];
            for (let k = 0; k < matrix.length; k++) {
                if (k !== i) {
                    row.push(matrix[j][k]);
                }
            }
            subMatrix.push(row);
        }

        // Calculate the determinant of the sub-matrix
        let subDeterminant = calculateDeterminant(subMatrix);

        // Calculate the cofactor
        let cofactor = new Fraction(Math.pow(-1, i), 1).multiply(matrix[0][i]).multiply(subDeterminant);

        // Add the cofactor to the determinant
        determinant = determinant.add(cofactor);
    }

    return determinant;
}
