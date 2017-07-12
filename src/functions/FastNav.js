/**
 * Created by David Maser on 10/07/2017.
 */
import {Global} from '../config/Global';
import {Template} from '../config/Template';
import {Architect} from '../components/Faster';
import Woops from '../classes/Woops';
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
  function getRemoteJson(url){
    $.ajax({
      url:url,
      success:function(data){
        parseNavObj(data);
      },
      error:function(){
        new Woops({

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
    Architect.build.experiment($('body').find(`[fstx-id="${element}"]`),null,objLayout.replace('@nav.node',objForm));
    //return objLayout.replace('@nav.node',objForm);
  }
  function parseParents(obj){
    let parentString = '';
    let parentTag;
    if(typeof obj === 'object') {
      obj.map(function(a){
        parentTag = objParentTag.replace('@link',a.item.parent.link).replace('@label',a.item.parent.label);
        parentString += parentTag.replace('@nav',parseChildren(a.item.children));
      });
    }
    return parentString;
  }
  function parseChildren(obj){
    let c,childString = '';
    if(Array.isArray(obj)){
      obj.map(function(a){
        childString+=objNodeEntry.replace('@node.entry',a.label).replace('@node.link',a.link);
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