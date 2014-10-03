require('coffee-script/register');
var path = require("path");
var chai = require('chai');
var expect = chai.expect;

var Robot = require("hubot/src/robot");
var TextMessage = require("hubot/src/message").TextMessage;

describe('planview listener', function() {
  var robot = null
  var adapter = null;
  var user = null;

  beforeEach(function(done) {
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
      adapter.receive(new TextMessage(user, "Hubot, tell us how you really feel about planview."));
    })
  });
});
