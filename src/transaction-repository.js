export default class TransactionRepository {
    constructor() {
        this.transactions = [];
    }

    saveTransaction(amount, date) {
        this.transactions.push({amount: amount, date: date});
    }

    allTransactions() {
        return this.transactions;
    }
}
