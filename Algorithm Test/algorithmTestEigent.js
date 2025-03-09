// Soal Pertama

function reverseStringKeepNumber(input) {
    let letters = input.slice(0, -1).split('').reverse().join('');
    let number = input.slice(-1);
    return letters + number;
}

console.log(reverseStringKeepNumber("NEGIE1"));

//======================================================================

// Soal Kedua

function longest(sentence) {
    let words = sentence.split(' ');
    let longestWord = words.reduce((longest, current) => 
        current.length > longest.length ? current : longest
    , "");

    console.log(`${longestWord}: ${longestWord.length} character`);
}

const sentence = "Saya sangat senang mengerjakan soal algoritma";
longest(sentence);

//======================================================================

// Soal Ketiga

function countOccurrences(input, query) {
    return query.map(q => input.filter(word => word === q).length);
}

const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];

console.log(countOccurrences(INPUT, QUERY)); 

//======================================================================

// Soal Keempat

function diagonalDifference(matrix) {
    let primaryDiagonal = 0;
    let secondaryDiagonal = 0;
    let n = matrix.length;

    for (let i = 0; i < n; i++) {
        primaryDiagonal += matrix[i][i]; 
        secondaryDiagonal += matrix[i][n - 1 - i];
    }

    return Math.abs(primaryDiagonal - secondaryDiagonal);
}

const matrix = [
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9]
];

console.log(diagonalDifference(matrix)); 