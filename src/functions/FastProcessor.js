/**
 * Created by David Maser on 21/06/2017.
 */
import FastMath from './FastMath';
import FastDate from './FastDate';
import FastCondition from './FastCondition';
import FastAjax from './FastAjax';
import FastForm from './FastForm';
import FastGutter from './FastGutter';
import FastPanel from './FastPanel';
export default function FastProcessor(type, option, expression, element){
  switch (type){
    case 'math':
      return FastMath(option,expression);
      break;
    case 'date':
      return FastDate(option,expression);
      break;
    case 'if':
      return FastCondition(option,expression);
      break;
    case 'json':
      new FastAjax(option,expression,element);
      break;
    case 'form':
      return FastForm(option,expression);
      break;
    case 'gutter':
      return FastGutter(option,expression);
      break;
    case 'panel':
      return FastPanel(option,expression);
      break;
  }
}