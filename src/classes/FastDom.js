/**
 * Created by David Maser on 19/07/2017.
 */
import itsDOMLoading from '../components/DomManager';
export default class FastDom{
  constructor(){
    this.run();
  }
  run(){
    itsDOMLoading.listen();
    itsDOMLoading.addTrigger("*[ftx-render]", function(node){
      console.log(node, 'was added to the page');
    });
  }
}