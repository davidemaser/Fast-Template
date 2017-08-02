/**
 * Created by David Maser on 19/06/2017.
 */
import Woops from '../classes/Woops';
import {Template} from '../config/Template';
import {Global} from '../config/Global';
import RegisterState from '../classes/RegisterState';

export const Faster = {
  exec(){
    this.remove.emptyTags();
    this.remove.ignoredTags();
    Architect.render();
    new RegisterState('app','rendered');
  },
  extract: {
    node: {
      /**
       *
       * @param {object} obj
       * @callback {callback=}
       * @returns {object}
       */
      type(obj, callback){
        try {
          let __this = obj.split('render:')[1].split(',')[0];
          if (callback !== undefined && callback !== null && typeof callback === 'function') {
            return callback(__this);
          } else {
            return __this !== undefined ? __this: null;
          }
        }catch(e){
          new Woops({
            origin:'Faster.extract.node.type',
            type:'Unknown Error',
            message:'Unable to format Object',
            log:false
          })
        }
      }
    },
    /**
     *
     * @param {object} obj
     * @callback {callback=}
     * @param {boolean} parse
     * @returns {*}
     */
    json(obj,callback,parse){
      try {
        if(obj.indexOf('json') > -1){
          let __this = obj.indexOf('json:|') > -1 ? obj.split('json:|')[1].split('|')[0] : obj.split('json:')[1].split(',')[0];
          __this = parse === true ? Faster.parse.asJSON(__this) : __this;
          if (callback !== undefined && callback !== null && typeof callback === 'function') {
            return callback(__this);
          }else{
            return __this !== undefined ? __this: null;
          }
        }
      }catch(e){
        console.log(e);
      }
    },
    /**
     *
     * @param {object} obj
     * @callback {callback=}
     * @returns {*}
     */
    class(obj,callback){
      let splitToArray = (a) =>{
        if(a.indexOf(',') > -1){
          return a.split(',');
        }else{
          return a;
        }
      };
      try{
        if(obj.indexOf('class') > -1){
          let __this = obj.indexOf('class:{') > -1 ? obj.split('class:{')[1].split('}')[0] : obj.split('class:')[1].split(',')[0];
          __this = __this.indexOf(',') > -1 ? splitToArray(__this) : __this;
          if (callback !== undefined && callback !== null && typeof callback === 'function') {
            return callback(__this);
          }else{
            return __this !== undefined ? __this: null;
          }
        }
      }catch(e){
        new Woops({
          origin:'Faster.extract.node.class',
          type:'Unknown Error',
          message:'Unable to format Object',
          log:false
        })
      }
    },
    /**
     *
     * @param {object} obj
     * @callback {callback=}
     * @returns {*}
     */
    id(obj,callback){
      try{
        if(obj.indexOf('id') > -1){
          let __this = obj.split('id:')[1].split(',')[0];
          if (callback !== undefined && callback !== null && typeof callback === 'function') {
            return callback(__this);
          }else{
            return __this !== undefined ? __this: null;
          }
        }
      }catch(e){
        new Woops({
          origin:'Faster.extract.node.id',
          type:'Unknown Error',
          message:'Unable to format Object',
          log:false
        })
      }
    },
    /**
     *
     * @param {object} obj
     * @callback {callback=}
     * @returns {*}
     */
    content(obj,callback){
      try{
        if(obj.indexOf('content:') > -1){
          let __this = obj.split('content:')[1];
          __this = __this.indexOf('{') > -1 ? __this.split('{')[1].split('}')[0] : __this.split(',')[0];
          if (callback !== undefined && callback !== null && typeof callback === 'function') {
            return callback(__this);
          }else{
            return __this !== undefined ? __this: null;
          }
        }
      }catch(e){
        new Woops({
          origin:'Faster.extract.node.content',
          type:'Unknown Error',
          message:'Unable to format Object',
          log:false
        })
      }
    },
    /**
     *
     * @param {object} obj
     * @callback {callback=}
     * @type {callback}
     * @returns {*}
     */
    template(obj,callback){
      try{
        if(obj.indexOf('template:') > -1){
          let __this = obj.split('template:')[1].split(',')[0];
          if (callback !== undefined && callback !== null && typeof callback === 'function') {
            return typeof Template[__this] === 'object' ? callback(Template[__this].layout) : callback(Template[__this]);
          }else{
            return Template[__this];
          }
        }
      }catch(e){
        new Woops({
          origin:'Faster.extract.node.template',
          type:'Unknown Error',
          message:'Unable to format Object',
          log:false
        })
      }
    }
  },
  remove:{
    emptyTags(){
      $(Global.experiment.node).each(function(){
        let __this = $(this).html().trim();
        __this.length === 0 ? $(this).remove() : null;
      })
    },
    ignoredTags(){
      $(`${Global.experiment.node}[${Global.ignore}]`).each(function(){
        $(this).remove();
      })
    }
  },
  parse:{
    /**
     *
     * @param {object} obj
     * @returns {XML|void|string|*}
     */
    noLineBreaks(obj){
      try{
        return obj.replace(/(\r\n|\n|\r)/gm,'');
      }catch(e){
        new Woops({
          origin:'Faster.parse.noLineBreaks',
          type:'Parse Error',
          message:'Unable to parse the string. An undefined error occurred',
          log:false
        })
      }
    },
    /**
     *
     * @param {object} obj
     */
    asJSON(obj){
      try{
        return JSON.parse(obj);
      }catch(e){
        new Woops({
          origin:'Faster.parse.asJSON',
          type:'JSON Error',
          message:'Can not parse JSON as object. JSON string is probably malformed',
          log:false
        })
      }

    }
  }
};

export const Architect = {
  build: {
    /*
    /**
     *
     * @param {string} origin
     * @param {string} replace
     * @param {string} content
    element(origin, replace, content){
      try {
        $(replace).insertBefore(origin);
        $(replace).html(content);
        $(origin).remove();
      }catch(e) {
        new Woops({
          origin: 'Architect.build.element',
          type: 'Function Error',
          message: 'Unable to execute the Arhitect Builder',
          log: false
        });
      }
    },*/
    /**
     *
     * @param {string} origin
     * @param {string} replace
     * @param {string} content
     * @param {boolean} opt
     */
    experiment(origin, replace, content, opt){
      try {
        if (content !== undefined && content !== '') {
          content = typeof content === 'object' ? JSON.stringify(content) : content;
          let xContent = replace !== null ? replace.replace('@return', content) : content;
          $(xContent).insertBefore(origin);
          Global.appStatus !== 'dev' && opt !== true ? $(origin).remove() : null;
        } else {
          Global.appStatus !== 'dev' ? $(origin).remove() : null;
        }
      }catch(e){
          new Woops({
            origin:'Architect.build.experiment',
            type:'Function Error',
            message:'Unable to execute the Arhitect Builder',
            log:false
          })
      }
    }
  },
  render(){
    $(Global.appRoot).attr({
      'faster':'rendered',
      'faster-key':Global.appObj
    });
  }
};
if(typeof window[Global.appObj] === 'object'){
  window[Global.appObj]['core'] = Faster;
}else{
  window[Global.appObj] = {};
  window[Global.appObj]['core'] = Faster;
}