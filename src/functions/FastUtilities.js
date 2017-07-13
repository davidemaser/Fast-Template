/**
 * Created by David Maser on 13/07/2017.
 */
import Woops from '../classes/Woops';
export const FastUtilities = {
  load:function (url, target){
    $(target).load(url);
  },
  getScript:function (url, fn){
    $.getScript(url).done((script, textStatus) => {
      fn();
    }).fail(function (jqxhr, settings, exception) {
      new Woops({})
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