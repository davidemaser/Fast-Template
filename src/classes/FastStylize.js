/**
 * Created by David Maser on 24/07/2017.
 */
import {Template} from '../config/Template';
import {StylizeUtilities} from '../functions/FastStylizeUtilities';
export default class FastStylize{
  constructor(option, expression,element){
    this.option = option;
    this.expression = expression;
    this.element = element;
    this.run();
  }
  run(){
    let expressionLength = this.expression.split(/\r?\n/).length;
    let content = this.expression.split(/\r?\n/).splice(1,expressionLength).join(' ').replace(/\s\s+/g,' ');
    if(this.expression.split(/\r?\n/).length > 1){
      this.expression = this.expression.split(/\r?\n/)[0];
    }
    this.expression = this.expression.split(/\r?\n/).length > 1 ? this.expression.split(/\r?\n/)[0] : this.expression;
    let stepArray = this.expression.split(' ');
    let buildOption = null;
    let optionString = '';
    stepArray.map(function (a) {
      let eventIndex = Template.instruct.events.indexOf(a);
      if (eventIndex > -1) {
        buildOption = a;
      } else {
        optionString += `${a} `;
      }
    });
    let obj = typeof StylizeUtilities[buildOption] === 'function' ? StylizeUtilities[buildOption](optionString,content) : null;
    let o;
    for(o in obj){
      StylizeUtilities.build(o,obj[o].styles,this.element);
    }
  }
}