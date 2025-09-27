import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): object {
    return {
      message: "Hello World!",
      configSample: {
        HOSTNAME: this.configService.get<string>("HOSTNAME") ?? "Not Found",
        BACK_PORT: this.configService.get<string>("BACK_PORT") ?? "Not Found",
        FRONT_PORT: this.configService.get<string>("FRONT_PORT") ?? "Not Found",
      },
    };
  }
}
