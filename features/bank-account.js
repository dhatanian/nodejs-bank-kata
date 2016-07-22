import BankAccount from "../src/bank-account.js";
import StatementPrinter from "../src/statement-printer";
import TransactionRepository from "../src/transaction-repository";

const assert = require('chai').assert;
const sinon = require('sinon');

const EXPECTED_STATEMENT = 'DATE | AMOUNT | BALANCE\n'
                           + "10/04/2014 | 500 | 1400\n"
                           + "02/04/2014 | -100 | 900\n"
                           + "01/04/2014 | 1000 | 1000\n";

class Console {
    constructor() {
        this.output = '';
    }

    printLine(line) {
        this.output += line;
        this.output += '\n';
    }

}

function setTime(dateString) {
    sinon.useFakeTimers(Date.parse(dateString).getTime());
}

describe('BankAccount', () => {
    it('prints statement', () => {
        let console = new Console();
        const bankAccount = new BankAccount(new TransactionRepository(), new StatementPrinter(console));
        setTime('2014-04-01');
        bankAccount.deposit(1000);
        setTime('2014-04-02');
        bankAccount.withdraw(100);
        setTime('2014-04-10');
        bankAccount.deposit(500);
        bankAccount.printStatement();
        assert.equal(EXPECTED_STATEMENT, console.output);
    });
});
