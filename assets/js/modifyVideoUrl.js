// Function to modify video URLs to prevent autoplay
function modifyVideoUrl(url) {
  if (!url) return url;
  
  // For YouTube URLs
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    // Remove any existing autoplay parameter
    url = url.replace(/(\?|&)autoplay=1/g, '');
    
    // Add autoplay=0 parameter
    if (url.includes('?')) {
      url += '&autoplay=0&mute=0';
    } else {
      url += '?autoplay=0&mute=0';
    }
  }
  
  // For Vimeo URLs
  if (url.includes('vimeo.com')) {
    // Remove any existing autoplay parameter
    url = url.replace(/(\?|&)autoplay=1/g, '');
    
    // Add autoplay=0 parameter
    if (url.includes('?')) {
      url += '&autoplay=0';
    } else {
      url += '?autoplay=0';
    }
  }
  
  return url;
}
