/**
 * Created by dhiraj.kumar on 17/12/2016.
 */
const expect = require('chai').expect;
const sendGridModel = require('../../src/models/sendGridModel');
const sendGridKey_ = require('../../config/sendGridKey').SENDGRID_API_KEY;


describe(' sendGridModel   ', () =>{

    var sendGridModel_;

    beforeEach(() => {
        this.sendGridModel_ = new sendGridModel({sendGridKey:sendGridKey_})

    });
    it('should initialise', () =>{

        expect(this.sendGridModel_.sendGridKey).to.be.defined;
        expect(this.sendGridModel_.sendGridKey).to.equal(sendGridKey_);
        
    })
})