/**
 * Created by David Maser on 21/06/2017.
 */
import FastMath from './FastMath';
import FastDate from './FastDate';
import FastCondition from './FastCondition';
import FastAjax from './FastAjax';
export default function Processor(type,option,expression,element){
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
      return new FastAjax(option,expression,element);
      break;
  }
}