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

const main = async () => {
  check();
  subscribe();
};
// main(); we will not call main in the beginning.
