const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

require('jsdom-global')();

global.sinon = sinon;
global.expect = chai.expect;

chai.should();
chai.use(sinonChai);