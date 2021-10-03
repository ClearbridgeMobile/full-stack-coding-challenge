const eventData = {
    companyName : "companyName",
    companyLocationCity : "companyLocationCity",
    companyLocationState : "companyLocationState",
    companyFoundedDate : "companyFoundedDate",
    companyDescription : "companyDescription",
}
const eventMock = {
    body: JSON.stringify(eventData)
};
const updateEventData = {
    "companyName" : "updateCompanyName",
    "companyLocationCity" : "updatedCompanyLocationCity",
    "companyLocationState" : "updatedCompanyLocationState",
    "companyFoundedDate" : "updatedCompanyFoundedDate",
    "companyDescription" : "updatedCompanyDescription",
}
const updateEventMock = {
    body: JSON.stringify(updateEventData)
};
const emptyEventMock = {
    body: undefined
};

module.exports = {
    eventData,
    eventMock,
    emptyEventMock,
    updateEventData,
    updateEventMock
}
