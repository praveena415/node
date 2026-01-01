interface Notification {
  send(message: string): void
}

class EmailNotification implements Notification {
  send(message: string): void {
    console.log(`Sending EMAIL: ${message}`)
  }
}

class SMSNotification implements Notification {
  send(message: string): void {
    console.log(`Sending SMS: ${message}`)
  }
}

class PushNotification implements Notification {
  send(message: string): void {
    console.log(`Sending PUSH notification: ${message}`)
  }
}

class NotificationFactory {
  static createNotification(type: string): Notification {
    if (type === "Email") {
      return new EmailNotification()
    }
    if (type === "SMS") {
      return new SMSNotification()
    }
    if (type === "Push") {
      return new PushNotification()
    }
    throw new Error("Invalid notification type")
  }
}

const notifier = NotificationFactory.createNotification("Email")
notifier.send("Welcome!")

const smsNotifier = NotificationFactory.createNotification("SMS")
smsNotifier.send("Your OTP is 123456")
