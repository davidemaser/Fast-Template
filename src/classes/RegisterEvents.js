/**
 * Created by David Maser on 29/06/2017.
 */
export default class RegisterEvents{
  constructor(element,event,target,fn){
    this.element = element;
    this.target = target;
    this.fn = fn;
    this.event = event;
    this.run();
  }
  run(){
    $('body').on(this.event,this.element,function(){
      $(this.target)[this.fn]();
    })
  }
}