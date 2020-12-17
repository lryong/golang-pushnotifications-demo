# golang-push-notifications-demo

This is a Demo for cross browsers push notifications, implemented message push using [webpush-go](https://github.com/SherClockHolmes/webpush-go)

## 1. Generate VAPID Keys

There are many ways to generate a pair of VAPID keys. You can use `GenerateVAPIDKeys()` providing from [webpush-go](https://github.com/SherClockHolmes/webpush-go) to create a private and public VAPID key pair:

```go
package main

import (
	"fmt"

	"github.com/SherClockHolmes/webpush-go"
)

func main() {
	vapidPrivateKey, vapidPublicKey, err := webpush.GenerateVAPIDKeys()
	if err != nil {
		fmt.Println("Generate VAPID Keys error: ", err)
		return
	}
	fmt.Println("vapid_private_key: ", vapidPrivateKey)
	fmt.Println("vapid_public_key: ", vapidPublicKey)
}

```

## 2. Access index.html

Replace the public VAPID key in index.js.

Use a tool such as SimpleHTTPServer to run a web server:

```
python -m SimpleHTTPServer 8000
```

Go to `http://localhost:8000` and copy the logged subsciption from the console.

## 3. Test sending a notification

Replace the public/private VAPID keys and detail subscription info. Use the subscription you had from the first section.

```bash
go run main.go
```
