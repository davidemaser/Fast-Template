/**
 * Created by David Maser on 21/06/2017.
 */
import {Faster,Architect} from '../components/Faster';
import {Global} from '../config/Global';
import FastProcessor from '../functions/FastProcessor';
import Woops from './Woops';
import RegisterState from './RegisterState';
export default class FastCycle{
  constructor(type){
    this.type = type;
    this.tag = Global.node;
    this.xTag = Global.experiment.node;
    this.xjTag = Global.ajax.node;
    this.nested = Global.experiment.nested;
    this.ignore = Global.ignore;
    this.run();
  }
  run(){
    new RegisterState('app','cycling');
    switch (this.type){
      case 'ftx':
        let ftxNodes = [];
        $(`${this.xTag}:not([${this.ignore}]):not([${this.nested}])`).each(function(a){
          $(this).attr('fstx-id',a);
          $(this).html() !== '' && $(this).html() !== undefined && $(this).html() !== null ? ftxNodes.push($(this).html()) : $(this).remove();
        });
        ftxNodes.map((a,b)=>{
          let xType,xOption=null,bounds,xStatement;
          if(a.indexOf(':') > -1){
            xType = a.split(':')[0].replace('{','');
            xOption = a.split(':')[1].split('}')[0];
            bounds = [`{${xType}:${xOption}}`,`{~${xType}}`];
            xStatement = a.split(bounds[0])[1].split(bounds[1])[0];
          }else{
            xType = a.split('{')[1].split('}')[0];
            bounds = [`{${xType}}`,`{~${xType}}`];
            xStatement = a.split(bounds[0])[1].split(bounds[1])[0];
          }
          let ftxNodeElement = $('body').find(`[fstx-id="${b}"]`);
          $.when(FastProcessor(xType,xOption,xStatement,b)).then((a)=>{
            Global.options.noWrapperElements.indexOf(xType) > -1 ? Architect.build.experiment(ftxNodeElement,null,a) : Architect.build.experiment(ftxNodeElement,Global.experiment.render,a);
          });
        });
        break;
      case 'fta':
        let ftxjNodes = [];
        $(`${this.xjTag}:not([${this.ignore}]):not([${this.nested}])`).each(function(a){
          $(this).attr('fstxj-id',a);
          $(this).html() !== '' && $(this).html() !== undefined && $(this).html() !== null ? ftxjNodes.push($(this).html()) : $(this).remove();
        });
        ftxjNodes.map((a,b)=>{
          let xType,xOption=null,bounds,xStatement;
          if(a.indexOf(':') > -1){
            xType = a.split(':')[0].replace('{','');
            xOption = a.split(':')[1].split('}')[0];
            bounds = [`{${xType}:${xOption}}`,`{~${xType}}`];
            xStatement = a.split(bounds[0])[1].split(bounds[1])[0];
          }else{
            xType = a.split('{')[1].split('}')[0];
            bounds = [`{${xType}}`,`{~${xType}}`];
            xStatement = a.split(bounds[0])[1].split(bounds[1])[0];
          }
          let ftxjNodeElement = $('body').find(`[fstxj-id="${b}"]`);
          FastProcessor(xType,xOption,xStatement,b);
        });
        break;
    }
  }
}