/**
 * Created by David Maser on 24/07/2017.
 */
import {Template} from '../config/Template';
export default function(option,expression) {
  let builder = {
    make:function(arg){
      let argsArray = arg.split(' ');
      let containerString = '<@cont></@cont>';
      let styleString = ' style="@element:@value"';
      argsArray.map(function(a){
        let containerIndex = Template.instruct.containers.indexOf(a);
        let keyIndex = Template.instruct.keys.indexOf(a);
        if(containerIndex>-1){
          containerString = containerString.replace(/@cont/g,a);
          argsArray.splice(containerIndex,1);
        }
        if(keyIndex>-1){
          styleString = styleString.replace('@element',a);
          argsArray.splice(keyIndex,1);
        }
       });
      argsArray = argsArray.filter(function(n){ return n !== undefined });
      console.log(argsArray,containerString,styleString);
    }
  };
  let stepArray = expression.split(' ');
  let buildOption;
  let optionString = '';
  stepArray.map(function(a){
    let eventIndex = Template.instruct.events.indexOf(a);
    if(eventIndex>-1){
      buildOption = a;
    }else{
      optionString += `${a} `;
    }
  });
  if(typeof builder[buildOption] === 'function') {
    builder[buildOption](optionString);
  }
}