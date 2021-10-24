'use strict';
const expect = require('chai').expect;
const sinon = require('sinon');
const mock = require('../test/mock');
const createCompany = require('../controllers/create-company');
const { companies } = require('../constants/temp-store/store');
describe('create company', () => {
    it('was able to create company', async () => {
        const mockLambdaCallback = sinon.spy();
        await createCompany.create(mock.eventMock, {}, mockLambdaCallback);
        expect(mockLambdaCallback.calledOnce).to.be.true;
        expect(companies.length > 0).to.be.true;
        expect(companies[0].companyName).to.be.equal(mock.eventData.companyName);
    });
    it('was not able to create company', async () => {
        const mockLambdaCallback = sinon.spy();
        await createCompany.create(mock.emptyEventMock, {}, mockLambdaCallback);
        expect(mockLambdaCallback.calledOnce).to.be.true;
    });
});
