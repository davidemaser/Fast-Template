/**
 * Created by David Maser on 24/07/2017.
 */
import {Template} from '../config/Template';
import {InstructionUtilities} from './FastInstructionsUtilities';
export default function (option, expression,element) {
  let expressionLength = expression.split(/\r?\n/).length;
  let content = expression.split(/\r?\n/).splice(1,expressionLength).join(' ').replace(/\s\s+/g,' ');
  if(expression.split(/\r?\n/).length > 1){
    expression = expression.split(/\r?\n/)[0];
  }
  expression = expression.split(/\r?\n/).length > 1 ? expression.split(/\r?\n/)[0] : expression;
  let stepArray = expression.split(' ');
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
  let obj = typeof InstructionUtilities[buildOption] === 'function' ? InstructionUtilities[buildOption](optionString,content) : null;
  let o;
  for(o in obj){
    InstructionUtilities.build(o,obj[o].styles,element);
  }
}