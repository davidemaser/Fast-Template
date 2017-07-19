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
    itsDOMLoading.listen();
    itsDOMLoading.addTrigger(Global.appEvents.root, function(node){
      console.log(node, 'was added to the page');
    });
  }
}