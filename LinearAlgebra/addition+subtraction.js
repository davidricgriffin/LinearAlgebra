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
            inputField.type = 'number';
            inputField.value = 0;
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
            matrixA[i][j] = parseFloat(document.getElementById('matrix-a-' + i + '-' + j).value);
            matrixB[i][j] = parseFloat(document.getElementById('matrix-b-' + i + '-' + j).value);
        }
    }

    let result;
    if (operation == 'addition') {
        result = addMatrices(matrixA, matrixB);
    } else {
        result = subtractMatrices(matrixA, matrixB);
    }

    document.getElementById('result').innerHTML = '';
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].length; j++) {
            document.getElementById('result').innerHTML += result[i][j] + ' ';
        }
        document.getElementById('result').innerHTML += '<br>';
    }
}

function addMatrices(a, b) {
    let result = [];
    for (let i = 0; i < a.length; i++) {
        result[i] = [];
        for (let j = 0; j < a[0].length; j++) {
            result[i][j] = a[i][j] + b[i][j];
        }
    }
    return result;
}

function subtractMatrices(a, b) {
    let result = [];
    for (let i = 0; i < a.length; i++) {
        result[i] = [];
        for (let j = 0; j < a[0].length; j++) {
            result[i][j] = a[i][j] - b[i][j];
        }
    }
    return result;
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