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
    new Cycle('ft'); //basic Faster tags
    new Cycle('ftx'); //Faster experimental tags
    new Cycle('fta'); //Faster Ajax tags
    new FastPlugin();
  }
}