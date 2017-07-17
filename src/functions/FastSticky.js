/**
 * Created by David Maser on 14/07/2017.
 */
import {Global} from '../config/Global';
export default function FastSticky(option,expression) {
  let domItem = $('<div/>').html(expression).contents();
  option === 'top' ? stickToTop() : stickToBottom();
  function stickToTop(){
    domItem.addClass('ftx__sticky top');
    $(Global.appRoot).prepend(domItem);
  }
  function stickToBottom(){
    domItem.addClass('ftx__sticky bottom');
    $(Global.appRoot).prepend(domItem);
  }
  let header = $('header');
  let clone = header.before(header.clone().addClass('clone'));
  $(window).on('scroll', function() {
    let fromTop = $(Global.appRoot).scrollTop();
    $(Global.appRoot).toggleClass('down', (fromTop > 200));
  });
}
