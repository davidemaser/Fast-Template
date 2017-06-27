/**
 * Created by David Maser on 26/06/2017.
 */
import {Template} from '../config/Template';
import FormElements from '../components/FormElements';
export default function FastForm(option, expression){
  try {
    function processExpression(obj) {
      let expressionObj = {};
      let e;
      for (e in obj) {
        expressionObj[obj[e].split(':')[0]] = obj[e].split(':')[1];
      }
      return expressionObj;
    }

    function processLayout(obj, layout) {
      let o;
      for (o in obj) {
        let layoutOrigin = Template[option][o].replace(`@${o}`, obj[o]);
        layout = layout.replace(`@${option}.${o}`, layoutOrigin);
      }
      return layout;
    }

    let layout = Template[option].layout;
    let elements = Template[option].elements;
    let expressionArray = expression.split(',');
    let expressionObj = processExpression(expressionArray);
    let parsedLayout = processLayout(expressionObj, layout) || null;
    let formElements = FormElements(elements);
    parsedLayout = formElements !== null ? parsedLayout.replace(`@${option}.elements`, formElements) : parsedLayout;
    return parsedLayout;
  }catch(e){

  }
}