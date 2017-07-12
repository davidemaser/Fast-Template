/**
 * Created by David Maser on 19/06/2017.
 */
import {Log} from '../config/Global';
const logView = Symbol('local');
export default class Logger{
  constructor(args){
    this.args = args;
    this.write();
  }

  write(){
    if(typeof this.args === 'object'){
      Log.push(this.args);
    }
  }
}