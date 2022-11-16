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

    var options = {
    body: 'You will now recieve notifations',
    icon: '/app/angular-SCHOLARLY/src/faviconH.ico',
    image: '/app/angular-SCHOLARLY/src/assets/Pics/Skalarly jpeg 2 (hat & logo).png',
    vibrate: [100, 50, 100],
    badge: '/app/angular-SCHOLARLY/src/faviconH.ico',
    tag: 'confirm-notification',
    actions: [
      {action: 'confirm', title: 'Okay', icon:'/angular-SCHOLARLY/src/faviconH.ico'},
      {action: 'cancel', title: 'Cancel', icon:'/angular-SCHOLARLY/src/faviconH.ico'},

    ]
  }
   self.registration.showNotification('Successfully subscribed!', options);
});

function displayNotification() {
  if (Notification.permission === 'granted'){
    navigator.serviceWorker.getRegistration()
    .then(req => {
      req.showNotification('Hello World!')
    })
  }
}

