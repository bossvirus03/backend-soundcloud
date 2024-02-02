import { MailerService } from "@nestjs-modules/mailer";
import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";

@Processor("send_mail")
export class EmailConsumer {
  constructor(private readonly mailerService: MailerService) {}
  @Process({ name: "register-user" })
  async registerEmail(job: Job) {
    const time1 = new Date();
    await this.mailerService.sendMail({
      to: job.data["to"],
      subject: "Welcome to Nice App!",
      template: "./new-user",
      context: {
        name: job.data["name"],
        desc: "",
      },
    });
    const time2 = new Date();
    console.log(`send success: `, time2.getTime() - time1.getTime(), "ms");
  }
}
