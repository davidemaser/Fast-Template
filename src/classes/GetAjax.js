/**
 * Created by David Maser on 20/06/2017.
 */
import {Global} from '../config/Global';
import Woops from './Woops';
import axios from 'axios';
import {Architect} from '../components/Faster';
import {FastTemplate} from '../functions/FastTemplate';
export default function GetAjax(url, props,element) {
  this.url = url;
  this.props = props;
  //element = element+1;
  function build(a,b,template,handle){
    /**@todo this function causes problems when rendering a template **/
    if(template !== null){
      a = FastTemplate(a,template);
    }
    window[handle] = handle !== null ? a : null;
    Architect.build.experiment($('body').find(`[fstxj-id="${b}"]`),Global.ajax.render,a);
  }
  function processProps(data, props) {
    if (typeof props === 'object') {
      let returnData = data;
      let dataTemplate = props['template'] !== undefined && props['template'] !=='' ? props['template'] : null;
      let saveHandle = props['saveAs'] !== undefined ? props['saveAs'] : null;
      if (typeof(props['node']) !== 'undefined') {
        if (props['node'].indexOf('.') > -1) {
          let propArray = props['node'].split('.');
          let p;
          for (p in propArray) {
            returnData = returnData[propArray[p]];
          }
        } else {
          returnData = returnData[props['node']];
        }
      }
      build(returnData,element,dataTemplate,saveHandle);
    }
  }

  axios.get(this.url)
    .then((response) => {
      if (Global.ajax.useDefault === true) {
        if (this.props !== undefined) {
          return processProps(response[Global.ajax.root.node], this.props)
        } else {
          return processProps(response[Global.ajax.root.node], null)
        }
      } else {
        if (this.props !== undefined) {
          return processProps(response, this.props)
        } else {
          return processProps(response, null);
        }
      }
    })
    .catch((error) => {
      new Woops({
        origin: 'GetAjax.run',
        type: 'AJAX Error',
        message: error,
        log: false
      })
    });
}
