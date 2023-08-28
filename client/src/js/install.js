const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

// Logic for install

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault(); // Prevent the default prompt
  deferredPrompt = event; // Store event
  butInstall.style.display = 'block'; // Display install button
});

butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Show prompt
    deferredPrompt.prompt();

    // Wait for user to respond
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the installation prompt');
    } else {
      console.log('User dismissed the installation prompt');
    }

    // Clear the prompt
    deferredPrompt = null;

    // Hide install button
    butInstall.style.display = 'none';
  }
});

window.addEventListener('appinstalled', (event) => {
  console.log('App installed successfully');
});