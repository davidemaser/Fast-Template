/**
 * Created by David Maser on 14/07/2017.
 */
export default function FastSticky(option,expression) {
  let domItem = $('<div/>').html(expression).contents();
  option === 'top' ? stickToTop() : stickToBottom();
  function stickToTop(){
    domItem.addClass('ftx__sticky top');
    $('body').prepend(domItem);
  }
  function stickToBottom(){
    domItem.addClass('ftx__sticky bottom');
    $('body').prepend(domItem);
  }
  let $header = $("header");
  let $clone = $header.before($header.clone().addClass("clone"));
  $(window).on("scroll", function() {
    let fromTop = $("body").scrollTop();
    $('body').toggleClass("down", (fromTop > 200));
  });
}
