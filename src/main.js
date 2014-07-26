var UIPlugin = require('ui_plugin');
var JST = require('.././jst');
var Styler = require('./styler');

class P2PHLSStats extends UIPlugin {
  get name() { return 'p2phlsstats' }
  get tagName() { return 'div' }
  get type() { return "ui" }
  get attributes() {
    return {'data-p2phlsstats': '',
            'class': 'p2phlsstats'}
  }
  get events() { return {'click': 'clicked'}}

  initialize(options) {
    super(options)
    this.render()
  }

  clicked(e) {
    console.log("clickeddd")
  }

  show() {
    this.$el.show();
  }

  hide() {
    this.$el.hide();
  }

  render() {
    var style = Styler.getStyleFor(this.name)
    this.container.$el.append(style)
    this.container.$el.append(this.$el)
    return this
  }
}

module.exports = window.P2PHLSStats = P2PHLSStats;
