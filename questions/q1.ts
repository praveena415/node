class TaskService {
  createTask(name: string): void {
    console.log(`Creating task: ${name}`);
  }
}

class EmailService {
  sendEmail(to: string): void {
    console.log(`Sending email to ${to}`);
  }
}

const taskService = new TaskService();
taskService.createTask("Finish SRP assignment");

const emailService = new EmailService();
emailService.sendEmail("user@example.com");
