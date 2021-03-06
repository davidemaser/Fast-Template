/*
 * Created by David Maser on 19/06/2017.
 */
import Logger from './Logger';
import RegisterState from '../classes/RegisterState';
export default class Woops{
  /**
   * Woops is the error handler inside Faster's ecosystem. It receives
   * an object from the caller and appends it to the appErrors object
   * that resides with the core object root.
   * @param args
   * @constructor
   */
  constructor(args){
    this.args = args;
    this.build();
  }

  build(){
    try {
      if (typeof this.args === 'object') {
        this.args.log === true ? new Logger(this.args) : null;
        new RegisterState(this.args.origin, this.args.message, 'appErrors');
        console.warn(this.args.origin,this.args.type,this.args.message)
      } else {
        console.log('Can\'t execute the Warning module');
      }
    }catch(e){
      console.log('Error module threw an error. Ironic isn\'t it');
    }
  }
}