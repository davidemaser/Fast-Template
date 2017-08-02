/*
 * Created by David Maser on 26/07/2017.
 */
import {Global} from '../config/Global';
import Woops from '../classes/Woops';
/**
 * FastFilter executes filter commands such as stripping code
 * or expletives from a passed string. The returned value is
 * a string that does not contain the words, tags or expressions
 * passed as a rule
 * @param {string} option
 * @param {string} expression
 * @return {string}
 * @constructor
 */
export default function(option,expression){
  let acceptedOptions = ['language','code','custom'];
  if(acceptedOptions.indexOf(option)>-1){
    switch(option){
      case 'language':
        /**
         * Removes all language blocks from a string based on rules found in
         * the global config file
         * @type {Element}
         * @return {string}
         */
        let languageStore = Global.rules.language.restricted;
        if(Array.isArray(languageStore)){
          languageStore.map(function(a){
            expression = expression.replace(new RegExp(a,'g'),Global.rules.language.replacement);
          })
        }
        return expression;
        break;
      case 'code':
        /**
         * Removes all code blocks from a string based on rules passed in
         * the filter object.
         * @type {Element}
         * @return {string}
         */
        if(expression.indexOf('{rules:')>-1){
          let ruleArray = expression.split('{rules:')[1].split('}')[0].split(',');
          expression = expression.split('{rules:')[1].split('}')[1]; //remove the rules object
          if(Array.isArray(ruleArray)){
            ruleArray.map((a)=>{
              if(a === 'br' || a === 'hr'){
                expression = expression.replace(new RegExp(`<${a} />`,'g'),'').replace(new RegExp(`<${a}>`,'g'),'');
              }else{
                let tagOpen = `<${a}>`;
                let tagClose = `</${a}>`;
                expression = expression.replace(new RegExp(tagOpen,'g'),'').replace(new RegExp(tagClose,'g'),'');
              }
            })
          }
          return expression;
        }else{
          /**
           * removes all html code blocks from a string
           * @type {Element}
           * @return {string}
           */
          let container = document.createElement('div');
          container.innerHTML = expression;
          return container.textContent || container.innerText || '';
        }
        break;
    }
  }else{
    new Woops({
      origin:'FastFilter',
      type:'Option Parameter Error',
      message:'Option parameter does not match any accepted options',
      log:false
    })
  }
}