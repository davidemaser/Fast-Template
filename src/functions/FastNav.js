/**
 * Created by David Maser on 10/07/2017.
 */
import {Global} from '../config/Global';
import {Template} from '../config/Template';
import {Architect} from '../components/Faster';
import {FastUtilities} from '../functions/FastUtilities';
import Woops from '../classes/Woops';
/**
 *
 * @param {string} option
 * @param {string} expression
 * @param {string} element
 * @constructor
 */
export default function FastNav(option,expression,element){
  option = option || 'horizontal';
  let objLayout = Template.nav.layout[option];
  let objParentTag = Template.nav.link;
  let objNode = Template.nav.node.layout;
  let objNodeEntry = Template.nav.node.entry;
  let ajaxUrl = Global.ajax.root.url;
  if(expression.indexOf('json:')>-1){
    let jsonPath = expression.split('json:')[1].split('}')[0];
    getRemoteJson(`${ajaxUrl}/${jsonPath}.json`);
  }else{
    getLocalJson();
  }
  /**
   *
   * @param {string} url
   */
  function getRemoteJson(url){
    $.ajax({
      url:url,
      success:function(data){
        parseNavObj(data);
      },
      error:function(){
        new Woops({
          origin:'FastNav.getRemoteJson',
          type:'AJAX Error',
          message:'Unable to handle the AJAX request',
          log:false
        })
      }
    })
  }
  function getLocalJson(){
    let isValidJson,jsonObj;
    try{
      jsonObj = JSON.parse(expression);
      isValidJson = true;
    }catch(e){
      isValidJson = false;
    }
    if(isValidJson){
      if(typeof jsonObj === 'object'){
        let o,nodeString='';
        for(o in jsonObj){
          nodeString += o === 'master' ? jsonObj[o] : parseChildren(jsonObj[o]);
        }
        return objLayout.replace('@nav.node',nodeString);
      }
    }
  }

  let objNodeString = objNode.replace('@node',objNodeEntry);
  //let objString = objLayout.replace('@nav.node',objNodeString);
  /**
   *
   * @param {object} obj
   */
  function parseNavObj(obj){
    let itemArray = [];
    let objForm;
    if(typeof obj === 'object'){
      let o;
      for(o in obj){
        if(obj.hasOwnProperty(o)) {
          itemArray.push(obj[o]);
        }
      }
      objForm = parseParents(itemArray);
    }
    Architect.build.experiment($(Global.appRoot).find(`[fstx-id="${element}"]`),null,objLayout.replace('@nav.node',objForm),true);
  }

  /**
   *
   * @param {object} obj
   * @returns {string}
   */
  function parseParents(obj){
    let parentString = '';
    let parentTag;
    if(typeof obj === 'object') {
      obj.map(function(a){
        parentTag = FastUtilities.stripper(objParentTag,{
          '@link':a.item.parent.link,
          '@label':a.item.parent.label
        });
        parentString += parentTag.replace('@nav',parseChildren(a.item.children));
      });
    }
    return parentString;
  }

  /**
   * Parses and renders the children within a parent object. Also returns the item
   * to parseParents if the value received is an object.
   * @param {object} obj
   * @returns {string}
   */
  function parseChildren(obj){
    let c,childString = '';
    if(Array.isArray(obj)){
      obj.map(function(a){
        childString+=FastUtilities.stripper(objNodeEntry,{
          '@node.entry':a.label,
          '@node.link':a.link
        });
      });
      return objNode.replace('@node',childString);
    }else{
      for(c in obj){
        childString += objNodeEntry.replace('@node.entry',obj[c])
      }
      return objNode.replace('@node',childString);
    }
  }
}