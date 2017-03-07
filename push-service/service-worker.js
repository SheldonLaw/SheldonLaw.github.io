'use strict';

var version = "1.0.0"

console.log(self);

self.addEventListener('push', function(event) {
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


self.addEventListener('notificationclick', function(event) {
    console.log('On notification click: ', event.notification.tag);
    event.notification.close();
    event.waitUntil(clients.matchAll({
        type: "window"
    }).then(function(clientList) {
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url == '/' && 'focus' in client)
                return client.focus();
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
