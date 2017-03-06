// register
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/scripts/service-worker.js')
} else {
    alert("Your browser does not support service-worker.");
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