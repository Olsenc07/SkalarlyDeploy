if('serviceWorker' in navigator){
    navigator.serviceWorker
    .register('/worker.js')
    .then(function() {
        console.log('Service worker registered!')
    })



// Register SW, Register Push, Send Push
// async function send() {
// console.log('Registering service worker...');
// const register = await navigator.serviceWorker.register('/worker.js')
//     .then((req) => console.log('Service worker registered', req))
//     .catch((err) => console.log('Service worker not registered', err))


// console.log('Service Worker Registered...');

// // Register Push
// console.log('Registering Push...');
// const subscription = await register.pushManager.subscribe({
//     userVisibleOnly: true,
//     applicationServerKey: publicVapidKey
// });
// console.log('Push Registered!');

// // Send Push Notfication
// console.log('Sending Push...');
// await fetch('/subscribe',{
//     method: 'POST',
//     body:
//     JSON.stringify(subscription),
//     headers: {
//         'content-type': 'application/json'
//     }
// });
// console.log('Push sent..');

// }
}
else{
    console.log('boo')
}