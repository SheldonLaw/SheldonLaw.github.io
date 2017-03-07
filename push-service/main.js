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
        if(!pushEnabled) alert("请先开启推送。");

        var title = pushContentForm.title.value;
        var content = pushContentForm.content.value;
        var link = pushContentForm.link.value;

        navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
            setTimeout(function() {
                title = title || '推送标题';
                content = content || '推送内容';
                var icon = 'https://p.pstatp.com/origin/18aa0001c56ac61f17b2';
                var tag = 'simple-push-demo-notification-tag';
                serviceWorkerRegistration.showNotification(title, {
                    body: content,
                    icon: icon,
                    tag: tag,
                    data: link
                })
            }, 3000);
        });
    });
} else {
    alert("当前浏览器不支持 service-worker.");
}

function initialiseState() {
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
        alert('当前浏览器不支持通知。');
        return;
    }

    if (Notification.permission === 'denied') {
        alert('用户已屏蔽通知。');
        return;
    }

    if (!('PushManager' in window)) {
        alert('当前浏览器不支持推送。');
        return;
    }

    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.getSubscription()
            .then(function(subscription) {
                if (!subscription) {
                    pushBtn.textContent = "开启推送";
                    pushEnabled = false;
                } else {
                    pushBtn.textContent = "关闭推送";
                    pushBtn.classList.add('on'); 
                    pushEnabled = true;
                }
            })
            .catch(function(err) {
                alert('发生错误', err);
            });
    });
}


function subscribe() {
    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true })
            .then(function(subscription) {
                //订阅通知
                return sendSubscriptionToServer(subscription);
            })
            .catch(function(e) {
                if (Notification.permission === 'denied') {
                    alert('没有获取到权限');
                } else {
                    alert('发生错误', e);
                }
            }); 
    });
}

function unSubscribe() {
    navigator.serviceWorker.ready
    .then(function(serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.getSubscription()
        .then(function(pushSubscription) {
            if (!pushSubscription) {
                return;
            }
            pushSubscription.unsubscribe()
            .then(function(successful) {
                pushBtn.textContent = '开启推送';
                pushBtn.classList.remove('on');
                pushEnabled = false;
            })
            .catch(function(e) {
                alert('Unsubscription error: ', e);
            });
        })
        .catch(function(e) {
            alert('Error thrown while unsubscribing from push messaging.', e);
        });
    });
}

function sendSubscriptionToServer(subscription) {
    if (!subscription) {
        pushBtn.textContent = "开启推送";
        pushEnabled = false;
    } else {
        pushBtn.textContent = "关闭推送";
        pushBtn.classList.add('on'); 
        pushEnabled = true;
    }
    //向服务器订阅
}