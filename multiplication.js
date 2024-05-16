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
                    inputField.type = 'number';
                    inputField.value = 0;
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
                    matrixA[i][j] = parseFloat(document.getElementById('matrix-a-' + i + '-' + j).value);
                }
            }

            for (let i = 0; i < rowsB; i++) {
                matrixB[i] = [];
                for (let j = 0; j < colsB; j++) {
                    matrixB[i][j] = parseFloat(document.getElementById('matrix-b-' + i + '-' + j).value);
                }
            }

            let result = multiplyMatrices(matrixA, matrixB);

            document.getElementById('result').innerHTML = '';
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < result[i].length; j++) {
                    document.getElementById('result').innerHTML += result[i][j] + ' ';
                }
                document.getElementById('result').innerHTML += '<br>';
            }
        }

        function multiplyMatrices(a, b) {
            let result = [];
            for (let i = 0; i < a.length; i++) {
                result[i] = [];
                for (let j = 0; j < b[0].length; j++) {
                    let sum = 0;
                    for (let k = 0; k < a[0].length; k++) {
                        sum += a[i][k] * b[k][j];
                    }
                    result[i][j] = sum;
                }
            }
            return result;
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