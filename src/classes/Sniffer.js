/**
 * Created by David Maser on 19/06/2017.
 */
import {Faster,Architect} from '../components/Faster';
import {Global} from '../config/Global';
import Woops from './Woops';

export default class Sniffer{
  constructor(args){
    this.args = args;
    this.tag = Global.node;
    this.ignore = Global.ignore;
    this.cycle();
  }

  cycle(){
    let domNodes = [];
    $(`${this.tag}:not([${this.ignore}])`).each(function(a){
      $(this).attr('fst-id',a);
      domNodes.push($(this).html());
    });
    domNodes.map((a,b)=>{
      let nodeType,nodeString;
      if(a.indexOf('render:') > -1){
        nodeType = Faster.extract.node.type(a);
        nodeString = `<${nodeType} class="${Faster.extract.class(a)}">`;
      }else{
        if(a.indexOf('template:') > -1 ){
          nodeString = Faster.extract.template(a);
        }else{
          new Woops({
            origin:'Sniffer.cycle',
            type:'Missing attribute',
            message:'Unable to process this object. It has no assigned type or template',
            log:false
          });
        }
      }
      nodeString = Faster.parse.noLineBreaks(nodeString);
      nodeString += Faster.extract.content(a) !== undefined ? `${Faster.extract.content(a)}</${nodeType}>` : null;
      let nodeElement = $('body').find(`[fst-id="${b}"]`);
      console.log(nodeType,Faster.extract.class(a),Faster.extract.content(a),Faster.extract.json(a,null,true));
      $.when(Architect.build.element(nodeElement,nodeString,Faster.extract.content(a))).then(()=>{
        Faster.exec();
      })
    })
  }
}