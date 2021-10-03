'use strict';
const expect = require('chai').expect;
const sinon = require('sinon');
const mock = require('../test/mock');
const createCompany = require('../controllers/create-company');
const deleteCompany = require('../controllers/delete-company');
const { companies } = require('../constants/temp-store/store');
const utils = require('../services/utils');

describe('update company', () => {
    it('was able to update company', async () => {
        const mockLambdaCallback = sinon.spy();
        const deleteMockLambdaCallback = sinon.spy();
        await createCompany.create(mock.eventMock, {}, mockLambdaCallback);
        const companyId = companies[0].id;
        expect(utils.findCompany(companies, companyId)).to.be.equal(0);
        await deleteCompany.delete({path: {id: companyId}}, {}, deleteMockLambdaCallback);
        expect(deleteMockLambdaCallback.calledOnce).to.be.true;
        expect(utils.findCompany(companies, companyId)).to.be.equal(null);
    });
    it('was not able to create company', async () => {
        const mockLambdaCallback = sinon.spy();
        await createCompany.create(mock.emptyEventMock, {}, mockLambdaCallback);
        expect(mockLambdaCallback.calledOnce).to.be.true;
    });
});
