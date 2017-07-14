/**
 * Created by David Maser on 19/06/2017.
 */
import {Global} from '../config/Global';
import Cycle from './Cycle';
import FastPlugin from '../plugins/FastPlugin';
export default class Sniffer{
  constructor(args){
    this.args = args;
    this.tag = Global.node;
    this.ignore = Global.ignore;
    this.cycle();
  }

  cycle(){
    let order = Global.cycleOrder;
    if(Array.isArray(order)){
      order.map(function(tag){
        new Cycle(tag);
      });
    }
    new FastPlugin();
  }
}