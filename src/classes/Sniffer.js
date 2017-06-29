/**
 * Created by David Maser on 19/06/2017.
 */
import {Global} from '../config/Global';
import Cycle from './Cycle';
import InitPlugins from '../plugins/Init';

export default class Sniffer{
  constructor(args){
    this.args = args;
    this.tag = Global.node;
    this.ignore = Global.ignore;
    this.cycle();
  }

  cycle(){
    new Cycle('ft');
    new Cycle('ftx');
    new Cycle('fta');
    new InitPlugins();
  }
}