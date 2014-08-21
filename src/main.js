// Copyright 2014 Flávio Ribeiro <flavio@bem.tv>.
// All rights reserved.
// Use of this source code is governed by Apache
// license that can be found in the LICENSE file.

var UIPlugin = require('ui_plugin');
var JST = require('.././jst');
var Styler = require('./styler');
var Mousetrap = require('mousetrap');
var Settings = require('./settings');
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
    this.metrics = {
      status: "off",
      chunksFromCDN: 0,
      chunksFromP2P: 0,
      chunksSent: '-',
      swarmSize: 0,
      currentBitrate: 0,
      state: "IDLE",
      bufferLength: 0,
      startupTime: 0,
      watchingTime: 0,
      rebufferingTime: 0,
      rebuffers: 0,
      occupiedSlots: 0,
      totalSlots: 0
    }
    this.updateMetrics()
    setInterval(this.sendStats.bind(this), Settings.period)
  }

  addListeners() {
    Mousetrap.bind(['command+shift+s', 'ctrl+shift+s'], () => this.showOrHide())
    this.listenTo(this.container.playback, 'playback:p2phlsstats:add', (metric) => this.statsAdd(metric))
    this.listenTo(this.container, 'container:stats:report', (metrics) => this.onStatsReport(metrics))
  }

  onStatsReport(metrics) {
    if (metrics['startupTime'] > 0) {
      this.metrics.startupTime = metrics['startupTime'] / 1000
    }
    if (metrics['watchingTime'] > 0) {
      this.metrics.watchingTime = metrics['watchingTime'] / 1000
    }
    if (metrics['rebufferingTime'] > 0) {
      this.metrics.rebufferingTime = metrics['rebufferingTime'] / 1000
    }
    this.metrics.rebuffers = metrics['rebuffers']
    this.updateMetrics()
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

  sendStats() {
    var queryString = "?id=" + Settings.statsId + "&" + $.param(this.metrics)
    var url = Settings.URL + queryString
    $.ajax({url: url})
  }
}

module.exports = window.P2PHLSStats = P2PHLSStats;
