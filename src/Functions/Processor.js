/**
 * Created by David Maser on 21/06/2017.
 */
import FastMath from './FastMath';
import FastDate from './FastDate';
import FastCondtion from './FastCondition';
export default function Processor(type,option,expression){
  switch (type){
    case 'math':
      return FastMath(option,expression);
      break;
    case 'date':
      return FastDate(option,expression);
      break;
    case 'if':
      return FastCondtion(option,expression);
      break;
  }
}