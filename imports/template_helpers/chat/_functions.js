/**
 * Functions available only within the scope of chat
 */

export const F = { };

F.scrollToBottom = () => {
  let selector = $('.chat-window');
  if (selector[0]) {
    let height = selector.prop('scrollHeight');
    selector.stop().animate({scrollTop: height});
  }
};
