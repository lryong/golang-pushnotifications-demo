### golang-push-notifications-demo

This is a Demo for cross browsers push notifications, implemented message push using [webpush-go](https://github.com/SherClockHolmes/webpush-go)

#### Access index.html

Replace the public VAPID key in index.js.

Use a tool such as SimpleHTTPServer to run a web server:

```
python -m SimpleHTTPServer 8000
```

Go to `http://localhost:8000` and copy the logged subsciption from the console.

#### Test send a notification

Replace the public/private VAPID keys and detail subscription info. Use the subscription you had from the first section.

```bash
go run main.go
```
