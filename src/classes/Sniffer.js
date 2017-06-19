/**
 * Created by David Maser on 19/06/2017.
 */
import {DomCleaner,DomBuilder} from '../components/DomCleaner';
import {Global} from '../config/Global';
import Errors from '../classes/Errors';

export default class Sniffer{
  constructor(args){
    this.args = args;
    this.tag = Global.node;
    this.cycle();
  }

  cycle(){
    let domNodes = [];
    $(this.tag).each(function(a){
      $(this).attr('fst-id',a);
      domNodes.push($(this).html());
    });
    domNodes.map((a,b)=>{
      let nodeType,nodeString;
      if(a.indexOf('render:') > -1){
        nodeType = DomCleaner.extract.node.type(a);
        nodeString = `<${nodeType} class="${DomCleaner.extract.class(a)}">`;
      }else{
        if(a.indexOf('template:') > -1 ){
          nodeString = DomCleaner.extract.template(a);
        }else{
          new Errors({
            origin:'Sniffer.cycle',
            type:'Missing attribute',
            message:'Unable to process this object. It has no assigned type or template',
            log:false
          });
        }
      }
      nodeString += DomCleaner.extract.content(a) !== undefined ? `${DomCleaner.extract.content(a)}</${nodeType}>` : null;
      let nodeElement = $('body').find(`[fst-id="${b}"]`);
      console.log(nodeType,DomCleaner.extract.class(a),DomCleaner.extract.content(a));
      DomBuilder.build.element(nodeElement,nodeString,DomCleaner.extract.content(a));
    })
  }
}