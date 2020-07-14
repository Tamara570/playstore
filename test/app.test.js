const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');


describe('Playstore app', () => {

//it should return a message 
    it('should return a message from GET /apps', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
    });

 //it should filter by genre
    it('should be 400 if sort is incorrect', () => {
        return supertest(app)
            .get('/apps')
            .query({sort: 'MISTAKE'})
            .expect(400, 'Sort must be by rating or app')
    })


//it should sort by rating or app
    it('should sort by rating or app', () => {
        return supertest(app)
            .get('/apps')
            .query({sort: 'Rating'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                let i = 0
                let sorted = true
                while(sorted && i < res.body.length -1) {
                    sorted = sorted && res.body[i].Rating < res.body[i + 1].Rating
                    i++
                }
                expect(sorted).to.be.true
            })
    })
});


