/**
 * Created by David Maser on 13/07/2017.
 */
import Woops from '../classes/Woops';
import {Template} from '../config/Template';
import {Global} from '../config/Global';
import {Architect} from '../components/Faster';
export const FastUtilities = {
  ui:{
    image:function(option,expression,element){
      let imgUrl = expression.indexOf('url:') > -1 ? expression.split('url:')[1] : null;
      let imgLoad = $('<img />');
      imgLoad.attr('src',imgUrl);
      imgLoad.unbind('load');
      imgLoad.bind('load', function () {
        let width,height,numValue,imageString;
        if(isNaN(option) === true){
          switch(option){
            case 'full':
              width = this.width;
              height = this.height;
              break;
            case 'half':
              width = Math.round(this.width/2);
              height = Math.round(this.height/2);
              break;
            case 'quarter':
              width = Math.round(this.width/4);
              height = Math.round(this.height/4);
              break;
            case 'eighth':
              width = Math.round(this.width/8);
              height = Math.round(this.height/8);
              break;
          }
        }else{
          numValue = parseInt(option);
          width = Math.round(this.width/numValue);
          height = Math.round(this.height/numValue);
        }
        imageString = imgLoad[0].outerHTML.replace('">',`" width="${width}" height="${height}">`);
        Architect.build.experiment($(Global.appRoot).find(`[fstx-id="${element}"]`),null,imageString,true);
      });
    },
    /**
     * Simple function that creates a placeholder object in the
     * page.
     * @param {string} type
     * @returns {string}
     */
    placeholder:function(type){
      return `<div class="ftx__placeholder ${type}"></div>`
    },
    /**
     * This function unbinds existing elements from the dom and
     * groups them all together in a single parent. This is useful
     * @param {string} option
     * @param {string} expression
     * @returns {string}
     */
    group:function(option,expression){
      option = option !== null ? option : 'section';
      return `<${option} class="ftx__group ${option}" role="group">${expression}</${option}>`;
    },
    /**
     * This function takes an existing element and unbinds it from the dom and
     * appends it into a new clone host
     * @param {string} option
     * @param {string} expression
     */
    bind:function(option,expression){
      $(Global.appRoot).prepend(Template.clone);
      expression = expression.indexOf(',') > -1 ? expression.split(',') : expression;
      if(Array.isArray(expression)){
        expression.map(function(a){
          /*
          set a timeout so that all other dynamic elements
          can render before unbinding them and appending
          them to their new host
          */
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
    /**
     * This function takes an array of html elements and randomizes their position
     * on the page, within a parent container
     * @param {string} option
     * @param {string} expression
     * @returns {string}
     */
    random:function(option,expression){
      option = option !== null ? option : 'section';
      let elementArray = expression.trim().split(/\r?\n/);
      return Template.random.layout.replace(/@option/g,option).replace('@content',this.shuffleArray(elementArray).join(''));
    },
    shuffleArray: function (array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i].trim();
        array[i] = array[j].trim();
        array[j] = temp;
      }
      return array;
    },
    /**
     * Simple function that wraps elements in a mobile container. Option can be set to default
     * or 1 of the accepted breakpoint values
     * @param {string} option
     * @param {string} expression
     * @returns {string}
     */
    mobile:function(option,expression){
      option = option !== null ? option : 'default';
      return `<section class="ftx__mobile size__${option}">${expression}</section>`;
    }
  },
  ux:{
    prefetch:function(option,expression){
      try {
        option = option !== null ? option : 'section';
        let elementArray = expression.trim().split(/\r?\n/);
        let elementString = Template.head.prefetch;
        if (Array.isArray(elementArray)) {
          elementArray.map(function (a) {
            $('head').append(elementString.replace('@prefetch.url', a.trim()));
          })
        }
      }catch(e){
        new Woops({

        })
      }
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
    $('*[ftx-render]').each((a,b)=>{
      countLog[a] = b;
    });
    return countLog;
  },
  genFtxId:function(){
    let d = new Date();
    let uniqueArray = FastUtilities.ui.shuffleArray(['f','as','t','e','r']).join('');
    return `${uniqueArray}${d.getHours()}-${d.getMilliseconds()}`;
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

if(typeof window[Global.appObj] === 'object'){
  window[Global.appObj]['utilities'] = FastUtilities;
}else{
  window[Global.appObj] = {};
  window[Global.appObj]['utilities'] = FastUtilities;
}