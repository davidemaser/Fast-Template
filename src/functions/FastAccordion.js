/**
 * Created by David Maser on 12/07/2017.
 */
import {Template} from '../config/Template';
import {FastUtilities} from '../functions/FastUtilities';
/**
 *
 * @type {{accordObj: {}, do: builder.do, init: builder.init}}
 */
const builder = {
  accordObj:{},
  do:function(){
    let o;
    let obj = builder.accordObj;
    let objString = '';
    for(o in obj){
      objString += FastUtilities.stripper(Template.accordion.item,{
        '@accordion.item.title':o,
        '@accordion.item.body':obj[o]
      });
    }
    $('body').on('click',Template.accordion.params.trigger,function(){
      $(this).parent().find(Template.accordion.params.target).slideToggle(Template.accordion.params.speed);
    });
    return Template.accordion.parent.replace('@accordion.item',objString);
  },
  /**
   *
   * @param {string} a
   * @param {object[]} b
   * @returns {*}
   */
  init:function(a,b){
    if(Array.isArray(b)){
      let o;
      for(o in b){
        if(b.hasOwnProperty(o)) {
          let cleanB = b[o].trim();
          builder.accordObj[cleanB.split('[title=')[1].split(']')[0]] = cleanB.split(']')[1].trim();
        }
      }
      return builder.do();
    }
  }
};
/**
 *
 * @param {string} option
 * @param {string} expression
 * @returns {*}
 * @constructor
 */
export default function FastAccordion(option,expression){
  let trimObj = expression.trim().split(/\r?\n/);
  return builder.init(option,trimObj);
}