// Chat Bot Functionality
document.addEventListener('DOMContentLoaded', function() {
  // API config for chat bot
  const API_URL = "https://agent.s4h.edu.vn/api/chat";
  const API_HEADERS = {
    "Content-Type": "application/json",
    "X-API-Key": "1bd171e758ee9c6ff2d94eb91a31c9866f153b5661ff80ee"
  };
  const AGENT_ID = "54da9ab0-6cb2-413b-8861-7f84efe68e8e";
  
  // Conversation history with initial welcome message
  let conversationHistory = [
    {
      role: "assistant",
      content: "**Xin chào!** T&A Lab có thể giúp gì cho bạn?"
    }
  ];

  // Add chat bot HTML to the page
  const chatBotHTML = `
    <div class="chat-bot-container">
      <div class="chat-bot-button">
        <i class="lni lni-comments"></i>
      </div>
      <div class="chat-bot-window">
        <div class="chat-bot-header">
          <h4><strong>CHAT VỚI T&A LAB</strong></h4>
          <div class="chat-bot-close">×</div>
        </div>
        <div class="chat-bot-messages">
          <div class="chat-message bot-message"></div>
        </div>
        <div class="chat-bot-input">
          <input type="text" placeholder="Nhập tin nhắn của bạn..." />
          <button>
            <i class="lni lni-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Append the chat bot HTML to the body
  document.body.insertAdjacentHTML('beforeend', chatBotHTML);
  
  // Get DOM elements
  const chatBotButton = document.querySelector('.chat-bot-button');
  const chatBotWindow = document.querySelector('.chat-bot-window');
  const chatBotClose = document.querySelector('.chat-bot-close');
  const chatBotMessages = document.querySelector('.chat-bot-messages');
  const chatBotInput = document.querySelector('.chat-bot-input input');
  const chatBotSendButton = document.querySelector('.chat-bot-input button');
  
  // Initial bot message animation delay
  setTimeout(() => {
    const initialMessage = chatBotMessages.querySelector('.bot-message');
    initialMessage.style.opacity = '1';
    
    // Add the welcome message with typing animation
    const welcomeMessage = "**Xin chào!** T&A Lab có thể giúp gì cho bạn?";
    const formattedMessage = formatMessage(welcomeMessage);
    
    // Create temporary container for HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = formattedMessage;
    
    // Extract the text and tags
    const contentParts = extractContentParts(tempDiv);
    
    // Start typing the welcome message
    typeMessage(initialMessage, contentParts, 0);
  }, 500);
  
  // Toggle chat window with smooth animation
  chatBotButton.addEventListener('click', () => {
    chatBotWindow.classList.toggle('active');
    if (chatBotWindow.classList.contains('active')) {
      chatBotInput.focus();
      
      // Update icon to show active state
      setTimeout(() => {
        chatBotButton.querySelector('i').className = chatBotWindow.classList.contains('active') 
          ? 'lni lni-close' 
          : 'lni lni-comments';
      }, 100);
    } else {
      // Change back icon when closing
      setTimeout(() => {
        chatBotButton.querySelector('i').className = 'lni lni-comments';
      }, 300);
    }
  });
  
  // Close chat window with smooth animation
  chatBotClose.addEventListener('click', (e) => {
    e.stopPropagation();
    chatBotWindow.classList.remove('active');
    
    // Change back icon when closing
    setTimeout(() => {
      chatBotButton.querySelector('i').className = 'lni lni-comments';
    }, 300);
  });
  
  // Create typing indicator element
  function showTypingIndicator() {
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator');
    typingIndicator.innerHTML = '<div class="typing-bubble"><span></span><span></span><span></span></div>';
    chatBotMessages.appendChild(typingIndicator);
    chatBotMessages.scrollTop = chatBotMessages.scrollHeight;
    return typingIndicator;
  }
  
  // Remove typing indicator
  function hideTypingIndicator(indicator) {
    if (indicator && indicator.parentNode) {
      indicator.parentNode.removeChild(indicator);
    }
  }
  
  // Send message function with enhanced animations
  function sendMessage() {
    const message = chatBotInput.value.trim();
    if (message === '') return;
    
    // Add user message with animation
    addMessage(message, 'user');
    chatBotInput.value = '';
    chatBotInput.focus();
    
    // Add user message to conversation history
    conversationHistory.push({
      role: "user",
      content: message
    });
    
    // Show typing indicator before bot responds
    const typingIndicator = showTypingIndicator();
    
    // Call API for bot response
    getBotResponse()
      .then(botResponse => {
        // Hide typing indicator
        hideTypingIndicator(typingIndicator);
        
        // Add bot response to UI with animation
        setTimeout(() => {
          addMessage(botResponse, 'bot');
        }, 300);
        
        // Add bot response to conversation history
        conversationHistory.push({
          role: "assistant",
          content: botResponse
        });
      })
      .catch(error => {
        console.error('Error getting bot response:', error);
        hideTypingIndicator(typingIndicator);
        
        // Show error message
        setTimeout(() => {
          addMessage("⚠️ **Xin lỗi, có lỗi xảy ra.** Vui lòng thử lại sau.", 'bot');
        }, 300);
      });
  }
  
  // Get a response from the API
  async function getBotResponse() {
    try {
      const payload = {
        agent_id: AGENT_ID,
        message: conversationHistory
      };
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      // Extract response from API
      if (data.success && data.message && data.message.length > 0 && 
          data.message[0].role === "assistant") {
        return data.message[0].content;
      } else {
        // Fallback if API response format is unexpected
        const lastUserMessage = conversationHistory.findLast(msg => msg.role === "user")?.content || "";
        return getFallbackResponse(lastUserMessage);
      }
    } catch (error) {
      console.error('API Error:', error);
      // Use fallback responses if API fails
      const lastUserMessage = conversationHistory.findLast(msg => msg.role === "user")?.content || "";
      return getFallbackResponse(lastUserMessage);
    }
  }
  
  // Function to handle network errors and maintain conversation
  function handleNetworkError() {
    // Check if the user is online
    if (!navigator.onLine) {
      addMessage("❌ **Bạn đang offline.** Vui lòng kiểm tra kết nối mạng của bạn và thử lại.", 'bot');
      return;
    }
    
    // Add a network error message
    addMessage("⚠️ **Đang gặp khó khăn khi kết nối với máy chủ.** Đang sử dụng phản hồi tự động.", 'bot');
    
    // We'll continue with fallback responses
    console.log("Using fallback responses due to network issues");
  }
  
  // Fallback responses if API fails
  function getFallbackResponse(message) {
    message = message.toLowerCase();
    
    if (message.includes('xin chào') || message.includes('chào') || message.includes('hello') || message.includes('hi')) {
      return "👋 **Xin chào!** Rất vui được gặp bạn. Tôi có thể giúp gì cho bạn hôm nay?";
    }
    else if (message.includes('tạm biệt') || message.includes('bye')) {
      return "👋 **Tạm biệt!** Chúc bạn một ngày tốt lành. Hẹn gặp lại!";
    }
    else if (message.includes('là gì') || message.includes('là ai') || message.includes('giới thiệu')) {
      return "🔍 **T&A Lab** là một tổ chức nghiên cứu và phát triển công nghệ, chúng tôi tập trung vào các giải pháp sáng tạo và đổi mới.\n\nBạn muốn tìm hiểu thêm về chúng tôi?";
    }
    else {
      const generalResponses = [
        "🙏 **Cảm ơn bạn đã liên hệ**. Chúng tôi sẽ phản hồi lại sớm nhất có thể!",
        "🤔 **Đây là một câu hỏi thú vị!** Vui lòng đợi trong giây lát.",
        "✅ **Tôi hiểu rồi**. Đang xử lý yêu cầu của bạn.",
        "👨‍💻 **T&A Lab cảm ơn bạn đã quan tâm**. Chúng tôi sẽ ghi nhận và phản hồi lại sớm!"
      ];
      return generalResponses[Math.floor(Math.random() * generalResponses.length)];
    }
  }
  
  // Add a message to the chat with animation effect
  function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    messageElement.classList.add(sender + '-message');
    
    // Format the message with Markdown-like syntax
    const formattedMessage = formatMessage(message);
    
    // For user messages, show immediately
    if (sender === 'user') {
      messageElement.innerHTML = formattedMessage;
      chatBotMessages.appendChild(messageElement);
      
      // Force reflow for animation to work properly
      void messageElement.offsetWidth;
      
      // Scroll to bottom smoothly before animation starts
      chatBotMessages.scrollTop = chatBotMessages.scrollHeight;
      
      // Add animation after a tiny delay to ensure DOM is updated
      setTimeout(() => {
        messageElement.style.opacity = '1';
      }, 10);
      
      // Make links clickable
      const links = messageElement.querySelectorAll('a');
      links.forEach(link => {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      });
    } 
    // For bot messages, show typing effect
    else {
      // Create temporary container for HTML content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = formattedMessage;
      
      // Extract the text and tags to preserve formatting
      const contentParts = extractContentParts(tempDiv);
      
      // Create an empty container initially
      messageElement.innerHTML = '';
      chatBotMessages.appendChild(messageElement);
      
      // Force reflow and make element visible for typing effect
      void messageElement.offsetWidth;
      messageElement.style.opacity = '1';
      
      // Scroll to bottom
      chatBotMessages.scrollTop = chatBotMessages.scrollHeight;
      
      // Start typing effect
      typeMessage(messageElement, contentParts, 0);
    }
  }
  
  // Extract text and HTML tags to preserve formatting during typing animation
  function extractContentParts(element) {
    const parts = [];
    
    function processNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        // For text nodes, split into characters
        const text = node.textContent;
        if (text.trim()) {
          parts.push({ type: 'text', content: text });
        }
      } 
      else if (node.nodeType === Node.ELEMENT_NODE) {
        // For HTML elements, preserve them entirely
        parts.push({ type: 'element', content: node.outerHTML });
      }
      
      // Process child nodes
      if (node.childNodes && node.childNodes.length > 0) {
        Array.from(node.childNodes).forEach(child => {
          if (node.nodeType === Node.ELEMENT_NODE && 
              (node.tagName === 'STRONG' || node.tagName === 'EM' || 
               node.tagName === 'A' || node.tagName === 'DIV')) {
            // Skip processing inside these elements as we handle them as whole elements
          } else {
            processNode(child);
          }
        });
      }
    }
    
    Array.from(element.childNodes).forEach(processNode);
    return parts;
  }
  
  // Type message character by character with proper speed
  function typeMessage(element, parts, index) {
    if (index >= parts.length) {
      // Add class when typing is done to remove the cursor
      element.classList.add('typing-done');
      
      // Make links clickable when typing is done
      const links = element.querySelectorAll('a');
      links.forEach(link => {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      });
      return;
    }
    
    const part = parts[index];
    
    if (part.type === 'element') {
      // Add HTML elements all at once
      element.innerHTML += part.content;
      setTimeout(() => typeMessage(element, parts, index + 1), 30);
    } 
    else if (part.type === 'text') {
      // Type text character by character
      let charIndex = 0;
      const text = part.content;
      
      function typeChar() {
        if (charIndex < text.length) {
          element.innerHTML += text.charAt(charIndex);
          charIndex++;
          
          // Scroll to bottom as we type
          chatBotMessages.scrollTop = chatBotMessages.scrollHeight;
          
          // Randomize typing speed slightly for natural effect
          const delay = Math.floor(Math.random() * 20) + 15; 
          setTimeout(typeChar, delay);
        } else {
          // Move to next part when done with this text
          setTimeout(() => typeMessage(element, parts, index + 1), 30);
        }
      }
      
      typeChar();
    }
  }
  
  // Format message with Markdown-like syntax
  function formatMessage(text) {
    if (!text) return '';
    
    // Convert URLs to clickable links
    text = text.replace(
      /(https?:\/\/[^\s]+)/g, 
      '<a href="$1" class="chat-link">$1</a>'
    );
    
    // Bold text with **text**
    text = text.replace(
      /\*\*(.*?)\*\*/g, 
      '<strong>$1</strong>'
    );
    
    // Italic text with *text*
    text = text.replace(
      /\*(.*?)\*/g, 
      '<em>$1</em>'
    );
    
    // Bullet points
    text = text.replace(
      /- (.*?)(?:\n|$)/g, 
      '<div class="chat-bullet">• $1</div>'
    );
    
    // Handle line breaks
    text = text.replace(/\n/g, '<br>');
    
    return text;
  }
  
  // Send message on button click with ripple effect
  chatBotSendButton.addEventListener('click', (e) => {
    sendMessage();
    
    // Add ripple effect
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
  
  // Send message on Enter key press
  chatBotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  // Enable/disable send button based on input with smooth transitions
  chatBotInput.addEventListener('input', () => {
    const isEmpty = chatBotInput.value.trim() === '';
    chatBotSendButton.disabled = isEmpty;
    chatBotSendButton.style.opacity = isEmpty ? '0.5' : '1';
    chatBotSendButton.style.transform = isEmpty ? 'scale(0.95)' : 'scale(1)';
  });
  
  // Initialize: disable button if input is empty with visual feedback
  chatBotSendButton.disabled = true;
  chatBotSendButton.style.opacity = '0.5';
  chatBotSendButton.style.transform = 'scale(0.95)';
  
  // Prevent clicks inside the chat window from bubbling to the document
  chatBotWindow.addEventListener('click', function(e) {
    e.stopPropagation();
  });

  // Add ripple style dynamically
  const style = document.createElement('style');
  style.textContent = `
    .ripple {
      position: absolute;
      background: rgba(255, 255, 255, 0.4);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    }
    
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});
