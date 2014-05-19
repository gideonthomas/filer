define(['node_require'], function(node_require) {
  if (typeof XMLHttpRequest === undefined) {
    var request = node_require('request');
  }

  function browserDownload(uri, callback) {
    var req = new XMLHttpRequest();
    req.onload = function() {
      var err = req.statusCode != 200 ? req.statusText : null,
          data = err ? null : new Uint8Array(data);

      callback(err, data, req.statusCode);
    };
    req.open("GET", uri);
    if("withCredentials" in req) {
      req.withCredentials = true;
    }

    req.responseType = "arraybuffer";
    req.send();
  }

  function nodeDownload(uri, callback) {
    request({
      url: uri,
      method: "GET",
      encoding: null
    }, function(err, msg, body) {
      var data,
          arrayBuffer,
          statusCode,
          arrayLength = body && body.length;

      msg = msg || null;
      statusCode = msg && msg.statusCode;

      arrayBuffer = arrayLength && new ArrayBuffer(arrayLength);

      // Convert buffer to Uint8Array
      if (arrayBuffer) {
        data = new Uint8Array(arrayBuffer);
        for (var i = 0; i < body.length; ++i) {
          data[i] = body[i];
        }
      }

      callback(err, data, statusCode);
    });
  }

  return {
    download: function(uri, callback) {
      if (!uri) {
        throw('Uri required!');
      }

      if (!callback) {
        throw('Callback required');
      }

      if (typeof XMLHttpRequest !== undefined) {
        browserDownload(uri, callback);
      } else {
        nodeDownload(uri, callback);
      }
    }
  };
});
