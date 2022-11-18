self.addEventListener('install', event => {
    console.log("Service Worker installing.", event);
  });
  
  self.addEventListener('activate', event => {
    console.log("Service Worker activating.", event);
    return self.clients.claim();
  });

  self.addEventListener('fetch', event => {
    console.log("Service Worker fetching.", event);
    event.respondWith(fetch(event.request));
  });


self.addEventListener('push', (event) => {
  var data = { title: 'Notifications!', content: 'You will now recieve notifications', openUrl:'/'};
  if (event.data) {
     data = JSON.parse(event.data.text());
  }
    var options = {
    body: data.content,
    icon: 'https://res.cloudinary.com/skalarly/image/upload/v1666815580/Icon/Skalarly_1_qjx3tx.jpg',
    // image: 'https://res.cloudinary.com/skalarly/image/upload/v1666815580/Icon/Skalarly_1_qjx3tx.jpg',
    requireInteraction: true,
    vibrate: [100, 50, 100],
    badge: 'https://res.cloudinary.com/skalarly/image/upload/v1666815580/Icon/Skalarly_1_qjx3tx.jpg',
    // data: {
    //   url: data.openUrl
    // },
    tag: 'confirm-notification',
    actions: [
      {action: 'confirm', title: 'Okay', icon: '👍' },
      {action: 'cancel', title: 'Cancel'},

    ]
  }
  const promiseChain = self.registration.showNotification(data.title, options);
  event.waitUntil(promiseChain);
});
function displayNotification() {
  if (Notification.permission === 'granted'){
    navigator.serviceWorker.getRegistration()
    .then(req => {
      req.showNotification('Hello World!', options)
    })
  }
}

self.addEventListener('notificationclick', (event) => {
  console.log('know what it is')
  var notification = event.notification;
  var action = event.action;
  console.log(notification);
  if (action === 'confirm'){
    notification.close()
  }else{
    console.log('closed notif', action);
    // event.waitUntil(
    //   clients.matchAll()
    //   .then(clis => {
    //     var client = clis.find(c => {
    //       return c.visibilityState === 'visible';
    //     });
    //     if (client !== undefined){
    //         client.navigate(notification.data.url);
    //         client.focus();
    //     }else{
    //       client.openWindow(notification.data.url)
    //     }
    // notification.close()
    //   })

    // );
    notification.close()

  }
});


