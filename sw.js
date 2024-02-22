// The minimum amount of time that needs to pass between checking for updates
const updateThreshold = 60 * 60 * 1000; // 1 hour

// The last time an update check was performed
let lastCheck = 0;

self.addEventListener('fetch', (event) => {
    // Only check for updates if enough time has passed since the last check
    if (Date.now() - lastCheck >= updateThreshold) {
        // Perform the update check
        self.skipWaiting();
    }
});

self.addEventListener('update', (event) => {
    // Notify the client that an update is available
    self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
            client.postMessage({ action: 'update-available' });
        });
    });
});
