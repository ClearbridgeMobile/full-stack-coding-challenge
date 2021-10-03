'use strict';
const expect = require('chai').expect;
const sinon = require('sinon');
const mock = require('../test/mock');
const createCompany = require('../controllers/create-company');
const getCompany = require('../controllers/get-company-info');
const { companies } = require('../constants/temp-store/store');
describe('update company', () => {
    it('was able to update company', async () => {
        const mockLambdaCallback = sinon.spy();
        const getCompanyMockLambdaCallback = sinon.spy();
        await createCompany.create(mock.eventMock, {}, mockLambdaCallback);
        const companyId = companies[0].id;
        await getCompany.getByCompanyId({...mock.updateEventMock, path: {id: companyId}}, {}, getCompanyMockLambdaCallback);
        expect(getCompanyMockLambdaCallback.calledOnce).to.be.true;
    });
    it('was not able to create company', async () => {
        const mockLambdaCallback = sinon.spy();
        await createCompany.create(mock.emptyEventMock, {}, mockLambdaCallback);
        expect(mockLambdaCallback.calledOnce).to.be.true;
    });
});
