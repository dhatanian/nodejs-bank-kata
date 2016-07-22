require("datejs");

const HEADER = 'DATE | AMOUNT | BALANCE';

export default class StatementPrinter {
    constructor(console) {
        this.console = console;
    }

    print(transactions) {
        this.console.printLine(HEADER);
        var balance = 0;

        var linesToPrint = transactions.map(
            transaction => {
                balance += transaction.amount;
                return {
                    date: transaction.date.toString('dd/MM/yyyy'), amount: transaction.amount, balance: balance
                }
            });

        linesToPrint.reverse()
            .forEach(
                line => this.console.printLine(`${line.date} | ${line.amount} | ${line.balance}`));
    }
}
