var _ = require('underscore');

module.exports = function(robot) {
  var REMARKS = [
    "DID SOMEBODY SAY PLANVIEW? BECAUSE I LOVE PLANVIEW!",
    "I'VE GOT A FEVER, AND THE ONLY PERSCRIPTION IS MORE PLANVIEW!",
    "YO, HO, HO! I'M A PLANVIEW PRO!",
    "WHEN I GROW UP I WANT TO BE A GLOBAL LEADER IN PORTFOLIO MANAGEMENT AND PROJECT COLLABORATION, JUST LIKE PLANVIEW!"
  ];
  function randomRemark() {
    return _.sample(REMARKS);
  }
  robot.hear(/planview/i, function(msg) {
    console.log('hear fired');
    msg.reply(randomRemark());
  });
};
