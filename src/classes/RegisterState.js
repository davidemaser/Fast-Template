/**
 * Created by David Maser on 29/06/2017.
 */
import {Global} from '../config/Global';
export default class RegisterState{
  /**
   *
   * @param {string} obj
   * @param {boolean} val
   * @param {boolean} isData
   */
  constructor(obj,val,isData){
    this.obj = obj;
    this.val = val;
    this.isData = isData;
    this.run();
  }
  run(){
    typeof window[Global.appObj] !== 'object' ? window[Global.appObj] = {} : null;
    if(this.isData === true){
      if(typeof window[Global.appObj].appData === 'object'){
        window[Global.appObj]['appData'][this.obj] = this.val;
      }else{
        window[Global.appObj].appData = {};
        window[Global.appObj]['appData'][this.obj] = this.val;
      }
    }else{
      window[Global.appObj][this.obj] = this.val;
    }
  }
}