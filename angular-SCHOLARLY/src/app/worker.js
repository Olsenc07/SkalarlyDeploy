// const express = require('express');
// const router = express.Router();

console.log("Service Worker installing....");

self.addEventListener("install", event => {
    console.log("Service Worker installing.");
  });
  
  self.addEventListener("activate", event => {
    console.log("Service Worker activating.");
  });

self.addEventListener('push', e => {
const data = e.data.json();
console.log('Push Recieved...');
registration.showNotification(data.title, {
    body:'Notified by Skalarly',
    icon: '/Users/chaseolsen/angular_scholarly_fs/angular-SCHOLARLY/src/assets/Pics/Skalarly jpeg 2 (hat & logo).png'
})
});

// module.exports = router;
