/**
 * Created by David Maser on 31/07/2017.
 */
export const FastPing = {
  /**
   * Creates and loads an image element by url.
   * @param  {String} url
   * @return {Promise} promise that resolves to an image element or
   *                   fails to an Error.
   */
  requestImage:function(url) {
    return new Promise(function(resolve, reject) {
      let img = new Image();
      img.onload = function() { resolve(img); };
      img.onerror = function() { reject(url); };
      img.src = url + '?random-no-cache=' + Math.floor((1 + Math.random()) * 0x10000).toString(16);
    });
  },

  /**
   * Pings a url.
   * @param  {String} url
   * @param  {Number} multiplier - optional, factor to adjust the ping by.  0.3 works well for HTTP servers.
   * @return {Promise} promise that resolves to a ping (ms, float).
   */
  ping:function(url, multiplier) {
    return new Promise((resolve, reject)=> {
      let start = (new Date()).getTime();
      let response = ()=> {
        let delta = ((new Date()).getTime() - start);
        delta *= (multiplier || 1);
        resolve(delta);
      };
      this.requestImage(url).then(response).catch(response);

      // Set a timeout for max-pings, 5s.
      setTimeout(function() { reject(Error('Timeout')); }, 5000);
    });
  }
}