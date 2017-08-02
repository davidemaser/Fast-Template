/*
 * Created by David Maser on 04/07/2017.
 */
import Woops from '../classes/Woops';
import {FastHtmlFunctions} from '../functions/FastHtmlFunctions';
import {Global} from '../config/Global';
export default class FastHtmlEvents{
  constructor(obj,origin){
    this.obj = obj;
    this.origin = origin;
    this.root = window;
    this.level = Global.appRoot;
    this.run();
  }
  run(){
    if(this.origin.indexOf('id=')>-1) {
      let objElement = this.origin.split('id=')[1];
      objElement = objElement.indexOf(',') > -1 ? objElement.split(',')[0] : objElement;
      let objDefine = this.obj.split('=')[1];
      let objEvent = objDefine.split('(')[0];
      let objFunction = objDefine.split('(')[1].split(')')[0];
      this.bind(objEvent,objElement, objFunction);
    }else{
      new Woops({
        origin:'FastHtmlEvents.run',
        type:'ID Not Defined',
        message:'Object needs to have an assigned ID in order for events to be bound to it',
        log:false
      })
    }
  }
  bind(ev,elem,fn){
    $(this.level).on(ev,`#${elem}`,()=>{
      FastHtmlFunctions[fn](elem);
    })
  }
}