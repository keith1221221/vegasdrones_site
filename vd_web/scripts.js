
// Initialize AOS with error handling
if (typeof AOS !== 'undefined') {
  AOS.init({ duration: 1000, once: true, disable: 'mobile' });
} else {
  console.error('AOS library failed to load');
}

document.addEventListener('DOMContentLoaded', function() {
  // Log elements for debugging
  console.log('Script loaded. Elements:', {
    launcher: document.getElementById('chat-launcher'),
    iframeContainer: document.getElementById('chat-iframe-container'),
    chatClose: document.getElementById('chat-close'),
    chatFallback: document.getElementById('chat-fallback'),
    alienVideo: document.getElementById('alien-video'),
    chatBubble: document.querySelector('.chat-bubble'),
    launcherWrapper: document.querySelector('.chat-launcher-wrapper')
  });
  console.log('Chat iframe container styles:', {
    background: document.getElementById('chat-iframe-container')?.style.background || 'not found',
    top: document.getElementById('chat-iframe-container')?.style.top || 'not found'
  });

  const launcher = document.getElementById('chat-launcher');
  const iframeContainer = document.getElementById('chat-iframe-container');
  const chatClose = document.getElementById('chat-close');
  const alienVideo = document.getElementById('alien-video');
  const chatBubble = document.querySelector('.chat-bubble');

  // Check video source accessibility
  if (alienVideo) {
    console.log('Video source:', alienVideo.src);
    alienVideo.pause();
    alienVideo.currentTime = 0;
  } else {
    console.error('Video element not found');
  }

  // Function to play video and pause for 10 seconds before replay
  function playVideoWithPause() {
    if (alienVideo && alienVideo.paused) {
      console.log('Playing alien video');
      alienVideo.play().catch(error => console.error('Video play failed:', error));
    } else if (alienVideo) {
      console.log('Video already playing, skipping play call');
    }
  }

  // Handle video end to pause for 10 seconds before replay
  if (alienVideo) {
    alienVideo.addEventListener('ended', function() {
      console.log('Video ended, pausing for 20 seconds');
      alienVideo.pause();
      alienVideo.currentTime = 0;
      setTimeout(() => {
        console.log('Resuming video after 20-second pause');
        alienVideo.play().catch(error => console.error('Video play failed:', error));
      }, 10000);
    });
  }

  // Play video 3 seconds after page load
  if (alienVideo) {
    setTimeout(() => {
      console.log('Playing alien video after 3 seconds');
      playVideoWithPause();
    }, 3000);
  }

  // Listen for postMessage from iframe
  window.addEventListener('message', function(event) {
    console.log('Received postMessage:', event.data);
    if (alienVideo) {
      if (event.data === 'responding') {
        console.log('Chatbot responding, playing video');
        playVideoWithPause();
      } else if (event.data === 'idle') {
        console.log('Chatbot idle, pausing video');
        alienVideo.pause();
        alienVideo.currentTime = 0;
      }
    } else {
      console.error('Video element not found for postMessage handling');
    }
  });

  // Toggle chatbot visibility and play video when opening
  function toggleChat() {
    if (iframeContainer) {
      console.log('toggleChat called. Current display:', iframeContainer.style.display);
      const isOpening = iframeContainer.style.display !== 'block';
      iframeContainer.style.display = isOpening ? 'block' : 'none';
      if (isOpening) {
        playVideoWithPause();
      }
    } else {
      console.error('Iframe container not found');
    }
  }

  // Open chatbot and play video on launcher click
  if (launcher) {
    launcher.addEventListener('click', function() {
      console.log('Chat launcher clicked');
      toggleChat();
    });
  } else {
    console.error('Chat launcher not found');
  }

  // Open chatbot and play video on chat bubble click
  if (chatBubble) {
    chatBubble.addEventListener('click', function() {
      console.log('Chat bubble clicked');
      toggleChat();
    });
  } else {
    console.error('Chat bubble not found');
  }

  // Close chatbot
  if (chatClose) {
    chatClose.addEventListener('click', function() {
      console.log('Chat close clicked');
      if (iframeContainer) {
        iframeContainer.style.display = 'none';
      }
      if (alienVideo) {
        alienVideo.pause();
        alienVideo.currentTime = 0;
      } else {
        console.error('Video element not found on close');
      }
    });
  } else {
    console.error('Chat close button not found');
  }

  // Expose toggleChat for "Get Quote" links
  window.openChat = toggleChat;
});