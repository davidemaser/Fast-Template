/**
 * Created by David Maser on 19/06/2017.
 */
import Sniffer from './src/classes/Sniffer';
import './src/css/scss/Fast.scss';
import {Faster} from './src/components/Faster';
$(function(){
  $.when(new Sniffer()).done(Faster.exec())
});