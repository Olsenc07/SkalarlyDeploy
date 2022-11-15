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


self.addEventListener('notificationclick', function(event) {
  console.log('know what it is')
  var notification = event.notification;
  var action = event.action;
  console.log(notification);
  if (action === 'confirm'){
    notification.close()
  }else{
    console.log(action);
    notification.close()

  }
})


self.addEventListener('push', (event) => {
  console.log('pushing notifications',event);
  console.log('pushinging notifications',event.data);

  const promiseChain = self.registration.showNotification('Hello, World.');
  event.waitUntil(promiseChain);
});

