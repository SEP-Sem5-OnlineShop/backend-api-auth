const request = require('supertest')

const app = require('../../app')
const {connect} = require('../../database/connection')
const {disconnect} = require('../../database/connection')

describe('AUTH Section', () => {


    beforeAll(async () => {
        try {
            await connect()
        }
        catch (e) {
            console.log(e)
        }
    });

    afterAll(async () => {
        try {
            await disconnect()
        }
        catch (e) {
            console.log(e)
        }
    });

    it('Login', (done) => {
        request(app)
            .post('/api/login')
            .send({telephone: '0712633378', password:'User123#'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(async (err, res) => {
                if(err) {
                    return done(err)
                }
                expect(res.body.message).toBe("Success")
                return done()
            })
    })
})