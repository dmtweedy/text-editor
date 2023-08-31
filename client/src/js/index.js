import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // Register the service worker
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);
      // Additional code to handle successful registration
    })
    .catch(error => {
      console.error('Service Worker registration failed:', error);
    });
} else {
  console.error('Service workers are not supported in this browser.');
}