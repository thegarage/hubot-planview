var _ = require('underscore');
var CronJob = require('cron').CronJob;

module.exports = function(robot) {
  var REMARKS = [
    "DID SOMEBODY SAY PLANVIEW? BECAUSE I LOVE PLANVIEW!",
    "I'VE GOT A FEVER, AND THE ONLY PERSCRIPTION IS MORE PLANVIEW!",
    "YO, HO, HO! I'M A PLANVIEW PRO!",
    "WHEN I GROW UP I WANT TO BE A GLOBAL LEADER IN PORTFOLIO MANAGEMENT AND PROJECT COLLABORATION, JUST LIKE PLANVIEW!"
  ];

  var IMAGES = [
    'http://media.vandahm.com/work/planview/drudge-alert.gif',
    'http://media.vandahm.com/work/planview/dick-jones.jpg'
  ]

  function randomRemark() {
    return _.sample(REMARKS);
  }

  function beHonest() {
    return 'Ok, ok, Planview is a steaming pile of portfolio management and project collaboration.';
  }

  function randomImage() {
    return _.sample(IMAGES);
  }

  function roomsToAlert() {
    return (process.env.HUBOT_PLANVIEW_ROOMS || "").split(",")
  }

  function planviewAlert() {
    _.each(roomsToAlert(), function(room) {
      var message = "@all PLANVIEW ALERT! " + randomImage();
      robot.messageRoom(room, message);
    });
  }

  robot.hear(/planview/i, function(msg) {
    msg.reply(randomRemark());
  });

  robot.hear(/tell us how you really feel/, function(msg) {
    msg.reply(beHonest());
  });

  var job = new CronJob('0 14 * * 5', planviewAlert, null, true, 'America/Chicago');
};
