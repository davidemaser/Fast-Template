/**
 * Created by David Maser on 19/07/2017.
 */
import itsDOMLoading from '../components/DomManager';
import {Global} from '../config/Global';
export default class FastDom{
  constructor(){
    this.run();
  }
  run(){
    window.setInterval(function(){
      itsDOMLoading.addTrigger(Global.appEvents.root, function(node){
        console.log(node, 'added to the page');
      });
      itsDOMLoading.listen();
    },5000);
  }
}