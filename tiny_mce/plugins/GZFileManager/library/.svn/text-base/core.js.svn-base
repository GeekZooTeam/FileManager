
Static = {};

Core = {

  version : 0.1,

  sprintf : function(string) {
    var args = arguments;
    if (arguments.length == 1) {
      return string;
    }
    var pattern = new RegExp("%([1-" + arguments.length + "])", "g");
    return string.replace(pattern, function(match, index) {
      return args[index];
    });
  },

  Browser : {
    ua : navigator.userAgent,
    isIe : function() {
      if (window.ActiveXObject) {
        return true;
      }
      return false;
    },

    isFirefox : function () {
      if (document.getBoxObjectFor) {
        return true;
      }
      return false;
    },

    isSafari : function() {
      if (window.openDatabase) {
        return true;
      }
      return false;
    },

    isChrome : function() {
      if (window.MessageEvent && !document.getBoxObjectFor && !window.openDatabase) {
        return true;
      }
      return false;
    },

    isOpera : function() {
      if (window.opera) {
        return true;
      }
      return false;
    }
  },

  sleep : function() {
    var start = new Date().getTime();
    while (true) {
      if (new Date().getTime() - start > n) {
          break;
      }
    }
  },


};

function _Get(key, def) {
    var pos = location.href.lastIndexOf('?');
    var _get = [];
    if (pos == '-1') {
        return def;
    }
    _get = location.href.substr(pos + 1).split('&');
    for (var i = 0; i < _get.length; i++) {
        var param = _get[i].split('=', 2);
        if (param[0] == key) {
            if (param[1] == undefined) {
                return def;
            }
            return param[1];
        }
    }
    return def;
}


// var Browser = {
//   ua:navigator.userAgent.toLowerCase()
// };
//
// if (window.ActiveXObject) {
//   Browser.ie = Browser.ua.match(/msie ([\d.]+)/)[1];
// } else if (document.getBoxObjectFor) {
//   Browser.firefox = Browser.ua.match(/firefox\/([\d.]+)/)[1];
// } else if (window.openDatabase) {
//   Browser.safari = Browser.ua.match(/version\/([\d.]+)/)[1];
// } else if (window.MessageEvent) {
//   Browser.chrome = Browser.ua.match(/chrome\/([\d.]+)/)[1];
// } else if (window.opera) {
//   Browser.opera = Browser.ua.match(/opera.([\d.]+)/)[1];
// }