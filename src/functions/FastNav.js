/**
 * Created by David Maser on 10/07/2017.
 */
import {Global} from '../config/Global';
import {Template} from '../config/Template';
import Woops from '../classes/Woops';
export default function FastNav(option,expression){
  option = option || 'horizontal';
  let objLayout = Template.nav.layout[option];
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
  };

  let objNodeString = objNode.replace('@node',objNodeEntry);
  let objString = objLayout.replace('@nav.node',objNodeString);

  function parseNavObj(obj){
    let itemArray = [];
    if(typeof obj === 'object'){
      let o;
      for(o in obj){
        itemArray.push(obj[o]);
      }
      parseParents(itemArray)
    }
  }
  function parseParents(obj){
    if(typeof obj === 'object') {
      obj.map(function(a){
        let navItemLabel = a.item.parent.label;
        let navItemLink = a.item.parent.link;
        console.log(objLayout.replace('@link',navItemLink).replace('@label',navItemLabel),a.item)
      })
    }
  }
  function parseChildren(obj){
    let c,childString = '';
    for(c in obj){
      childString += objNodeEntry.replace('@node.entry',obj[c])
    }
    return objNode.replace('@node',childString);
  }
}