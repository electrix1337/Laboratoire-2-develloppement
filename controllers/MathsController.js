import Controller from './Controller.js';

export default class MathsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext);
    }


    get() {
        const params = this.HttpContext.path.params;
        const { op, x, y, n } = params;


        let result;
        const numX = parseFloat(x);
        const numY = parseFloat(y);
        const numN = parseInt(n);

        switch (op) {
            case '+':
            case ' ': 
                result = this.Addition(numX, numY);
                break;
            case '-':
                result = this.Soustraction(numX, numY);
                break;
            case '*':
                result = this.Multiplication(numX, numY);
                break;
            case '/':
                result = this.Diviser(numX, numY);
                break;
            case '%':
                result = this.Modulo(numX, numY);
                break;
            case '!':
                result = this.Factorial(numN);
                break;
            case 'p':
                result = this.Prime(numN);
                break;
            case 'np':
                result = this.NthPrime(numN);
                break;
            default:
                result = "operation invalid";
                break;
        }

        this.HttpContext.response.JSON(result);
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
            return "peu pas diviser par 0";
        }
        return x / y;
    }

    Modulo(x, y) {
        return x % y;
    }

    Factorial(n) {
        if (n < 0) return "factorial nest pas possible avec un nombre negatif";
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
            if (this._isPrime(candidate)) {
                primes.push(candidate);
            }
            candidate++;
        }
        return primes[n - 1];
    }
}
