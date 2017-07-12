/**
 * Created by David Maser on 12/07/2017.
 */
import {Template} from '../config/Template';
const builder = {
  accordObj:{},
  do:function(){
    let o;
    let obj = builder.accordObj;
    let objString = '';
    for(o in obj){
      objString += Template.accordion.item.replace('@accordion.item.title',o).replace('@accordion.item.body',obj[o]);
    }
    return Template.accordion.parent.replace('@accordion.item',objString);
  },
  init:function(a,b){
    if(Array.isArray(b)){
      let o;
      for(o in b){
        if(b.hasOwnProperty(o)) {
          let cleanB = b[o].trim();
          builder.accordObj[cleanB.split('[title=')[1].split(']')[0]] = cleanB.split(']')[1].trim();
        }
      }
      return builder.do();
    }
  }
};
export default function FastAccordion(option,expression){
  let trimObj = expression.trim().split(/\r?\n/);
  return builder.init(option,trimObj);
}