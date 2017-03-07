function randomArray(n = 3, min = 0, max = 10) {

    let isNLegal = Number.isInteger(parseInt(n)) &&
                    n <= (max - min + 1) &&
                    n >= 0 &&
                    Number.isInteger(parseInt(min)) &&
                    min >= 0 &&
                    Number.isInteger(parseInt(max)) &&
                    max >= min

    if (!isNLegal) return [];

    let arr = [];

    for (let i = 0; i < n; i++) {
        let num = parseInt(Math.random() * (max - min) + min);
        arr.includes(num) ? i-- : arr.push(num);
    }

    return arr;
}