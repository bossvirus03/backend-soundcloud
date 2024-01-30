import { MailerService } from "@nestjs-modules/mailer";
import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";

@Processor("send_mail")
export class EmailConsumer {
  constructor(private readonly mailerService: MailerService) {}
  @Process({ name: "register-user" })
  async registerEmail(job: Job) {
    console.log(job.data);
    const time1 = new Date();
    await this.mailerService.sendMail({
      to: job.data["to"],
      subject: "Welcome to Nice App!",
      template: "./new-user",
    });
    const time2 = new Date();
    console.log(`send success: `, time1.getTime() - time2.getTime(), "ms");
  }
}
