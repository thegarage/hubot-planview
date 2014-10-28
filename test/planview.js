require('coffee-script/register');
var path = require("path");
var chai = require('chai');
var sinon = require('sinon');
var CronTime = require('cron').CronTime;
// var sinonChai = require("sinon-chai");
var expect = chai.expect;
// chai.use(sinonChai);

var Robot = require("hubot/src/robot");
var TextMessage = require("hubot/src/message").TextMessage;

describe('planview listener', function() {
  var robot = null
  var adapter = null;
  var user = null;
  var room = null;
  var clock = null;
  process.env.HUBOT_PLANVIEW_ROOMS = '#mocha';

  beforeEach(function(done) {
    var time = new Date('October 24, 2014 13:59:59');

    console.log('pre fake time', new Date());
    // clock = sinon.useFakeTimers(time.getTime());
    clock = sinon.useFakeTimers(Date.now());
    console.log('post fake time', new Date(), new Date(Date.now()));

    var ready = false;
    robot = new Robot(null, "mock-adapter", false, "Eddie");
    robot.adapter.on('connected', function() {
      robot.loadFile(path.resolve('.', 'scripts'), 'planview.js');
      var hubotScripts = path.resolve('node_modules', 'hubot', 'src', 'scripts');
      // load any relevant hubot scripts here
      // robot.loadFile(hubotScripts, 'help.coffee');

      // create a user
      user = robot.brain.userForId("1", {
        name: "mocha",
        room: "#mocha"
      });

      adapter = robot.adapter;
      done();
    });
    robot.run();
  });

  afterEach(function() {
    clock.restore();
    robot.shutdown();
  });

  describe('when message is lowercase', function() {
    it('replies with random remark', function(done) {
      adapter.on("reply", function(envelope, strings) {
        expect(strings[0]).match(/planview/i);
        done();
      });
      adapter.receive(new TextMessage(user, "I sure do love planview."));
    });
  });
  describe('when message is uppercase', function() {
    it('replies with random remark', function(done) {
      adapter.on("reply", function(envelope, strings) {
        expect(strings[0]).match(/planview/i);
        done();
      });
      adapter.receive(new TextMessage(user, "I sure do love PLANVIEW!"));
    });
  });

  describe('when asking Hubot to be honest', function() {
    it('replies with its genuine feelings about Planview', function(done) {
      adapter.on("reply", function(envelope, strings) {
        expect(strings[0]).match(/steaming pile/i);
        done();
      });
      adapter.receive(new TextMessage(user, "Hubot, tell us how you really feel."));
    });
  });

  describe('when its Friday at 2:00pm', function() {
    it('sends a planview alert', function(done) {
      adapter.on("send", function(envelope, strings) {
        expect(strings[0]).match(/@all planview alert!/i);
        done();
      });
      var msUntilAlert = new CronTime('0 14 * * 5', 'America/Chicago').getTimeout() + 1000;
      clock.tick(msUntilAlert);
    });
  });
});
