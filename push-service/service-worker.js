(function () {
    'use strict';
    var cacheVersion = 1.0;
    var currentCache = {
        offline: 'offline-cache' + cacheVersion
    };

    var cacheUrl = [
        'index.html',
        'main.js'
    ];

    self.addEventListener('install', event => {
        event.waitUntil(
            caches.open(currentCache.offline).then(function (cache) {
                return cache.addAll(cacheUrl);
            })
      );
    });

    self.addEventListener('fetch', event => {

        if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
            event.respondWith(
                fetch(event.request.url).catch(error => {
                    // Return the offline page
                    return caches.match('index.html');
                })
            );
        } else {
            event.respondWith(caches.match(event.request)
                .then(function (response) {
                    return response || fetch(event.request);
                })
            );
        }
    });

    self.addEventListener('push', function (event) {
        // console.log('Received a push message', event);
        // //no event target
        // var title = 'Yay a message.';
        // var body = 'We have received a push message.';
        // var icon = '/images/icon-192x192.png';
        // var tag = 'simple-push-demo-notification-tag';

        // event.waitUntil(
        //     self.registration.showNotification(title, {
        //         body: body,
        //         icon: icon,
        //         tag: tag,
        //         data: "123"
        //     })
        // );
    });


    self.addEventListener('notificationclick', function (event) {
        // console.log('On notification click: ', event.notification.tag);
        event.notification.close();
        event.waitUntil(clients.matchAll({
            type: 'window'
        }).then(function (clientList) {
            for (var i = 0; i < clientList.length; i++) {
                var client = clientList[i];
                if (client.url === '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                var link = './transfer.html';
                if (event.notification.data) {
                    link += '?link=' + event.notification.data;
                }
                return clients.openWindow(link);
            }
        }));
    });
})();
