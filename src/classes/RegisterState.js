/*
 * Created by David Maser on 29/06/2017.
 */
import {Global} from '../config/Global';
export default class RegisterState{
  /**
   * This class registers states and state changes and a global object
   * Type __faster__ (or the name of the app defined in config/Global)
   * in console to view the object and it's properties
   * @param {string} obj
   * @param {string} val
   * @param {string=} parent
   */
  constructor(obj,val,parent){
    this.obj = obj;
    this.val = val;
    this.parent = parent;
    this.run();
  }
  run(){
    typeof window[Global.appObj] !== 'object' ? window[Global.appObj] = {} : null;
    if(this.parent !== '' && this.parent !== undefined){
      if(typeof window[Global.appObj][this.parent] === 'object'){
        window[Global.appObj][this.parent][this.obj] = this.val;
      }else{
        window[Global.appObj][this.parent] = {};
        window[Global.appObj][this.parent][this.obj] = this.val;
      }
    }else{
      window[Global.appObj][this.obj] = this.val;
    }
  }
}