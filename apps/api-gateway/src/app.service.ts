import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Observable } from "rxjs";

@Injectable()
export class ApiGatewaysService {
  getHello(): string {
    return "Hello World!";
  }
}
