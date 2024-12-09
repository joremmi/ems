import { initializeNavigation } from './navigation.js';
import { initializeTheme } from './theme.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeNavigation();
    initializeChat();
});

function initializeChat() {
    // Message input handling
    const messageInput = document.querySelector('.message-input input');
    const sendButton = document.querySelector('.send-btn');

    sendButton.addEventListener('click', () => {
        sendMessage();
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Conversation selection
    const conversations = document.querySelectorAll('.conversation');
    conversations.forEach(conv => {
        conv.addEventListener('click', () => {
            conversations.forEach(c => c.classList.remove('active'));
            conv.classList.add('active');
            // Update chat header and messages
            updateChatHeader(conv);
        });
    });

    // Modal Functions
    window.openNewMessageModal = function() {
        document.getElementById('newMessageModal').style.display = 'block';
    }

    window.closeNewMessageModal = function() {
        document.getElementById('newMessageModal').style.display = 'none';
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('newMessageModal');
        if (event.target === modal) {
            closeNewMessageModal();
        }
    }

    // Form submission
    document.getElementById('newMessageForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        closeNewMessageModal();
    });
}

function sendMessage() {
    const messageInput = document.querySelector('.message-input input');
    const message = messageInput.value.trim();
    
    if (message) {
        const messagesContainer = document.querySelector('.messages');
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const messageHTML = `
            <div class="message sent">
                <div class="message-content">
                    <p>${message}</p>
                    <span class="time">${time}</span>
                </div>
            </div>
        `;
        
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        messageInput.value = '';
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

function updateChatHeader(conversation) {
    const name = conversation.querySelector('h3').textContent;
    const student = conversation.querySelector('p').textContent;
    
    document.querySelector('.chat-title h2').textContent = name;
    document.querySelector('.chat-title p').textContent = student;
}
