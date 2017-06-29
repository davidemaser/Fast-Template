/**
 * Created by David Maser on 29/06/2017.
 */
import {Global} from '../config/Global';
export default class RegisterState{
  /**
   *
   * @param {string} obj
   * @param {(boolean|object)} val
   * @param {string} parent
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