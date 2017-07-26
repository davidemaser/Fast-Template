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
import FastAnimator from '../classes/FastAnimator';
import FastNav from './FastNav';
import FastAccordion from './FastAccordion';
import FastTable from './FastTable';
import FastSticky from './FastSticky';
import FastBanner from './FastBanner';
import FastVideo from './FastVideo';
import FastAnalytics from '../classes/FastAnalytics';
import FastStylize from '../classes/FastStylize';
import FastMap from '../functions/FastMap';
import FastFilter from './FastFilter';
import {FastUtilities} from './FastUtilities';
/**
 * The FastProcessor is one of the core functions called by new Cycle(). The
 * Cycle class passes ftx parameters to the Processor. Depending on what kind
 * of Fast type object is being processed, specific functions or methods will
 * be called to evaluate and render the fast template. Async methods require
 * the element parameter as they do not send a render directive back to the
 * Faster core but, instead, send directly the object and/or arguments to the
 * Architect.
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
    case 'analytics':
      new FastAnalytics(option,expression);
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
    case 'prefetch':
      return FastUtilities.ux.prefetch(option,expression);
      break;
    case 'image':
      return FastUtilities.ui.image(option,expression,element);
      break;
    case 'banner':
      return FastBanner(option,expression);
      break;
    case 'video':
      return FastVideo(option,expression);
      break;
    case 'map':
      return FastMap(option,expression);
      break;
    case 'filter':
      return FastFilter(option,expression);
      break;
    case 'stylize':
      new FastStylize(option,expression,element);
      break;
    case 'trim':
      return FastUtilities.ui.trim(option,expression);
      break;
    case 'array':
      return FastUtilities.array.generate(option,expression);
      break;

  }
}