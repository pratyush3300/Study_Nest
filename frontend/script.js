document.addEventListener('DOMContentLoaded', function() {
    particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          } 
        },
        "color": {
          "value": "#9061f9"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 0.5,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 5,
            "opacity_min": 0.2,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 6,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#9061f9",
          "opacity": 0.2,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 3,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 0.5
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  
    createFloatingOrbs();
  
    // Handle chat functionality
    initializeChat();
  });
  
  // floating colorful orbs in background
  function createFloatingOrbs() {
    const container = document.body;
    const colors = ['#9061f9', '#7367ff', '#ff6a88', '#6a88ff'];
    
    // Create 3 orbs
    for (let i = 0; i < 3; i++) {
      const orb = document.createElement('div');
      orb.classList.add('orb');
      
      const size = Math.random() * 300 + 200; // Size between 200-500px
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      orb.style.width = `${size}px`;
      orb.style.height = `${size}px`;
      orb.style.background = color;
      orb.style.left = `${Math.random() * 80}%`;
      orb.style.top = `${Math.random() * 80}%`;
      
      container.appendChild(orb);
      
      animateOrb(orb);
    }
  }
  
  function animateOrb(orb) {
    // Create random animation parameters
    const duration = Math.random() * 15 + 15; 
    const xMove = Math.random() * 20 - 10; 
    const yMove = Math.random() * 20 - 10;
    
    // Set animation with CSS
    orb.style.transition = `transform ${duration}s ease-in-out`;
    
    // Function to continuously move the orb
    function moveOrb() {
      const x = Math.random() * 20 - 10; // -10 to 10
      const y = Math.random() * 20 - 10; // -10 to 10
      orb.style.transform = `translate(${x}%, ${y}%)`;
      
      // Schedule next movement
      setTimeout(moveOrb, duration * 1000);
    }
    
    // Start the initial movement
    moveOrb();
  }
  
  // Chat functionality
  function initializeChat() {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const voiceInputBtn = document.getElementById('voiceInputBtn');
    
    userInput.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight < 120) ? this.scrollHeight + 'px' : '120px';
    });
    
    sendMessageBtn.addEventListener('click', function() {
      sendMessage();
    });
    
    userInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
    
    // Voice input (if supported)
    voiceInputBtn.addEventListener('click', function() {
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        
        // Add pulsing effect to button
        voiceInputBtn.classList.add('pulse');
        voiceInputBtn.innerHTML = '<i class="fas fa-microphone-alt"></i>';
        
        recognition.start();
        
        recognition.onresult = function(event) {
          const transcript = event.results[0][0].transcript;
          userInput.value = transcript;
          // Trigger input event to resize textarea
          userInput.dispatchEvent(new Event('input'));
        };
        
        recognition.onspeechend = function() {
          recognition.stop();
          voiceInputBtn.classList.remove('pulse');
          voiceInputBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        };
        
        recognition.onerror = function() {
          recognition.stop();
          voiceInputBtn.classList.remove('pulse');
          voiceInputBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        };
      } else {
        alert('Voice recognition is not supported in your browser.');
      }
    });
    
    function sendMessage() {
      const message = userInput.value.trim();
      if (message) {
        // Add user message to chat
        addMessageToChat(message, 'user');
        
        userInput.value = '';
        userInput.style.height = 'auto';
        
        const response = generateResponse(message);
        
        // Simulate AI thinking with a delay
        setTimeout(() => {
          addMessageToChat(response, 'ai');
        }, 1000);
      }
    }
    
    function generateResponse(userMessage) {
      // Convert to lowercase for easier keyword matching
      const msg = userMessage.toLowerCase();
      
      // Check for common study-related questions
      if (msg.includes('study') || msg.includes('learn') || msg.includes('how to study')) {
        return "Effective study techniques include the Pomodoro method (25 minutes of focused study followed by a 5-minute break), active recall, spaced repetition, and teaching concepts to others. What subject are you studying?";
      }
      else if (msg.includes('exam') || msg.includes('test') || msg.includes('preparation')) {
        return "For exam preparation, I recommend: 1) Create a study schedule, 2) Review past papers, 3) Focus on understanding concepts rather than memorizing, 4) Take regular breaks, and 5) Get enough sleep the night before. What exam are you preparing for?";
      }
      else if (msg.includes('math') || msg.includes('mathematics') || msg.includes('formula')) {
        return "Mathematics requires consistent practice. Start with understanding the core concepts and formulas, then solve progressively difficult problems. Would you like me to help you with a specific math topic?";
      }
      else if (msg.includes('science') || msg.includes('physics') || msg.includes('chemistry') || msg.includes('biology')) {
        return "Science subjects benefit from visual learning and practical applications. Try to connect theoretical concepts with real-world examples. Which specific science topic are you interested in?";
      }
      else if (msg.includes('history') || msg.includes('dates')) {
        return "When studying history, focus on understanding cause and effect rather than memorizing dates. Create timelines and connect events to help remember the sequence. What period of history are you studying?";
      }
      else if (msg.includes('language') || msg.includes('english') || msg.includes('grammar')) {
        return "Language learning is most effective through immersion and practice. Read books, watch shows, or find conversation partners in that language. Which language are you learning?";
      }
      else if (msg.includes('notes') || msg.includes('note-taking')) {
        return "Effective note-taking methods include Cornell notes, mind mapping, and the outline method. The best approach depends on your learning style and the subject. Would you like me to explain any of these methods in detail?";
      }
      else if (msg.includes('memory') || msg.includes('memorize') || msg.includes('remember')) {
        return "Memory techniques include spaced repetition, the memory palace technique, chunking information, and teaching concepts to others. What type of information are you trying to memorize?";
      }
      else if (msg.includes('focus') || msg.includes('concentration') || msg.includes('distraction')) {
        return "To improve focus: 1) Eliminate distractions (put your phone away), 2) Use the Pomodoro technique, 3) Have a dedicated study space, 4) Stay hydrated and well-rested, and 5) Practice meditation to improve concentration.";
      }
      else if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
        return "Hello! I'm your AI study assistant. How can I help you with your studies today?";
      }
      else if (msg.includes('thank') || msg.includes('thanks')) {
        return "You're welcome! Feel free to ask if you have any other questions about your studies.";
      }
      else if (msg.includes('bye') || msg.includes('goodbye')) {
        return "Goodbye! Good luck with your studies. Come back anytime you need help!";
      }
      else {
        // Generic responses for other queries
        const genericResponses = [
          "That's an interesting question about " + userMessage + ". Would you like me to provide some study resources on this topic?",
          "I understand you're asking about " + userMessage + ". This is an important concept. What specific aspect would you like to know more about?",
          "Let me help you understand " + userMessage + ". This topic connects to several key concepts in your curriculum. Would you like me to explain the fundamentals?",
          "I'd be happy to discuss " + userMessage + " with you. Is this for an upcoming exam or general knowledge?",
          "Great question about " + userMessage + "! Breaking this down into smaller parts might help. Which aspect should we start with?"
        ];
        
        // Return a random generic response
        return genericResponses[Math.floor(Math.random() * genericResponses.length)];
      }
    }
    
    function addMessageToChat(message, sender) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message');
      messageDiv.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
      
      const messageContent = document.createElement('div');
      messageContent.classList.add('message-content');
      
      const messageParagraph = document.createElement('p');
      messageParagraph.textContent = message;
      
      messageContent.appendChild(messageParagraph);
      messageDiv.appendChild(messageContent);
      
      chatMessages.appendChild(messageDiv);
      
      // Scroll to bottom
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }
  
  


  // Add pulse animation class
  document.addEventListener('DOMContentLoaded', function() {
    // Add pulse animation class
    function addPulseClass() {
      const pulse = document.createElement('style');
      pulse.innerHTML = `
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
        .pulse {
          animation: pulse 1.5s infinite;
          color: #ff6a88 !important;
        }
      `;
      document.head.appendChild(pulse);
    }
    
    addPulseClass();
  });