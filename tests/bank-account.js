'use strict';

import BankAccount from "../src/bank-account";
import StatementPrinter from "../src/statement-printer";
import TransactionRepository from "../src/transaction-repository";

const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('sinon-chai'));

const TRANSACTIONS = [{amount: 1}, {amount: 2}];

const transactionRepository = sinon.createStubInstance(TransactionRepository);
transactionRepository.allTransactions.onFirstCall().returns(TRANSACTIONS);
const statementPrinter = sinon.createStubInstance(StatementPrinter);
const bankAccount = new BankAccount(transactionRepository, statementPrinter);

describe('BankAccount', () => {
    beforeEach(()=>sinon.useFakeTimers());

    it('accepts a deposit', () => {
        bankAccount.deposit(1000);
        expect(transactionRepository.saveTransaction).to.have.been.calledWith(1000, new Date());
    });

    it('accepts a withdrawal', () => {
        bankAccount.withdraw(1000);
        expect(transactionRepository.saveTransaction).to.have.been.calledWith(-1000, new Date());
    });

    it('prints a statement', () => {
        bankAccount.printStatement();
        expect(statementPrinter.print).to.have.been.calledWith(TRANSACTIONS);
    })
});
