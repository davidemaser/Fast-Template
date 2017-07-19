/**
 * Created by David Maser on 19/06/2017.
 */
import {Faster} from './src/components/Faster';
import Sniffer from './src/classes/Sniffer';
import FastDom from './src/classes/FastDom';
import {Global} from './src/config/Global';
import './src/css/scss/Fast.scss';
$(function(){
  Global.appEvents === true ? new FastDom() : null;
  $.when(new Sniffer()).done(Faster.exec())
});