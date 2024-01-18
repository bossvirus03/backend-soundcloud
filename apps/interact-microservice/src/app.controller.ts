import { Controller, Get } from "@nestjs/common";
import { InteractService } from "./app.service";

@Controller()
export class InteractController {
  constructor(private readonly interactService: InteractService) {}

  @Get()
  getHello(): string {
    return this.interactService.getHello();
  }
}
