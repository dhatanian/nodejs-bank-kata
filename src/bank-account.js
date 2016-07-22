export default class BankAccount {
    constructor(transactionRepository, statementPrinter) {
        this.transactionRepository = transactionRepository;
        this.statementPrinter = statementPrinter;
    }

    deposit(amount) {
        this.transactionRepository.saveTransaction(amount, new Date());
    }

    withdraw(amount) {
        this.transactionRepository.saveTransaction(-amount, new Date());
    }

    printStatement() {
        this.statementPrinter.print(this.transactionRepository.allTransactions());
    }
}
