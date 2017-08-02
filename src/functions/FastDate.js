/*
 * Created by David Maser on 21/06/2017.
 */
import {Global} from '../config/Global';
/**
 * The FastDate function parses and returns a date value based
 * on the format specified by the user or the caller
 * @param {string} option
 * @param {string} expression
 * @return {*|string}
 * @constructor
 */
export default function FastDate(option, expression){
  expression = expression || Global.experiment.date.full;
  let theDate = new Date();
  let dateObj = {
    mm: (theDate.getMonth() + 1).length === 0 ? `0${theDate.getMonth() + 1}` : theDate.getMonth(),
    dd: (theDate.getDate() + 1).length === 0 ? `0${theDate.getDate() + 1}` : theDate.getDate(),
    dow: theDate.getDay(),
    yyyy: theDate.getFullYear(),
    yy: theDate.getYear().toString().substr(-2),
    h: theDate.getHours(),
    m: theDate.getMinutes().length === 1 ? `0${theDate.getMinutes()}` : theDate.getMinutes(),
    s: theDate.getSeconds().length === 1 ? `0${theDate.getSeconds()}` : theDate.getSeconds()
  };
  for(let v in dateObj){
    expression = expression.replace(v,dateObj[v]);
  }
  return expression;
}