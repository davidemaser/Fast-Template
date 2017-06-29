/**
 * Created by David Maser on 29/06/2017.
 */
/**
 * Created by David Maser on 27/06/2017.
 */
import {Template} from '../config/Template';
import RegisterObject from '../classes/RegisterObject';
export default function FastModal(option, expression){
  let templateString = Template.modal[option].layout;
  let expressionArray = expression.split(',');
  let expressionObj = {};
  let e;
  let o;
  new RegisterObject('modalIsOpen',false);
  for(e in expressionArray){
    expressionObj[expressionArray[e].split(':')[0]] =  expressionArray[e].split(':')[1];
  }
  for(o in expressionObj){
    templateString = templateString.replace(`@modal.${o}`,expressionObj[o]);
  }
  $('body').on('click','.ftx__modal__cta button,.ftx__modal__prompt button',function(){
    if(window.fast['modalIsOpen'] === false){
      $(this).parent().parent().find('.ftx__modal').toggle();
      new RegisterObject('modalIsOpen',true);
    }
  }).on('click','.ftx__modal__prompt button',function(){
    if(window.fast['modalIsOpen'] === true){
      $(this).parent().parent().parent().parent().find('.ftx__modal').toggle();
      new RegisterObject('modalIsOpen',false);
      new RegisterObject('userHasAccepted',true);
    }
  });
  return templateString;
}