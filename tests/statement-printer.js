'use strict';

import StatementPrinter from "../src/statement-printer";
import Console from "../src/console";

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
chai.use(require('sinon-chai'));

const TRANSACTIONS = [{amount: 200, date: Date.parse("2005-07-08")},
    {amount: -26, date: Date.parse("2015-07-21")}];

var console;
var statementPrinter;

describe('StatementPrinter', () => {
    beforeEach(
        ()=> {
            console = sinon.createStubInstance(Console);
            statementPrinter = new StatementPrinter(console)
        }
    );

    it('prints the header', () => {
        statementPrinter.print([]);
        expect(console.printLine).to.have.been.calledWith('DATE | AMOUNT | BALANCE');
    });

    it('prints one transaction per line', () => {
        statementPrinter.print(TRANSACTIONS);
        expect(console.printLine).to.have.been.calledWith('08/07/2005 | 200 | 200');
        expect(console.printLine).to.have.been.calledWith('21/07/2015 | -26 | 174');
    })
});
