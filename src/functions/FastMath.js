/**
 * Created by David Maser on 21/06/2017.
 */
/**
 * Function evals a string mathematical formula
 * @param {string} option
 * @param {string} expression
 * @constructor
 */
export default function FastMath(option, expression) {
  let value = parseInt(eval(expression),10);
  if(option !== null && option !== undefined) {
    return Math[option](value);
  }else{
    return value;
  }
}