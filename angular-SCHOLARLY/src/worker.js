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
    event.waitUntil(
      clients.matchAll()
      .then(clis => {
        var client = clis.find(c => {
          return c.visibilityState === 'visible';
        });
        if (client !== undefined){
            client.navigate(notification.data.url);
            client.focus();
        }else{
          client.openWindow(notification.data.url)
        }
    notification.close()
      })
    );

  }
})


self.addEventListener('push', (event) => {
  console.log('pushing notifications',event);
  console.log('pushinging notifications',event.data.text);
  var data = { title: 'New Follower!', content: 'A fellow Skalar has followed you', openUrl:'/'};
const data = JSON.parse(event.data.text());
console.log('j', message)
    var options = {
    body: data.content,
    icon: '/app/angular-SCHOLARLY/src/faviconH.ico',
    image: '/app/angular-SCHOLARLY/src/assets/Pics/Skalarly jpeg 2 (hat & logo).png',
    vibrate: [100, 50, 100],
    badge: '/app/angular-SCHOLARLY/src/faviconH.ico',
    data: {
      url: data.openUrl
    },
    tag: 'confirm-notification',
    actions: [
      {action: 'confirm', title: 'Okay', icon:'/angular-SCHOLARLY/src/faviconH.ico'},
      {action: 'cancel', title: 'Cancel', icon:'/angular-SCHOLARLY/src/faviconH.ico'},

    ]
  }
  const promiseChain =  self.registration.showNotification('New Follower', options);
  event.waitUntil(promiseChain);
});

function displayNotification() {
  if (Notification.permission === 'granted'){
    navigator.serviceWorker.getRegistration()
    .then(req => {
      req.showNotification('Hello World!')
    })
  }
}




