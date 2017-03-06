// register
var pushEnabled = false;
var pushBtn = document.querySelector('#push-btn');
var sendBtn = document.querySelector('#send-btn');
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(initialiseState);
    pushBtn.addEventListener('click', function() {
        if (!pushEnabled) {
            //注册
            subscribe();
        } else {
            unSubscribe();
        }
    });
    sendBtn.addEventListener('click', function() {
        navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
            setTimeout(function() {
                var title = 'Yay a message.';
                var body = 'We have received a push message.';
                var icon = '/images/icon-192x192.png';
                var tag = 'simple-push-demo-notification-tag';
                serviceWorkerRegistration.showNotification(title, {
                    body: body,
                    icon: icon,
                    tag: tag,
                    data: "123"
                })
            }, 3000);
        });
    });
} else {
    alert("Your browser does not support service-worker.");
}

function initialiseState() {
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
        alert('Notifications aren\'t supported.');
        return;
    }

    if (Notification.permission === 'denied') {
        alert('The user has blocked notifications.');
        return;
    }

    if (!('PushManager' in window)) {
        alert('Push messaging isn\'t supported.');
        return;
    }

    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.getSubscription()
            .then(function(subscription) {
                if (!subscription) {
                    pushBtn.textContent = "开启通知";
                    pushBtn.disabled = false;
                    return;
                }
            })
            .catch(function(err) {
                alert('Error during getSubscription()', err);
            });
    });
}


function subscribe() {
    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true })
            .then(function(subscription) {
                //测试通知
                var title = 'Yay a message.';
                var body = 'We have received a push message.';
                var icon = '/images/icon-192x192.png';
                var tag = 'simple-push-demo-notification-tag';
                serviceWorkerRegistration.showNotification(title, {
                    body: body,
                    icon: icon,
                    tag: tag,
                    data: "123"
                })
                //订阅通知
                return sendSubscriptionToServer(subscription);
            })
            .catch(function(e) {
                if (Notification.permission === 'denied') {
                    alert('Permission for Notifications was denied');
                } else {
                    alert('Unable to subscribe to push.', e);
                }
            }); 
    });
}

function unSubscribe() {

}

function sendSubscriptionToServer(subscription) {

}