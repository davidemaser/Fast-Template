/**
 * Created by David Maser on 19/06/2017.
 */
import Logger from './Logger';
export default class Errors{
  constructor(args){
    this.args = args;
    this.build();
  }

  build(){
    if(typeof this.args === 'object'){
      this.args.log === true ? new Logger(this.args) : null ;
    }else{
      console.log('Can\'t execute the Warning module');
    }
  }

}