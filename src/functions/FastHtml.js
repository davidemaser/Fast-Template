/*
 * Created by David Maser on 29/06/2017.
 */
import {Global} from '../config/Global';
import {FastHtmlUtilities} from '../functions/FastHtmlUtilities';
import Woops from '../classes/Woops';
/**
 * Function that reads and parses code into html
 * @param {string} option
 * @param {string} expression
 * @returns {string}
 * @constructor
 */
export default function FastHtml(option, expression){
  let HtmlTags = Global.fastHtmlTags;
  let htmlStore = {}; //object that contains all html elements and line items
  let htmlArray = expression.trim().split(/\r?\n/);
  if(Array.isArray(htmlArray)){
    let a;
    for(a in htmlArray){
      htmlStore[a] = htmlArray[a].trim();
    }
  }
  /**
   * Function builds the tag structure base on the string or object
   * passed by the parser
   * @param {string} obj
   * @return {string|*}
   */
  function buildTag(obj){
    if(Array.isArray(obj)){
      let rootObj = obj[0].trim();
      let rootObjProps;
      if(rootObj.indexOf('[')>-1){
        rootObjProps = rootObj.split('[')[1].split(']')[0];
        rootObj = rootObj.replace(`[${rootObjProps}]`,'');
      }else{
        rootObjProps = null;
      }
      let rootObjPropString = rootObjProps !== null && rootObjProps !== undefined ? FastHtmlUtilities.buildProps(rootObjProps) : '';
      let rootNode;
      let objString='';
      let closureArr = [];
      obj.map(function(a,b){
        if(b>0) {
          let objProps;
          if(a.indexOf('[')>-1){
            objProps = a.split('[')[1].split(']')[0];
            a = a.replace(`[${objProps}]`,'');
          }else{
            objProps = null;
          }
          let propString = objProps !== null && objProps !== undefined ? FastHtmlUtilities.buildProps(objProps) : '';
          let elem = a.trim();
          let elemContent;
          if(elem.indexOf('{') > -1 && elem.indexOf('}') > -1){
            elemContent = elem.split('{')[1].split('}')[0];
            elem = elem.split('{')[0];
          }
          if (elem.indexOf('*') > -1) {
            objString += objProps !== undefined ? FastHtmlUtilities.multiplyTag(elem.split('*')[0], elem.split('*')[1],objProps) : FastHtmlUtilities.multiplyTag(elem.split('*')[0], elem.split('*')[1]);
          } else {
            objString += `<${elem}${propString}>`;
            objString += elemContent !== undefined ? elemContent : '';
            objString += HtmlTags['closes'].includes(elem) ? closureArr.push(elem) : '';
          }
        }
      });
      rootNode = HtmlTags['closes'].includes(rootObj) ? `<${rootObj}${rootObjPropString}>${objString.replace(/[0-9]/g, '')}${FastHtmlUtilities.parseClosure(closureArr)}</${rootObj}>` : `<${rootObj}>${objString.replace(/[0-9]/g, '')}${FastHtmlUtilities.parseClosure(closureArr)}`;
      return rootNode;
    }
  }

  /**
   * Function cycles through elements of the object collected in the htmlstore
   * and exports a string that will be handled by the buildTag function
   * @param {object} obj
   * @return {string}
   */
  function parseObject(obj){
    if(typeof obj === 'object'){
      let o;
      let objArray;
      let htmlString = '';
      for(o in obj){
        if(obj[o].indexOf('--') > -1){
          objArray = obj[o].split('--');
        }else{
          objArray = obj[o];
        }
        htmlString += buildTag(objArray);
      }
      return htmlString;
    }else{
      new Woops({
        origin:'FastHtml.parseObject',
        type:'Expecting Object',
        message:'Function was expecting an object but did not receive one',
        log:false
      });
    }
  }
  return parseObject(htmlStore);
}