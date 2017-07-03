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
  function parseClosure(arr){
    let rightArr = arr.reverse();
    let arrString = '';
    rightArr.map(function(a){
      arrString += `</${a}>`;
    });
    return arrString.length > 0 ? arrString : '';
  }
  function multiplyTag(tag,rep){
    let r;
    let outPutString = '';
    for(r=1;r<=rep;r++){
      outPutString += `<${tag}>`;
      outPutString += FastHtmlTags['closes'].includes(tag) ? `</${tag}>` : '';
    }
    return outPutString;
  }
  function buildTag(obj){
    if(Array.isArray(obj)){
      let rootObj = obj[0].trim();
      let rootNode;
      let objString='';
      let closureArr = [];
      obj.map(function(a,b){
        if(b>0) {
          let elem = a.trim();
          let elemContent;
          if(elem.indexOf('{') > -1 && elem.indexOf('}') > -1){
            elemContent = elem.split('{')[1].split('}')[0];
            elem = elem.split('{')[0];
          }
          if (elem.indexOf('*') > -1) {
            objString += multiplyTag(elem.split('*')[0], elem.split('*')[1]);
          } else {
            objString += `<${elem}>`;
            objString += elemContent !== undefined ? elemContent : '';
            objString += FastHtmlTags['closes'].includes(elem) ? closureArr.push(elem) : '';
          }
        }
      });
      rootNode = FastHtmlTags['closes'].includes(rootObj) ? `<${rootObj}>${objString.replace(/[0-9]/g, '')}${parseClosure(closureArr)}</${rootObj}>` : `<${rootObj}>${objString.replace(/[0-9]/g, '')}${parseClosure(closureArr)}`;
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
        console.log(objArray)
        htmlString += buildTag(objArray);
      }
      return htmlString;
    }
  }
  return parseObject(htmlStore);
}