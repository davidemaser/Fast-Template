/**
 * Created by David Maser on 19/06/2017.
 */
import Logger from './Logger';
import RegisterState from '../classes/RegisterState';
export default class Woops{
  constructor(args){
    this.args = args;
    this.build();
  }

  build(){
    try {
      if (typeof this.args === 'object') {
        this.args.log === true ? new Logger(this.args) : null;
        new RegisterState(this.args.origin, this.args.error, 'appErrors');
      } else {
        console.log('Can\'t execute the Warning module');
      }
    }catch(e){
      console.log('Error module threw an error. Ironic isn\'t it');
    }
  }

}