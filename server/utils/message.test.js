var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');
describe('generateMessage', () =>{
    it('Should generate correct message object', ()=>{
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});
    });
});

describe('generateLocationMessage', ()=>{
    it('should generate correct location object', ()=>{
        var from ='Lukman';
        var lat = -8.5769951;
        var lng = 116.0983007;
        var url = 'https://www.google.com/maps?q=-8.5769951,116.0983007'

        var message = generateLocationMessage(from, lat, lng);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    });
});