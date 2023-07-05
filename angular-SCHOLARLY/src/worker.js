self.addEventListener('install', event => {
    console.log("Service Worker installing.", event);
    // event.waitUntil(
    //   addResourcesToCache([
    //    '',
    //   ])
    // );
  });
  
  self.addEventListener('activate', event => {
    console.log("Service Worker activating.", event);
    return self.clients.claim();
  });

  // fetch cached content or any requests
  self.addEventListener('fetch', event => {
    console.log("Service Worker fetching.", event);
    // event.respondWith(fetch(event.request))
    // .then(
    //   (result) => {
    //     console.log(result);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // )
  });


self.addEventListener('push', (event) => {
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
    data: {
      url: data.openUrl
    },
    tag: 'confirm-notification',
    actions: [
      {action: 'confirm', title: 'Confirm', icon: '👍' },
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
  console.log('know what it is', event)
  var notification = event.notification;
  var action = event.action;
  console.log(notification);
  if (action === 'confirm'){
    console.log('dad', event.notification.data.url)
    if( event.notification.data.url ){
    console.log('mom', event.notification.data.url)
    self.clients.openWindow(event.notification.data.url)
    }
    notification.close()
  }else{
    console.log('closed notification', action);
    notification.close()

  }
});


