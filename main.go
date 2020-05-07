package main

import (
	"encoding/json"
	"fmt"
	webpush "github.com/SherClockHolmes/webpush-go"
	"io/ioutil"
)

var (
	subscription    = `{"endpoint":"<ENDPOINT_URL>","expirationTime":null,"keys":{"p256dh":"<P256DH>","auth":"<AUTH>"}}`
	vapidPublicKey  string
	vapidPrivateKey string
)

func main() {
	/*
	// Generate VAPIDKeys
	var err error
	vapidPrivateKey, vapidPublicKey, err= webpush.GenerateVAPIDKeys()
	if err != nil {
		// Handle error
		fmt.Println("Generate VAPID Keys error: ", err)
	}
	 */

	// Decode subscription
	s := &webpush.Subscription{}
	json.Unmarshal([]byte(subscription), s)

	// Send Notification
	resp, err := webpush.SendNotification([]byte("<YOUR MESSAGES>"), s, &webpush.Options{
		// Subscriber:      "yourname@domain.com", // Do not include "mailto:"
		VAPIDPublicKey:  vapidPublicKey,
		VAPIDPrivateKey: vapidPrivateKey,

		TTL: 300,
	})
	if err != nil {
		fmt.Println("Send notification to web-push endpoint error: ", err)
		return
	}

	ret, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("View specific HTTP response error:", err)
	}
	fmt.Println("View specific HTTP response: ",string(ret))
	fmt.Println("Lookup HTTP Code: ", resp.StatusCode)

	defer resp.Body.Close()
}
