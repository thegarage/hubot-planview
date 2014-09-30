require('coffee-script/register');
var path = require("path");
var chai = require('chai');
var expect = chai.expect;

var Robot = require("hubot/src/robot");
var TextMessage = require("hubot/src/message").TextMessage;

describe('help', function() {
  var robot = null
  var adapter = null;
  var user = null;

  beforeEach(function(done) {
    var ready = false;
    robot = new Robot(null, "mock-adapter", false, "Eddie");
    robot.adapter.on('connected', function() {
      robot.loadFile(path.resolve('.', 'scripts'), 'planview.js');
      var hubotScripts = path.resolve('node_modules', 'hubot', 'src', 'scripts');
      robot.loadFile(hubotScripts, 'help.coffee');

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

  it('should parse help', function(done) {
    adapter.on("reply", function(envelope, strings) {
      expect(strings[0]).match(/Why hello there/);
      done();
    });
    adapter.receive(new TextMessage(user, "Computer!"));
  });
});
