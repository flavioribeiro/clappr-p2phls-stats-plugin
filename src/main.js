var UIPlugin = require('ui_plugin');
var JST = require('.././jst');
var Styler = require('./styler');
var Mousetrap = require('mousetrap');

class P2PHLSStats extends UIPlugin {
  get name() { return 'p2phlsstats' }
  get tagName() { return 'div' }
  get type() { return "ui" }
  get attributes() {
    return {'data-p2phlsstats': '',
            'class': 'p2phlsstats'}
  }

  initialize(options) {
    super(options)
    this.render()
    this.addListeners()
    this.hide()
  }

  addListeners() {
    Mousetrap.bind('ctrl+s', () => this.showOrHide());
  }

  showOrHide() {
    if (this.showing) {
      this.hide()
    } else {
      this.show()
    }
  }

  show() {
    this.$el.show()
    this.showing = true
  }

  hide() {
    this.$el.hide()
    this.showing = false
  }

  render() {
    var style = Styler.getStyleFor(this.name)
    this.container.$el.append(style)
    this.container.$el.append(this.$el)
    return this
  }
}

module.exports = window.P2PHLSStats = P2PHLSStats;
