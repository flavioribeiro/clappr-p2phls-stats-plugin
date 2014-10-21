// Copyright 2014 Flávio Ribeiro <flavio@bem.tv>.
// All rights reserved.
// Use of this source code is governed by Apache
// license that can be found in the LICENSE file.

class Settings {
}

/* URL
URL to send statistics */
Settings.URL = "http://bem.tv/statistics/"

/* period
Period in miliseconds used to send the ping.
Ex: if period = 60000, it will send stats
every minute. If period = 0, no stats will
be sent. */
Settings.period = 0

/* statsId
Unique ID used to identify the player. */
Settings.statsId = function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
  }
}()()

module.exports = Settings
