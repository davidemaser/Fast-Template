/**
 * Created by David Maser on 29/06/2017.
 */
export default class RegisterEvents{
  constructor(element,event,target,fn,speed){
    this.element = element;
    this.target = target;
    this.fn = fn;
    this.event = event;
    this.speed = speed || 500;
    this.parent = 'body';
    this.run();
  }
  run(){
    switch(this.fn){
      case 't':
        $(this.parent).on(this.event,this.element,function(){
          $(this.target).toggle(this.speed);
        });
        break;
      case 'st':
        $(this.parent).on(this.event,this.element,function(){
          $(this.target).slideToggle(this.speed);
        });
    }
  }
}