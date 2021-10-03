'use strict';
const expect = require('chai').expect;
const sinon = require('sinon');
const mock = require('../test/mock');
const createCompany = require('../controllers/create-company');
const updateCompany = require('../controllers/update-company');
const { companies } = require('../constants/temp-store/store');
describe('update company', () => {
    it('was able to update company', async () => {
        const mockLambdaCallback = sinon.spy();
        const updatedMockLambdaCallback = sinon.spy();
        await createCompany.create(mock.eventMock, {}, mockLambdaCallback);
        const companyId = companies[0].id;
        await updateCompany.update({...mock.updateEventMock, path: {id: companyId}}, {}, updatedMockLambdaCallback);
        expect(updatedMockLambdaCallback.calledOnce).to.be.true;
        expect(companies.length > 0).to.be.true;
        expect(companies[0].companyName).to.be.equal(mock.updateEventData.companyName);
    });
    it('was not able to create company', async () => {
        const mockLambdaCallback = sinon.spy();
        await createCompany.create(mock.emptyEventMock, {}, mockLambdaCallback);
        expect(mockLambdaCallback.calledOnce).to.be.true;
    });
});
