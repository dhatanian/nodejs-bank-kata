'use strict';

import TransactionRepository from "../src/transaction-repository";

const chai = require('chai');
const assert = chai.assert;

const TRANSACTIONS = [{amount: -26, date: new Date()}, {amount: 200, date: new Date()}];

const transactionRepository = new TransactionRepository();

describe('TransactionRepository', () => {
    it('stores transactions', () => {
        TRANSACTIONS.forEach(
            (transaction) => transactionRepository.saveTransaction(transaction.amount, transaction.date));
        assert.sameDeepMembers(TRANSACTIONS, transactionRepository.allTransactions());
    });
});
