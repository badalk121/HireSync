class ApplicationTracker {
  constructor() {
    this.platforms = {
      'linkedin.com': this.handleLinkedIn,
      'indeed.com': this.handleIndeed,
      'glassdoor.com': this.handleGlassdoor,
      'ycombinator.com': this.handleYC
    };
    this.init();
  }

  async init() {
    this.currentPlatform = window.location.hostname;
    this.setupObserver();
    this.injectTrackingButton();
  }

  setupObserver() {
    const observer = new MutationObserver(() => {
      this.checkForApplicationForm();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  async injectTrackingButton() {
    const button = document.createElement('button');
    button.innerHTML = 'Track with HireSync';
    button.className = 'hiresync-track-btn';
    button.addEventListener('click', () => this.trackApplication());
    
    const targetElement = await this.waitForElement('.application-form');
    if (targetElement) {
      targetElement.appendChild(button);
    }
  }

  async trackApplication() {
    try {
      const applicationData = await this.platforms[this.currentPlatform]();
      const response = await this.sendToAPI(applicationData);
      
      if (response.ok) {
        this.showNotification('Application tracked successfully!');
      }
    } catch (error) {
      console.error('Failed to track application:', error);
      this.showNotification('Failed to track application');
    }
  }

  async sendToAPI(data) {
    const token = await chrome.storage.local.get('authToken');
    return fetch('https://api.hiresync.com/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.authToken}`
      },
      body: JSON.stringify(data)
    });
  }

  // Platform-specific handlers
  async handleLinkedIn() {
    return {
      platform: 'linkedin',
      company: document.querySelector('.company-name')?.textContent,
      position: document.querySelector('.job-title')?.textContent,
      location: document.querySelector('.location')?.textContent,
      // Add more fields as needed
    };
  }

  showNotification(message) {
    chrome.runtime.sendMessage({
      type: 'SHOW_NOTIFICATION',
      message
    });
  }

  async waitForElement(selector) {
    return new Promise(resolve => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(() => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector));
          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }
}

// Initialize tracker
new ApplicationTracker();