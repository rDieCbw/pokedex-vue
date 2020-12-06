/**
RUR DOM READY
 */

 !function (name, definition) {

  if (typeof module != 'undefined') {
      module.exports = definition()
  }else if (typeof define == 'function' && typeof define.amd == 'object'){ 
      define(definition)
  }else{ 
      this[name] = definition()
  };
  
    /**
     * Check the DOM state anbd run desired callback as soon it is available.
     *
     * @example RUR(function () { console.log("Dom is ready")})
     *
     * @returns void
     */
    
  }('RUR', function () {
  
    var _v = 1, fns = [], listener
      , doc = typeof document === 'object' && document
      , scrl = doc && doc.documentElement.doScroll
      , domContentLoaded = 'DOMContentLoaded'
      , loaded = doc && (scrl ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);
  
  
    if (!loaded && doc){
        doc.addEventListener(domContentLoaded, listener = function () {
        doc.removeEventListener(domContentLoaded, listener)
        loaded = 1;
        while (listener = fns.shift()){ listener(); }
      });
    }

  
    return function (fn) {
      loaded ? setTimeout(fn, 50) : fns.push(fn);
    }
  
  });