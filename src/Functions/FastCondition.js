/**
 * Created by David Maser on 21/06/2017.
 */
import Woops from '../classes/Woops';
export default function FastCondition(option, expression){
  let comparative = option.indexOf('=') > -1 ? option.split('=') : option;
  let optionArray = expression.indexOf('{else}') > -1 ? expression.split('{else}') : expression;
  let result;
  if(Array.isArray(comparative)){
    let compareTo = comparative[0];
    let compareValue = comparative[1];
    switch(compareTo){
      case 'hour':
        let hourValue = new Date().getHours();
        let hourCheck = parseInt(compareValue);
        if(hourValue === hourCheck){
          result = Array.isArray(optionArray) ? optionArray[0] : optionArray;
        }else{
          result = Array.isArray(optionArray) ? optionArray[1] : '';
        }
        break;
      case 'day':
        let dayValue = new Date().getDate();
        let dayCheck = parseInt(compareValue);
        if(dayValue === dayCheck){
          result = Array.isArray(optionArray) ? optionArray[0] : optionArray;
        }else{
          result = Array.isArray(optionArray) ? optionArray[1] : '';
        }
        break;
      case 'month':
        let monthValue = (new Date().getMonth() + 1).length === 0 ? `0${new Date().getMonth() + 1}` : new Date().getMonth()+1;
        let monthCheck = parseInt(compareValue);
        if(monthValue === monthCheck){
          result = Array.isArray(optionArray) ? optionArray[0] : optionArray;
        }else{
          result = Array.isArray(optionArray) ? optionArray[1] : '';
        }
        break;
    }
  }else{
    new Woops({
      origin:'FastCondition',
      type:'Format Error',
      message:'Condition must be an array (formatted as x=y)',
      log:false
    });
  }

  return result;
}