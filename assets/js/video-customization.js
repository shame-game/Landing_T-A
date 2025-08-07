// Video player customization to prevent autoplay
document.addEventListener('DOMContentLoaded', function() {
  // Override Magnific Popup settings for YouTube videos
  if ($.magnificPopup) {
    // Store the original open method
    const originalOpen = $.magnificPopup.instance.open;
    
    // Override the open method
    $.magnificPopup.instance.open = function() {
      // Call the original method
      originalOpen.apply(this, arguments);
      
      // After popup is opened, modify any video iframes to remove autoplay
      if (this.currItem && this.currItem.type === 'iframe') {
        const iframe = this.content.find('iframe');
        if (iframe.length) {
          // Get current src
          let src = iframe.attr('src');
          
          // Remove autoplay parameter if it exists and add autoplay=0
          if (src && src.indexOf('youtube.com') > -1) {
            src = src.replace('autoplay=1', 'autoplay=0');
            // If there was no autoplay parameter, add it
            if (src.indexOf('autoplay=0') === -1) {
              src += (src.indexOf('?') > -1 ? '&' : '?') + 'autoplay=0';
            }
            iframe.attr('src', src);
          }
          
          // Do the same for Vimeo
          if (src && src.indexOf('vimeo.com') > -1) {
            src = src.replace('autoplay=1', 'autoplay=0');
            if (src.indexOf('autoplay=0') === -1) {
              src += (src.indexOf('?') > -1 ? '&' : '?') + 'autoplay=0';
            }
            iframe.attr('src', src);
          }
        }
      }
    };
  }
  
  // Ensure any direct video links use the no-autoplay parameter
  $('a.video-popup, a.play').each(function() {
    let href = $(this).attr('href');
    if (href && href.indexOf('youtube.com') > -1) {
      href = href.replace('autoplay=1', 'autoplay=0');
      if (href.indexOf('autoplay=0') === -1) {
        href += (href.indexOf('?') > -1 ? '&' : '?') + 'autoplay=0';
      }
      $(this).attr('href', href);
    }
  });
});
