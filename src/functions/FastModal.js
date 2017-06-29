/**
 * Created by David Maser on 29/06/2017.
 */
/**
 * Created by David Maser on 27/06/2017.
 */
import {Template} from '../config/Template';
import {Global} from '../config/Global';
import RegisterState from '../classes/RegisterState';
export default function FastModal(option, expression){
  let templateString = Template.modal[option].layout;
  let templatePrompt = Template.modal[option].prompt;
  let expressionArray = expression.split(',');
  let expressionObj = {};
  let e,o;
  new RegisterState('modalIsOpen',false,'modal');
  for(e in expressionArray){
    expressionObj[expressionArray[e].split(':')[0]] =  expressionArray[e].split(':')[1];
  }
  for(o in expressionObj){
    if(o === 'prompt' && expressionObj[o] !== '' && expressionObj[o] !== undefined){
      templatePrompt = templatePrompt[expressionObj[o]];
      templatePrompt = templatePrompt.replace('@modal.promptConfirm',expressionObj['promptConfirm']).replace('@modal.promptRefuse',expressionObj['promptRefuse']);
      templateString = templateString.replace('@inject.prompt',templatePrompt);
    }else{
      templateString = templateString.replace(`@modal.${o}`,expressionObj[o]);
    }
  }
  $('body').on('click','.ftx__modal__cta button,.ftx__modal__prompt button',function(){
    if(window[Global.appObj]['modal']['modalIsOpen'] === false){
      $(this).parent().parent().find('.ftx__modal').toggle();
      new RegisterState('modalIsOpen',true,'modal');
    }
  }).on('click','.ftx__modal__prompt button[ftx-user-agrees]',function(){
    if(window[Global.appObj]['modal']['modalIsOpen'] === true){
      $(this).parent().parent().parent().parent().find('.ftx__modal').toggle();
      new RegisterState('modalIsOpen',false,'modal');
      new RegisterState('userHasAccepted',true,'modal');
    }
  }).on('click','.ftx__modal__prompt button[ftx-user-refuses]',function(){
    if(window[Global.appObj]['modal']['modalIsOpen'] === true){
      $(this).parent().parent().parent().parent().find('.ftx__modal').toggle();
      new RegisterState('modalIsOpen',false,'modal');
      new RegisterState('userHasAccepted',false,'modal');
    }
  });
  return templateString;
}