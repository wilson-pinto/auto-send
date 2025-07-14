console.log("WhatsApp Auto-Send Extension Loaded");

// Wait for page to fully load chats
const waitForSendButton = () => {
  const sendButton = document.querySelector('button[aria-label="Send"]');

  if (sendButton ) {
    console.log("Found send button and message — clicking!");
    sendButton.click();
    setTimeout(() => {
      window.close();
    }, 1000);
  } else {
    console.log("Waiting for send button or message...");
    setTimeout(waitForSendButton, 1000);
  }
};

waitForSendButton();