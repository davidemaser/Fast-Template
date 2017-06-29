/**
 * Created by David Maser on 29/06/2017.
 */
export default class RegisterObject{
  constructor(obj,val){
    this.obj = obj;
    this.val = val;
    this.run();
  }
  run(){
    typeof window['fast'] !== 'object' ? window['fast'] = {} : null;
    window.fast[this.obj] = this.val;
  }
}