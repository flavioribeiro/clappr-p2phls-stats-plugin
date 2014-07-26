var UiObject = require('ui_object');
var JST = require('./jst');

class P2PHLSStats extends UiObject {
  get name() { return 'p2phlsstats'; }

  render() {
    var style = $('<style>').html(JST.CSS[p2phlsstats]());
    this.$el.append(style);
    return this;
  }
}

module.exports = window.P2PHLSStats = P2PHLSStats;
