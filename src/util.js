const download = require('download-git-repo');

module.exports = {
  download: function (url, dist) {
    return new Promise((reslove, reject) => {
      download(`direct:${url}`, dist, function (err) {
        if (err) {
          reject(err);
        } else {
          reslove(true);
        }
      })
    })
  },

  // get the latest version of tag
  // getLastestVersion: async function (url) {
  //   let lastestVersion = 'v1.0.0';
  //   return lastestVersion;
  // }
}
