/*
 * Created by David Maser on 25/07/2017.
 */
import {FastUtilities} from '../functions/FastUtilities';
import {Template} from '../config/Template';
/**
 * The map object creates a link map view. Link maps can be a group of
 * links beneath a same parent or simple links
 * @param {string} option
 * @param {string} expression
 * @returns {string|object}
 */
export default function(option,expression){
  /**
   * Function processes sublinks and places them all in a unique
   * parent container
   * @param {object|array} arr
   * @returns {string}
   */
  function processSubLinks(arr){
    let subLinkArr = arr.split('&gt;');
    let subLinkString = '';
    subLinkArr.map(function(a){
      subLinkString += subLinkItem.replace('@action',a.split(',')[1].trim()).replace('@link',a.split(',')[0].trim())
    });
    return subLinkHolder.replace('@links',subLinkString);
  }

  let expArray = expression.split(/\r?\n/);
  expArray = FastUtilities.array.clean(expArray);
  let linkTemplate = Template.linkMap.layout;
  let linkItem = Template.linkMap.links.layout;
  let subLinkItem = Template.linkMap.subLinks.layout;
  let subLinkHolder = Template.linkMap.subLinks.holder;
  let linkString = '';
  expArray.map((a)=>{
    linkString += a.indexOf('&gt;')>-1 ? processSubLinks(a) : linkItem.replace('@action',a.split(',')[1]).replace('@link',a.split(',')[0]);
  });
  return linkTemplate.replace('@links',linkString).replace('@id',Template.id.replace('@id',FastUtilities.genFtxId()));
}