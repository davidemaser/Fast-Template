/**
 * Created by David Maser on 19/06/2017.
 */
import Sniffer from './src/classes/Sniffer';
import GetAjax from './src/classes/GetAjax';
import './src/css/scss/Fast.scss';
$(function(){
  new Sniffer();
  new GetAjax('demo.json');
});