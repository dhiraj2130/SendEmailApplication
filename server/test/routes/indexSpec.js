/**
 * Created by dhiraj.kumar on 17/12/2016.
 */
const expect = require('chai').expect;
const mailConfig = require('../../config/mailConfig');
const router = require('../../src/routes/index');

describe(' routes  ', () =>{


    xit('should initialise mail Configuration from mailConfig file ', () =>{
        expect( router.data).not.to.be.undefined;
       
    })
})