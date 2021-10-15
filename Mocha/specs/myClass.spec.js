var MyClass  = require('../src/myClass');
var myObj = new MyClass();
var sinon = require('sinon');
var expect = require('chai').expect;
var chai  = require('chai');
const chaiAsPromise = require('chai-as-promised');
chai.use(chaiAsPromise);
const nock = require('nock');

describe('Test suite', function () {
    after(function () {
        console.log('Done Testing');
    })
    before(function () {
        console.log('Started Testing')
    });
    afterEach(function () {
        console.log('Done each Testing')
    });
    beforeEach(function () {
        console.log('Started each Testing ')
        sinon.restore();
    });

    it('Test the add method', function () {
        expect(myObj.add(1, 2)).to.be.equal(3);
    });

    it('Spy the add method', function () {
        var spy = sinon.spy(myObj, 'add');
        var arg1 = 10,
            arg2 = 20;
        myObj.callAnotherFn(arg1, arg2);
        // sinon .assert.calledOnce(spy);
        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith(arg1, arg2)).to.be.true;
    });

    it('spy the callback method', function () {
        var callback = sinon.spy();
        myObj.callTheCallback(callback);
        expect(callback.calledOnce).to.be.true;
    });
    it('mock the sayHello method', function () {
        var mock = sinon.mock(myObj);
        var expectation = mock.expects('sayHello');
        expectation.exactly(1);
        expectation.withArgs('Hello World');
        myObj.callAnotherFn(10, 20);
        mock.verify();
    });
});

describe('Test suite for stub', function () {
    it('stub the add method', function () {
        var stub = sinon.stub(myObj, 'add');
        stub.withArgs(10, 20)
        .onFirstCall().returns(100)
        .onSecondCall().returns(200);
        expect(myObj.callAnotherFn(10,20)).to.be.equal(100);
        expect(myObj.callAnotherFn(10,20)).to.be.equal(200);
    });
});

describe('Test the promise', function () {
    it('Promise test case', function () {
        this.timeout(0);
        // myObj.testPromise().then(function (result) {
        //     expect(result).to.be.equal(6);
        //     done();
        // });
        return expect(myObj.testPromise()).to.eventually.equal(6);
    });
});

describe('XHR test suite', function() {
    it('Mock and Stub xhr call', function(done) {
        const scope = nock('https://echo-service-new.herokuapp.com')
            .post('/echo')
            .reply(200, {id: 123})
        myObj.xhrFn().then(function (result) {
            console.log(result);
            done();
        });
    })
})