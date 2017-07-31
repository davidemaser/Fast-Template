/**
 * Created by David Maser on 19/06/2017.
 */
import {Faster} from './src/components/Faster';
import FastSniffer from './src/classes/FastSniffer';
import FastDom from './src/classes/FastDom';
import {Global} from './src/config/Global';
//import xtag from 'x-tag';
import './src/css/scss/Fast.scss';
$(function(){
  Global.appEvents.enable === true ? new FastDom() : null; //turn on mutation observers for all ftx-render objects
  $.when(new FastSniffer()).done(Faster.exec())
});