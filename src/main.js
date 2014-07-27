var UIPlugin = require('ui_plugin');
var JST = require('.././jst');
var Styler = require('./styler');
var Mousetrap = require('mousetrap');

class P2PHLSStats extends UIPlugin {
  get name() { return 'p2phlsstats' }
  get tagName() { return 'div' }
  get type() { return "ui" }
  get template() { return JST.p2phlsstats }
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

  templateWithData() {
    return this.template({
      chunksFromCDN: 10,
      chunksFromP2P: 2,
      chunksSent: 3,
      swarmSize: 2,
      currentBitrate: 1264,
      state: "PLAYING_BUFFERING",
    })
  }

  render() {
    var style = Styler.getStyleFor(this.name)
    this.$el.html(this.templateWithData())
    this.container.$el.append(style)
    this.container.$el.append(this.$el)
    return this
  }
}

module.exports = window.P2PHLSStats = P2PHLSStats;
