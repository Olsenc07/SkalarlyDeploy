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


//   if('Notification' in window){
//     console.log('money')
// self.addEventListener('click', askForNotificationPermission);
//   }
// self.addEventListener('push', e => {
// const data = e.data.json();
// console.log('Push Recieved...');
// registration.showNotification(data.title, {
//     body:'Notified by Skalarly',
//     icon: '/Users/chaseolsen/angular_scholarly_fs/angular-SCHOLARLY/src/assets/Pics/Skalarly jpeg 2 (hat & logo).png'
// })
// });

// module.exports = router;
