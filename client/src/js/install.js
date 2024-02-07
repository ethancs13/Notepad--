const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {

    console.log("before install running")
    // Saves event in global variable.
    // store for later
    window.deferredPrompt = event;

    // .toggle() method removes class depending on state
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    // if prompt empty, return
    if (!promptEvent) {
        return;
    }

    // prompt user to install
    promptEvent.prompt();

    // set deffered prompt to null / reset
    window.deferredPrompt = null;

    // hide
    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // set deferredPrompt property to null to clean up global vars
    window.deferredPrompt = null;
});
