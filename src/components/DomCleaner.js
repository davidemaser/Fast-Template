/**
 * Created by David Maser on 19/06/2017.
 */
import Errors from '../classes/Errors';
import {Templates} from '../templates/Templates';
export const DomCleaner = {
  extract: {
    node: {
      type(obj, callback){
        try {
          let __this = obj.split('render:')[1].split(',')[0];
          if (callback !== undefined && callback !== null && typeof callback === 'function') {
            return callback(__this);
          } else {
            return __this;
          }
        }catch(e){
          new Errors({
            origin:'',
            type:'',
            message:'',
            log:false
          })
        }
      }
    },
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
          let __this = obj.split('class:')[1];
          __this =  __this.indexOf('content:{') ? __this.split(',content')[0] : __this;
          __this = __this.indexOf('{') > -1 ? splitToArray(__this.split('{')[1].split('}')[0]) : __this.split(',')[0];
          if (callback !== undefined && callback !== null && typeof callback === 'function') {
            return callback(__this);
          }else{
            return __this;
          }
        }
      }catch(e){
        new Errors({
          origin:'',
          type:'',
          message:'',
          log:false
        })
      }
    },
    content(obj,callback){
      try{
        if(obj.indexOf('content:') > -1){
          let __this = obj.split('content:')[1];
          __this = __this.indexOf('{') > -1 ? __this.split('{')[1].split('}')[0] : __this.split(',')[0];
          if (callback !== undefined && callback !== null && typeof callback === 'function') {
            return callback(__this);
          }else{
            return __this;
          }
        }
      }catch(e){
        new Errors({
          origin:'',
          type:'',
          message:'',
          log:false
        })
      }
    },
    template(obj,callback){
      try{
        if(obj.indexOf('template:') > -1){
          let __this = obj.split('template:')[1].split(',')[0];
          if (callback !== undefined && callback !== null && typeof callback === 'function') {
            return callback(Templates[__this]);
          }else{
            return Templates[__this];
          }
        }
      }catch(e){
        new Errors({
          origin:'',
          type:'',
          message:'',
          log:false
        })
      }
    }
  }
};
export const DomBuilder = {
  build: {
    element(origin, replace, content,args){
      $(replace).insertBefore(origin);
      $(replace).html(content);
      $(origin).remove();
    }
  }
};