/**
 * Created by David Maser on 20/07/2017.
 */
import {Global} from '../config/Global';
import {Template} from '../config/Template';
import Woops from '../classes/Woops';
/**
 * Creates a new Analytics object.
 * @class
 */
export default class FastAnalytics {
  /**
   *
   * @param {string} option
   * @param {string} expression
   */
  constructor(option, expression) {
    this.option = option;
    this.expression = expression;
    this.build();
  }

  build() {
    try {
      switch (this.option) {
        case 'gtm':
          let userID = this.expression.indexOf('id:') > -1 ? this.expression.split('id:')[1] : '';
          userID = userID.indexOf(',') > -1 ? userID.split(',')[0] : userID;
          $(Global.appHead).append(Template.analytics.google.gtmCode.replace('@user.id', userID)).prepend(Template.analytics.google.gtmDataLayer);
          this.register({
            'entries': [
              {'click': 'button'},
              {'click': 'input'}
            ]
          });
          break;
        case 'basic':
          userID = this.expression.indexOf('id:') > -1 ? this.expression.split('id:')[1] : '';
          userID = userID.indexOf(',') > -1 ? userID.split(',')[0] : userID;
          $(Global.appHead).append(Template.analytics.google.gtAnalytics.replace('@user.id', userID));
          break;
      }
    }catch(e){
      new Woops({})
    }
  }

  /**
   * This function register events to allow for transmission of event data
   * to the GTM dataLayer
   * The elem parameter can be a string, an array of strings or an object
   * When formatting as an object, the object key is the type of event and
   * the key value is the element
   * @param {string|object|object[]} elem Elem parameter can be a string, an array of strings or an object. When formatting as an object, the object key is the type of event and the key value is the element
   */
  register(elem) {
    if (Array.isArray(elem)) {
      elem.map(function (a) {
        $(Global.appRoot).on('click', a, function () {
          let eventName = $(this).attr('ftx-event') !== undefined ? $(this).attr('ftx-event') : 'no event';
          dataLayer.push({'event': eventName});
          console.log(eventName)
          //
        })
      });
    } else if (typeof elem === 'object' && !Array.isArray(elem)) {
      elem = elem.entries;
      if(Array.isArray(elem)){
        elem.map(function (obj) {
          let o;
          for (o in obj) {
            $(Global.appRoot).on(o, obj[o], function () {
              let eventName = $(this).attr('ftx-event') !== undefined ? $(this).attr('ftx-event') : 'no event';
              dataLayer.push({'event': eventName});
            });
          }
        })
      }else{
        let e;
        for (e in elem) {
          $(Global.appRoot).on(e, elem[e], function () {
            let eventName = $(this).attr('ftx-event') !== undefined ? $(this).attr('ftx-event') : 'no event';
            dataLayer.push({'event': eventName});
          });
        }
      }
    } else {
      $(Global.appRoot).on('click', elem, function () {
        let eventName = $(this).attr('ftx-event') !== undefined ? $(this).attr('ftx-event') : 'no event';
        dataLayer.push({'event': eventName});
        console.log(eventName)
      })
    }
  }
}