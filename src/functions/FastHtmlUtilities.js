/**
 * Created by David Maser on 29/06/2017.
 */
import {Global} from '../config/Global';
import {Template} from '../config/Template';
import FastHtmlEvents from '../functions/FastHtmlEvents';
export const FastHtmlUtilities = {
  HtmlTags:Global.fastHtmlTags,
  parseClosure(arr){
    let rightArr = arr.reverse();
    let arrString = '';
    rightArr.map(function (a) {
      arrString += `</${a}>`;
    });
    return arrString.length > 0 ? arrString : '';
  },
  parseTemplateString(obj){
    let o;
    let propString = '';
    for (o in obj) {
      propString += Template[o] !== undefined ? Template[o].replace(`@${o}`, obj[o]) : ` ${o}="${obj[o]}"`;
    }
    return propString;
  },
  buildProps(obj){
    let objArray;
    let objBuild = {};
    if (obj.indexOf(',') > -1) {
      objArray = obj.split(',');
      let o;
      for (o in objArray) {
        objArray[o].indexOf('bind') > -1 ? new FastHtmlEvents(objArray[o],obj) : objBuild[objArray[o].split('=')[0]] = objArray[o].split('=')[1];
      }
    } else {
        obj.indexOf('bind') > -1 ? new FastHtmlEvents(obj) : objBuild[obj.split('=')[0]] = obj.split('=')[1];
    }
    return this.parseTemplateString(objBuild);
  },
  multiplyTag(tag,rep,val){
    val = val.indexOf(',') ? val.split(',') : val;
    let r;
    let outPutString = '';
    for(r=1;r<=rep;r++){
      outPutString += `<${tag}>`;
      if(Array.isArray(val)){
        outPutString += val !== undefined && val[r-1] !== undefined ? val[r-1] : '';
      }else{
        outPutString += val !== undefined ? val : '';
      }
      outPutString += this.HtmlTags['closes'].includes(tag) ? `</${tag}>` : '';
    }
    return outPutString;
  }
};