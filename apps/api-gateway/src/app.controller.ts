import { Controller, Get } from "@nestjs/common";
import { ApiGatewaysService } from "./app.service";
// import { ClientProxy } from "@nestjs/microservices";
// import { EventPattern } from "@nestjs/microservices";

@Controller()
export class ApiGatewaysController {
  constructor(private readonly apiGatewaysService: ApiGatewaysService) {}

  @Get()
  getHello(): string {
    return this.apiGatewaysService.getHello();
  }
}
