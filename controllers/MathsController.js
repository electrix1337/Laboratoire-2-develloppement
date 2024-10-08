import Controller from './Controller.js';

export default class MathsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext);
    }

    get() {
        const params = this.HttpContext.path.params;
        const { op, x, y, n } = params;


        const binaryOps = ['+',' ', '-', '*', '/', '%'];

        const unaryOps = ['!', 'p', 'np'];


        let result;
        let numX;
        let numY;
        let numN;
        if (isNaN(x)) {
            numX = "not a number"
        }
        else {
            numX = parseFloat(x);
        }

        if (isNaN(y)) {
            numY = "not a number"
        }
        else {
            numY = parseFloat(y)
        }

        if (isNaN(n)) {
            numN = "not a number"
        }
        else {
            numN = parseInt(n);
        }

        if (!op) {
            this.HttpContext.response.JSON({
                "error": "Opération inexistante"
            });
            return;
        }

        if (binaryOps.includes(op)) {
            // xy nombre check
            if ((x === undefined || x === null || y === undefined || y === null) && x != 0 && y != 0) {
                this.HttpContext.response.JSON({
                    "op": op,
                    "x": x || null,
                    "y": y || null,
                    "error": "Paramètres manquants"
                });
                return;
            }
            if (isNaN(numX)) {
                this.HttpContext.response.JSON({
                    "op": op,
                    "x": x,
                    "y": y,
                    "error": "'x' est pas un nombre"
                });
                return;
            }
            if (isNaN(numY)) {
                this.HttpContext.response.JSON({
                    "op": op,
                    "x": x,
                    "y": y,
                    "error": "'y' est pas un nombre"
                });
                return;
            }


            switch (op) {
                case '+':
                case ' ':
                    result = this.FormaterXY(op, x, y, this.Addition(numX, numY));
                    break;
                case '-':
                    result = this.FormaterXY(op, x, y, this.Soustraction(numX, numY));
                    break;
                case '*':
                    result = this.FormaterXY(op, x, y, this.Multiplication(numX, numY));
                    break;
                case '/':
                    result = this.FormaterXY(op, x, y, this.Diviser(numX, numY));
                    break;
                case '%':
                    result = this.FormaterXY(op, x, y, this.Modulo(numX, numY));
                    break;
                default:
                    result = { "error": "Opération inexistante" };
            }

        } else if (unaryOps.includes(op)) {
            if ((n === undefined || n === null)) {
                this.HttpContext.response.JSON({
                    "op": op,
                    "n": n || null,
                    "error": "Paramètre manquant"
                });
                return;
            }
            if (isNaN(numN)) {
                this.HttpContext.response.JSON({
                    "op": op,
                    "n": n,
                    "error": "'n' nombre pas valide"
                });
                return;
            }


            switch (op) {
                case '!':
                    result = this.FormaterN(op, n, this.Factorial(numN));
                    break;
                case 'p':
                    result = this.FormaterN(op, n, this.Prime(numN));
                    break;
                case 'np':
                    result = this.FormaterN(op, n, this.NthPrime(numN));
                    break;
                default:
                    result = { "error": "Opération inexistante" };
            }

        } else {
            this.HttpContext.response.JSON({
                "op": op,
                "error": "Opération inexistante"
            });
            return;
        }

        this.HttpContext.response.JSON(result);
    }

    FormaterXY(op, x, y, value) {
        return { op, x, y, value };
    }

    FormaterN(op, n, value) {
        return { op, n, value };
    }

    Addition(x, y) {
        return x + y;
    }

    Soustraction(x, y) {
        return x - y;
    }

    Multiplication(x, y) {
        return x * y;
    }

    Diviser(x, y) {
        if (y === 0) {
            return "pas divisible par 0";
        }
        return x / y;
    }

    Modulo(x, y) {
        return x % y;
    }

    Factorial(n) {
        if (n < 0) return "factorial pas possible avec un nombre plus petit que 0";
        if (n === 0 || n === 1) return 1;
        let fact = 1;
        for (let i = 2; i <= n; i++) {
            fact *= i;
        }
        return fact;
    }

    Prime(n) {
        if (n <= 1) return false;
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) return false;
        }
        return true;
    }

    NthPrime(n) {
        const primes = [];
        let candidate = 2;
        while (primes.length < n) {
            if (this.Prime(candidate)) {
                primes.push(candidate);
            }
            candidate++;
        }
        return primes[n - 1];
    }
}
