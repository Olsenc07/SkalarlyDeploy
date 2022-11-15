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

  const data = event.data
  var promise =  self.registration.showNotification('1stPush Notification'
      // data.title, // title of the notification
      // {
      //     body: "Push notification from section.io", //the body of the push notification
      //     image: "/angular-SCHOLARLY/src/assets/Pics/Skalarly jpeg 2 (hat & logo).png",
      //     icon: "/angular-SCHOLARLY/src/assets/Pics/Skalarly 1.jpeg" // icon 
      // }
  );
  event.waitUntil(promise);
});

