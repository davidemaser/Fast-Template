/**
 * Created by David Maser on 26/07/2017.
 */
import {Global} from '../config/Global';
import Woops from '../classes/Woops';

export default function(option,expression){
  let acceptedOptions = ['language','code','custom'];
  if(acceptedOptions.indexOf(option)>-1){
    switch(option){
      case 'language':
        let languageStore = Global.rules.language;
        if(Array.isArray(languageStore)){
          languageStore.map(function(a){
            expression = expression.replace(new RegExp(a,'g'),'***');
          })
        }
        return expression;
        break;
      case 'code':
        let container = document.createElement("div");
        container.innerHTML = expression;
        return container.textContent || container.innerText || "";
        break;
    }
  }else{
    new Woops({

    })
  }
}