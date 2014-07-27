var UIPlugin = require('ui_plugin');
var JST = require('.././jst');
var Styler = require('./styler');
var Mousetrap = require('mousetrap');
var $ = require('jquery');

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
    this.metrics = {
      status: "off",
      chunksFromCDN: 0,
      chunksFromP2P: 0,
      chunksSent: 0,
      swarmSize: 0,
      currentBitrate: 0,
      state: "IDLE",
    }
    this.updateMetrics()
  }

  addListeners() {
    Mousetrap.bind('ctrl+s', () => this.showOrHide())
    this.listenTo(this.container.playback, 'playback:p2phlsstats:add', (metric) => this.statsAdd(metric))
  }

  statsAdd(metric) {
    $.extend(this.metrics, metric)
    this.updateMetrics()
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

  updateMetrics() {
    this.$el.html(this.template(this.metrics))
    if (this.metrics.status === "off") {
      this.$el.find("span.stats-status").css({'color': '#FF0000'})
    } else {
      this.$el.find("span.stats-status").css({'color': '#7CFC00'})
    }
  }

  render() {
    var style = Styler.getStyleFor(this.name)
    this.container.$el.append(style)
    this.container.$el.append(this.$el)
    return this
  }
}

module.exports = window.P2PHLSStats = P2PHLSStats;
