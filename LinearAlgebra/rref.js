let rowsInput = document.getElementById('rows');
let colsInput = document.getElementById('cols');
let matrixContainer = document.getElementById('matrix');

function generateMatrix(container, rows, cols) {
    container.innerHTML = '';
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let inputField = document.createElement('input');
            inputField.type = 'number';
            inputField.value = 0;
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
            matrix[i][j] = parseFloat(document.getElementById('matrix-' + i + '-' + j).value);
        }
    }

    let rref = reducedRowEchelonForm(matrix);

    document.getElementById('result').innerHTML = '';
    for (let i = 0; i < rref.length; i++) {
        for (let j = 0; j < rref[i].length; j++) {
            document.getElementById('result').innerHTML += rref[i][j] + ' ';
        }
        document.getElementById('result').innerHTML += '<br>';
    }
}

function reducedRowEchelonForm(matrix) {
    let lead = 0;
    for (let r = 0; r < matrix.length; r++) {
        if (matrix[0].length <= lead) {
            return matrix;
        }
        let i = r;
        while (matrix[i][lead] == 0) {
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
            matrix[r][j] /= val;
        }

        for (let i = 0; i < matrix.length; i++) {
            if (i != r) {
                let val = matrix[i][lead];
                for (let j = 0; j < matrix[0].length; j++) {
                    matrix[i][j] -= val * matrix[r][j];
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