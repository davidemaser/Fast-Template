/**
 * Created by David Maser on 13/07/2017.
 */
import Woops from '../classes/Woops';
export const FastUtilities = {
  ui:{
    placeholder:function(type){
      return `<div class="ftx__placeholder ${type}"></div>`
    },
    group:function(option,expression){
      return `<section class="ftx__group ${option}" role="group">${expression}</section>`;
    }
  },
  stripper:function(src,obj){
    if(typeof obj === 'object'){
      let o;
      for(o in obj){
        src = src.replace(o,obj[o]);
      }
      return src;
    }
  },
  load:function (url, target){
    $(target).load(url);
  },
  getScript:function (url, fn){
    $.getScript(url).done((script, textStatus) => {
      fn();
    }).fail(function (jqxhr, settings, exception) {
      new Woops({
        origin:'FastUtilities.getScript',
        type:'AJAX Error',
        message:`Unable to load the remote script ${exception}`,
        log:false
      })
    });
  },
  countFtx:function(){
    let countLog = {};
    $('span[ftx-render]').each((a,b)=>{
      countLog[a] = b;
    })
  },
  poll:{
    server:function(){

    },
    ip:function(){

    },
    database:function(qs){

    }
  }
};