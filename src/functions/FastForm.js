/*
 * Created by David Maser on 26/06/2017.
 */
import {Template} from '../config/Template';
import FormElements from './FormElements';
/**
 * FastForm builds and appends to the dom a form object
 * as well as it's required children.
 * @param {string} option
 * @param {string} expression
 * @return {*|null}
 * @constructor
 */
export default function FastForm(option, expression) {
  try {
    /**
     * This function splits the expression into chunks that
     * will guide the function to parse the required content
     * @param {object} obj
     * @return {object}
     */
    function processExpression(obj) {
      let expressionObj = {};
      let e;
      for (e in obj) {
        expressionObj[obj[e].split(':')[0]] = obj[e].split(':')[1];
      }
      return expressionObj;
    }

    /**
     * This function uses the expressionObj object as well as values
     * from the template object to create a form layout
     * @param {object} obj
     * @param {string} layout
     * @return {string}
     */
    function processLayout(obj, layout) {
      let o;
      for (o in obj) {
        let layoutOrigin = Template.forms[option][o].replace(`@${o}`, obj[o]);
        layout = layout.replace(`@${option}.${o}`, layoutOrigin);
      }
      return layout;
    }

    let layout = Template.forms[option].layout;
    let elements = Template.forms[option].elements;
    let expressionArray = expression.split(',');
    let expressionObj = processExpression(expressionArray);
    let parsedLayout = processLayout(expressionObj, layout) || null;
    let formElements = FormElements(elements);
    parsedLayout = formElements !== null ? parsedLayout.replace(`@${option}.elements`, formElements) : parsedLayout;
    return parsedLayout;
  } catch (e) {

  }
}