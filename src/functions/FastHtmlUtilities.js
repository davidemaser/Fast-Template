/**
 * Created by David Maser on 29/06/2017.
 */
import {Global} from '../config/Global';
import {Template} from '../config/Template';
export const FastHtmlUtilities = {
  HtmlTags:Global.FastHtmlTags,
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
        objBuild[objArray[o].split('=')[0]] = objArray[o].split('=')[1];
      }
    } else {
      objBuild[obj.split('=')[0]] = obj.split('=')[1];
    }
    return this.parseTemplateString(objBuild);
  },
  multiplyTag(tag,rep){
    let r;
    let outPutString = '';
    for(r=1;r<=rep;r++){
      outPutString += `<${tag}>`;
      outPutString += this.HtmlTags['closes'].includes(tag) ? `</${tag}>` : '';
    }
    return outPutString;
  }
};