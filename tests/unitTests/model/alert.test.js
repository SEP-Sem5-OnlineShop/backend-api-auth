const mockingoose = require('mockingoose');
const AlertSchema = require("../../../database/schemas/alertSchema")
const {
    createAlert,
    setAlert,
    removeAlert,
    getdetailsAlert,
    getCustomerAlertList
} = require('../../../models/alert');


describe('alert', () => {

    describe('getdetailsAlert', () => {
        it ('should return relevant user', async () => {
            mockingoose(AlertSchema).toReturn(
                {
                _id: '6176bb506790883b30293be2',
                user_id: '614f6ab86728ee0a9450195c',
                product_id: '6152e3cca58556299c756046',
                created_at:'2021-09-22T10:55:31.953+00:00',
                updated_at:'2021-09-26T18:02:13.379+00:00',
                }, 'findOne');
            const results = await getdetailsAlert('614f6ab86728ee0a9450195c','6152e3cca58556299c756046');
            expect(results._id.toString()).toEqual('6176bb506790883b30293be2');
        });
    });
    
    describe('getCustomerAlertList', () => {
        it ('should return relevant user', async () => {
            mockingoose(AlertSchema).toReturn([
                {
                _id: '6176bb506790883b30293be2',
                user_id: '614f6ab86728ee0a9450195c',
                product_id: '6152e3cca58556299c756046',
                created_at:'2021-09-22T10:55:31.953+00:00',
                updated_at:'2021-09-26T18:02:13.379+00:00',
                },
                {
                _id: '6176bb506790883b30293be3',
                user_id: '614f6ab86728ee0a9450195c',
                product_id: '6152e3cca58556299c756046',
                created_at:'2021-09-22T10:55:31.953+00:00',
                updated_at:'2021-09-26T18:02:13.379+00:00',
                },
            ], 'find');
            const results = await getCustomerAlertList('614f6ab86728ee0a9450195c');
            expect(results[0]._id.toString()).toEqual('6176bb506790883b30293be2');
        });
    });

});