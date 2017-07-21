/**
 * Created by David Maser on 20/07/2017.
 */
import {Global} from '../config/Global';
const gtmCode = "<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});" +
  "var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })" +
  "(window,document,'script','dataLayer','@user.id');</script>";
const gtAnalyticss = "<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){ (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m) })(window,document,'script','https://www.google-analytics.com/analytics.js','ga'); ga('create', '@user.id', 'auto'); ga('send', 'pageview'); </script>";
const gtmDataLayer = "<script>dataLayer = [{'pageCategory': 'signup','visitorType': 'high-value'}];</script>";

export default class FastAnalytics {
  constructor(option, expression) {
    this.option = option;
    this.expression = expression;
    this.build();
  }

  build() {
    switch (this.option) {
      case 'gtm':
        let userID = this.expression.indexOf('id:') > -1 ? this.expression.split('id:')[1] : '';
        userID = userID.indexOf(',') > -1 ? userID.split(',')[0] : userID;
        $(Global.appHead).append(gtmCode.replace('@user.id', userID)).prepend(gtmDataLayer);
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
        $(Global.appHead).append(gtAnalyticss.replace('@user.id', userID));
        break;
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