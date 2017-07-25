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
    /**
     * Function that adds a prefetch meta element to the page head
     * when the page initially loads.
     * @param {string} option
     * @param {string} expression
     */
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
    /**
     * Function that builds a search box component
     * @param {string} option
     * @param {string} expression
     * @returns {string}
     */
    search:function(option,expression){
      let templateStr;
      let expArray = expression.indexOf(',') > -1 ? expression.split(',') : expression;
      switch(option){
        case 'default':
          templateStr = Template.forms.search.layout.replace('@search.button',Template.forms.search.button);
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
  /**
   * Function that operates a multi replace on a string and
   * returns the string with replacements
   * @param {string} src
   * @param {string} obj
   * @returns {string}
   * @example
   * .stripper('this is a string',{'this:'that','those':'these'})
   */
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
  /**
   * simple function that counts the number of ftx nodes on a
   * specific page and returns an object mapping all of them
   * @returns {{}}
   */
  countFtx:function(){
    let countLog = {};
    $('*[ftx-render]').each((a,b)=>{
      countLog[a] = b;
    });
    return countLog;
  },
  /**
   * Simple function that creates and returns a unique string
   * tha is used as an id for other objects and elements
   * @returns {string}
   */
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
export const StylizeUtilities = {
  argsObj: {},
  default: 'styles',
  build:function(obj,params,element){
    let htmlContent = this.argsObj[obj]['content'].trim();
    let htmlString = Template.div.styled.replace(/@elem/g,obj).replace('@id',Template.id.replace('@id',FastUtilities.genFtxId()));
    let styleString = '';
    if(typeof params === 'object'){
      let p;
      for(p in params){

        styleString+=`${p}:${params[p]};`;
      }
    }
    let buildString = styleString !== '' ? htmlString.replace('@style',styleString) : htmlString.replace(' style="@style"','');
    buildString = buildString.replace('@content',htmlContent);
    Architect.build.experiment($(Global.appRoot).find(`[fstx-id="${element}"]`),Global.experiment.render,buildString,true);
  },
  make: function (arg,content) {
    let argsArray = arg.split(' ');
    this.argsObj[argsArray[0]] = {};
    this.argsObj[argsArray[0]]['content'] = content;
    this.argsObj[argsArray[0]][this.default] = {};
    let tempObj = argsArray[0];
    argsArray = argsArray.splice(1);
    let a;
    let altString = [];
    let bltString = [];
    for (a in argsArray) {
      if ((a % 2 === 0)) {
        argsArray[a] !== '' ? altString.push(argsArray[a]) : null;
      } else {
        argsArray[a] !== '' ? bltString.push(argsArray[a]) : null;
      }
    }
    return this.objectify(tempObj, altString, bltString)
  },
  objectify: function (obj, a, b) {
    if (a.length === b.length) {
      let i;
      for (i in a) {
        this.argsObj[obj]['styles'][a[i]] = b[i];
      }
    }
    return this.argsObj;
  }
};

if(typeof window[Global.appObj] === 'object'){
  window[Global.appObj]['utilities'] = FastUtilities;
}else{
  window[Global.appObj] = {};
  window[Global.appObj]['utilities'] = FastUtilities;
}