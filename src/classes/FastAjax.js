/*
 * Created by David Maser on 22/06/2017.
 */
import GetAjax from './GetAjax';
import RegisterState from './RegisterState';
export default class FastAjax{
  /**
   * FastAjax is the class that handles and dispatches all AJAX
   * requests from the app
   * @param {string} option
   * @param {string} expression
   * @param {string} element
   * @constructor
   */
  constructor(option, expression,element){
    this.option = option;
    this.expression = expression;
    this.element = element;
    this.run();
  }
  run() {
    new RegisterState('jsonLoaded',false,'appData');
    let jsonSource = this.option;
    let jsonObject = {};
    if (this.expression.indexOf(',') > -1) {
      let jsonParams = this.expression.indexOf(',') > -1 ? this.expression.split(',') : this.expression;
      let j;
      for (j in jsonParams) {
        jsonObject[jsonParams[j].split('=')[0]] = jsonParams[j].split('=')[1];
      }
    } else {
      jsonObject = null;
    }
    GetAjax(jsonSource, jsonObject, this.element);
  }
}