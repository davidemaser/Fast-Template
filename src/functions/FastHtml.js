/**
 * Created by David Maser on 29/06/2017.
 */
import {FastHtmlTags} from './FastHtmlTags';
export default function FastHtml(option, expression){
  let htmlStore = {};
  let htmlArray = expression.trim().split(/\r?\n/);
  if(Array.isArray(htmlArray)){
    let a;
    for(a in htmlArray){
      htmlStore[a] = htmlArray[a].trim();
    }
  }
  function multiplyTag(tag,rep){
    let r;
    let outPutString = '';
    for(r=1;r<=rep;r++){
      outPutString += `<${tag}>`;
      outPutString += FastHtmlTags[tag].closes === true ? `</${tag}>` : '';
    }
    return outPutString;
  }
  function buildTag(obj){
    if(Array.isArray(obj)){
      let rootObj = obj[0].trim();
      let rootNode;
      let o;
      let objString;
      let objLength = obj.length;
      for(o = 1;o<objLength;o++){
        let elem = obj[o].trim();
        if(elem.indexOf('*') > -1){
          objString = multiplyTag(elem.split('*')[0],elem.split('*')[1]);
        }else{
          objString = `<${elem}>`;
          objString += FastHtmlTags[elem].closes === true ? `</${elem}>` : '';
        }
      }
      rootNode = FastHtmlTags[rootObj].closes === true ? `<${rootObj}>${objString}</${rootObj}>` : `<${rootObj}>${objString}`;
      return rootNode;
    }
  }
  function parseObject(obj){
    let isProps = ['class','id'];
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
    }
  }
  return parseObject(htmlStore);
}