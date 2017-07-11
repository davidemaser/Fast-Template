/**
 * Created by David Maser on 10/07/2017.
 */
import {Template} from '../config/Template';
import Woops from '../classes/Woops';
export default function FastNav(option,expression){
  option = option || 'horizontal';
  let objLayout = Template.nav.layout[option];
  let objNode = Template.nav.node.layout;
  let objNodeEntry = Template.nav.node.entry;
  if(expression.indexOf('json:')>-1){
    let jsonPath = expression.split('json:')[1];
    getRemoteJson(jsonPath);
  }else{
    getLocalJson();
  }
  getRemoteJson=(url)=>{
    $.ajax({
      url:url,
      success:function(data){

      },
      error:function(){
        new Woops({

        })
      }
    })
  };
  getLocalJson=()=>{
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

  function parseChildren(obj){
    let c,childString = '';
    for(c in obj){
      childString += objNodeEntry.replace('@node.entry',obj[c])
    }
    return objNode.replace('@node',childString);
  }
}