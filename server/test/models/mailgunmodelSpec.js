/**
 * Created by dhiraj.kumar on 17/12/2016.
 */

const expect = require('chai').expect;
const mailgunmodel = require('../../src/models/mailgunmodel');
const apikey = require('../../config/mailConfig')
describe(' mailgunmodel   ', () =>{

    var api_key = "fdjlkajfoeajflcajfa";

    beforeEach(() => {
        this.mailgunmodel_ = new mailgunmodel({ apikey: api_key });

    });
    it('should initialise', () =>{

        expect(this.mailgunmodel_.options.apikey).to.be.defined;
        expect(this.mailgunmodel_.options.apikey).to.equal(this.api_key);
        expect(this.mailgunmodel_.username).to.equal('api');
        expect(this.mailgunmodel_.auth).to.equal('api:fdjlkajfoeajflcajfa');
        expect(this.mailgunmodel_.host).to.equal('api.mailgun.net');
        expect(this.mailgunmodel_.endpoint).to.equal('/v3/sandboxa74099bcdea14342a6b436007711c25a.mailgun.org');
        expect(this.mailgunmodel_.protocol).to.equal('https:');
            
    })
})