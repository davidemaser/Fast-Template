/**
 * Created by David Maser on 21/06/2017.
 */
import FastMath from './FastMath';
import FastDate from './FastDate';
import FastCondition from './FastCondition';
import FastAjax from '../classes/FastAjax';
import FastForm from './FastForm';
import FastGutter from './FastGutter';
import FastPanel from './FastPanel';
import FastModal from './FastModal';
import FastHtml from './FastHtml';
import FastAnimator from './FastAnimator';
import FastNav from './FastNav';
import FastAccordion from './FastAccordion';
import FastTable from './FastTable';
import FastSticky from './FastSticky';
import FastBanner from './FastBanner';
import {FastUtilities} from './FastUtilities';
/**
 *
 * @param {string} type
 * @param {string} option
 * @param {string|object} expression
 * @param {string|object} element
 * @returns {object}
 * @constructor
 */
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
    case 'modal':
      return FastModal(option,expression);
      break;
    case 'html':
      return FastHtml(option,expression);
      break;
    case 'animate':
      return new FastAnimator(option,expression);
      break;
    case 'nav':
      return FastNav(option,expression,element);
      break;
    case 'table':
      return FastTable(option,expression,element);
      break;
    case 'accordion':
      return FastAccordion(option,expression);
      break;
    case 'sticky':
      return FastSticky(option,expression);
      break;
    case 'placeholder':
      return FastUtilities.ui.placeholder(option);
      break;
    case 'group':
      return FastUtilities.ui.group(option,expression);
      break;
    case 'search':
      return FastUtilities.components.search(option,expression);
      break;
    case 'bind':
      return FastUtilities.ui.bind(option,expression);
      break;
    case 'random':
      return FastUtilities.ui.random(option,expression);
      break;
    case 'mobile':
      return FastUtilities.ui.mobile(option,expression);
      break;
    case 'banner':
      return FastBanner(option,expression);
      break;

  }
}