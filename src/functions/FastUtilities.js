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
      option = option === null ? '' : option;
      return `<section class="ftx__group ${option}" role="group">${expression}</section>`;
    },
    bind:function(option,expression){
      let objArray = [];
      $('body').prepend('<section ftx-clone></section>');
      expression = expression.indexOf(',') > -1 ? expression.split(',') : expression;
      if(Array.isArray(expression)){
        expression.map(function(a){
          window.setTimeout(function(){
            $(`#${a}`).attr('ftx-cloned','true').appendTo('section[ftx-clone]');
          },100);
        })
      }else{
        window.setTimeout(function(){
          $(`#${expression}`).attr('ftx-cloned','true').appendTo('section[ftx-clone]');
        },100);
      }
    },
    random:function(option,expression){
      let elementArray = expression.trim().split(/\r?\n/);
      let randomTemplate = '<section ftx-render class="ftx__random">@content</section>';
      return randomTemplate.replace('@content',this.shuffleArray(elementArray).join().replace(/,/g,''));
    },
    shuffleArray: function (array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i].trim();
        array[i] = array[j].trim();
        array[j] = temp;
      }
      return array;
    }
  },
  components:{
    search:function(option,expression){
      let template = {
        layout:'<div class="ftx__component search"><input ftx-target="@search.target" name="ftx_search" id="ftx_comp_search" type="text" placeholder="@search.placeholder" />@search.button</div>',
        button:'<button>@search.label</button>'
      };
      let templateStr;
      let expArray = expression.indexOf(',') > -1 ? expression.split(',') : expression;
      switch(option){
        case 'default':
          templateStr = template.layout.replace('@search.button',template.button);
          break;
      }
      if(Array.isArray(expArray)){
        expArray.map(function(a){
          templateStr = templateStr.replace(`@search.${a.split(':')[0]}`,a.split(':')[1]);
        })
      }
      return templateStr;
    },
    card:function(option,expression){

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