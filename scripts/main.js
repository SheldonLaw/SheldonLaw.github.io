// register
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/scripts/service-worker.js').then(initialiseState);
} else {
    alert("Your browser does not support service-worker.");
}

// Once the service worker is registered set the initial state
function initialiseState() {
    // Are Notifications supported in the service worker?
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
        alert('Notifications aren\'t supported.');
        return;
    }

    // Check the current Notification permission.
    // If its denied, it's a permanent block until the
    // user changes the permission
    if (Notification.permission === 'denied') {
        alert('The user has blocked notifications.');
        return;
    }

    // Check if push messaging is supported
    if (!('PushManager' in window)) {
        alert('Push messaging isn\'t supported.');
        return;
    }

    // We need the service worker registration to check for a subscription
    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        // Do we already have a push message subscription?
        serviceWorkerRegistration.pushManager.getSubscription()
            .then(function(subscription) {
                if (!subscription) {
                    // We aren’t subscribed to push, so set UI
                    // to allow the user to enable push
                    return;
                }
            })
            .catch(function(err) {
                alert(
                    'Error during getSubscription()', err);
            });
    });
}


function subscribe() {

    // We need the service worker registration to check for a subscription
    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        // var title = 'Yay a message.';
        // var body = 'We have received a push message.';
        // var icon = '/images/icon-192x192.png';
        // var tag = 'simple-push-demo-notification-tag';
        // serviceWorkerRegistration.showNotification(title, {
        //     body: body,
        //     icon: icon,
        //     tag: tag,
        //     data: "123"
        // })
        serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true })
            .then(function(subscription) {
                return subscription;
                // return sendSubscriptionToServer(subscription);
            })
            .catch(function(e) {
                if (Notification.permission === 'denied') {
                    alert(
                        'Permission for Notifications was denied'
                    );
                } else {
                    alert(
                        'Unable to subscribe to push.', e);
                }
            }); 
    });
}