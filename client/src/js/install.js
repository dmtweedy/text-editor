const butInstall = document.getElementById('buttonInstall');

/* Here we need to provide the logic for when and how to install the PWA. */

// Keep this code as-is
window.addEventListener('beforeinstallprompt', (event) => {
  window.deferredPrompt = event;
  butInstall.classList.toggle('hidden', false);
});

// This listener fires when the user clicks the "install" button.
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  promptEvent.prompt();

  // Set window.deferredPrompt to null here
  window.deferredPrompt = null;

  // Set hidden value of butInstall to true here
  butInstall.hidden = true;
});

window.addEventListener('appinstalled', (event) => {
  window.deferredPrompt = null;
});