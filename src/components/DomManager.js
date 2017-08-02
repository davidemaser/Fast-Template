/*
 * Created by David Maser on 19/07/2017.
 */
import {Global} from '../config/Global';
export default window.itsDOMLoading = (function() {

  let itsDOMLoading = {
    version: "0.3",
    triggers: {},
    observer: null,
    scope: Global.appRoot,
    selector: $ || function(selector, el) {
      return (el || document).querySelectorAll(selector);
    },

    addTrigger: function(selector, callback){
      this.triggers[selector] = callback;
    },

    listen: function(){
      let MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
      let config = { attributes: true, childList: true, characterData: true };
      this.observer = new MutationObserver(function(mutations){
        mutations.forEach(function(mutation){
          let added = [].slice.call(mutation.addedNodes, 0);
          added.forEach(function(node){
            for(let key in itsDOMLoading.triggers){
              if (itsDOMLoading.triggers.hasOwnProperty(key) &&
                matches(node, key)){
                itsDOMLoading.triggers[key](node);
              }
            }
          });
        });
      });

      (itsDOMLoading.scope.nodeType ?
          [itsDOMLoading.scope] :
          query(this.scope)
      ).forEach(function(element){
        this.observer.observe(element, config);
      }.bind(this));
    }
  };

  let matches = function(element, selector){
    let parent = element.parentNode;
    let els = query(selector, parent);
    return els.indexOf(element) > -1;
  };

  let query = function(selector, parent){
    return [].slice.call(itsDOMLoading.selector(selector, parent) || [], 0);
  };

  return itsDOMLoading;
})();
if(typeof window[Global.appObj] === 'object'){
  window[Global.appObj]['domManager'] = window.itsDOMLoading;
}else{
  window[Global.appObj] = {};
  window[Global.appObj]['domManager'] = window.itsDOMLoading;
}