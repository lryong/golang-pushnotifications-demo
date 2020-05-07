const check = () => {
  if (!("serviceWorker" in navigator)) {
    throw new Error("No Service Worker support!");
  }
  if (!("PushManager" in window)) {
    throw new Error("No Push API Support!");
  }
};

const subscribe = async() => {
          navigator.serviceWorker.ready
        .then(function(registration) {
                      const vapidPublicKey = '<VAPID-PUBLIC-KEY>';
            return registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
            });
        })
        .then(function(subscription) {
            console.log(
                JSON.stringify({
                                  subscription: subscription,
                })
            );
        })
            .catch(err => console.error(err));
}

function urlBase64ToUint8Array(base64String) {
          const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
          const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');
          const rawData = window.atob(base64);
          return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));

}

const registerServiceWorker = async () => {
  const swRegistration = await navigator.serviceWorker.register("service.js");
  return swRegistration;
};

const showLocalNotification = (title, body, swRegistration) => {
  const options = {
    body
    // here you can add more properties like icon, image, vibrate, etc.
  };
  swRegistration.showNotification(title, options);
};

const requestNotificationPermission = async () => {
  const permission = await window.Notification.requestPermission();
  // value of permission can be 'granted', 'default', 'denied'
  // granted: user has accepted the request
  // default: user has dismissed the notification permission popup by clicking on x
  // denied: user has denied the request.
  if (permission !== "granted") {
    throw new Error("Permission not granted for Notification");
  }
};

const main = async () => {
  check();
    subscribe();
  const swRegistration = await registerServiceWorker();
  const permission = await requestNotificationPermission();
  await showLocalNotification('This is title', 'this is the message', swRegistration);
};
// main(); we will not call main in the beginning.
