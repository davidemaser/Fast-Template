/**
 * Created by David Maser on 12/07/2017.
 */
import {Template} from '../config/Template';
const Runner = {
  accordObj:{},
  build:function(){
    let o;
    let obj = Runner.accordObj;
    let objString = '';
    for(o in obj){
      objString += Template.accordion.item.replace('@accordion.item.title',o).replace('@accordion.item.body',obj[o]);
    }
    return Template.accordion.parent.replace('@accordion.item',objString);
  },
  parse:function(a,b){
    if(Array.isArray(b)){
      let o;
      for(o in b){
        let cleanB = b[o].trim();
        Runner.accordObj[cleanB.split('[title=')[1].split(']')[0]] = cleanB.split(']')[1].trim();
      }
      return Runner.build();
    }
  }
};
export default function FastAccordion(option,expression){
  let trimObj = expression.trim().split(/\r?\n/);
  return Runner.parse(option,trimObj);
}