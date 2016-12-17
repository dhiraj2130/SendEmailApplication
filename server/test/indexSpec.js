/**
 * Created by dhiraj.kumar on 17/12/2016.
 */
const expect = require('chai').expect;

describe(' Dependency for SendEmailApplication  ', () =>{
    it('should initialise', () =>{
        expect( require('express')).not.to.be.undefined;
        expect( require('../src')).not.to.be.undefined;
        expect( require('body-parser')).not.to.be.undefined;
        expect( require('../src/routes')).not.to.be.undefined;
    })
})