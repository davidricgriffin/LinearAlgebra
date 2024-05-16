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
            inputField.type = 'number';
            inputField.value = 0;
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
            row.push(parseFloat(inputs[i * cols + j].value));
        }
        matrix.push(row);
    }

    // Calculate the determinant
    let determinant = calculateDeterminant(matrix);

    // Display the result
    document.getElementById('result').innerHTML = `Determinant: ${determinant}`;
}

function calculateDeterminant(matrix) {
    if (matrix.length === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    let determinant = 0;
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
        let cofactor = Math.pow(-1, i) * matrix[0][i] * subDeterminant;

        // Add the cofactor to the determinant
        determinant += cofactor;
    }

    return determinant;
}