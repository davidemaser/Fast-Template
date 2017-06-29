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
            origin:'',
            type:'',
            message:'',
            log:false
          })
        }
      }
    },
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
          origin:'',
          type:'',
          message:'',
          log:false
        })
      }
    },
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
            return __this !== undefined ? __this: null;
          }
        }
      }catch(e){
        new Woops({
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
            return callback(Template[__this]);
          }else{
            return Template[__this];
          }
        }
      }catch(e){
        new Woops({
          origin:'',
          type:'',
          message:'',
          log:false
        })
      }
    }
  },
  remove:{
    emptyTags(){
      $(Global.node).each(function(){
        let __this = $(this).html().trim();
        __this.length === 0 ? $(this).remove() : null;
      });
      $(Global.experiment.node).each(function(){
        let __this = $(this).html().trim();
        __this.length === 0 ? $(this).remove() : null;
      })
    },
    ignoredTags(){
      $(`${Global.node}[${Global.ignore}]`).each(function(){
        $(this).remove();
      });
      $(`${Global.experiment.node}[${Global.ignore}]`).each(function(){
        $(this).remove();
      })
    }
  },
  parse:{
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
    element(origin, replace, content){
      $(replace).insertBefore(origin);
      $(replace).html(content);
      $(origin).remove();
    },
    experiment(origin, replace, content, opt){
      if(content !== undefined && content !== '') {
        content = typeof content === 'object' ? JSON.stringify(content) : content;
        let xContent = replace !== null ? replace.replace('@return', content) : content;
        $(xContent).insertBefore(origin);
        opt !== true ? $(origin).remove() : null;
      }else{
        $(origin).remove();
      }
    }
  },
  render(){
    $('body').attr('fast','render');
  }
};