import { BadRequestException, GatewayTimeoutException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Observable, firstValueFrom, timeout } from "rxjs";

// export async function AxiosErrorWrapper(axios: Promise<AxiosResponse>) {
//   try {
//     const res = (await axios).data;
//     return res;
//   } catch (error) {
//     throw new RpcException(qs.stringify(error.response.data));
//   }
// }

export async function RpcResponseWrapper<T>(
  promise: Promise<T>,
  timeoutInMs = 10000,
) {
  try {
    const timeout = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new GatewayTimeoutException());
      }, timeoutInMs);
    });

    const data = await Promise.race([promise, timeout]);
    const response = { data };

    return response;
  } catch (error) {
    if (error instanceof RpcException) {
      throw error;
    }
    throw new RpcException(new BadRequestException());
  }
}
export async function RpcRequestWrapper<T>(
  obs: Observable<T>,
  Timeout = 10000,
) {
  try {
    const result = await firstValueFrom(obs.pipe(timeout(Timeout)));
    try {
      if (result["_doc"]) return result["_doc"];
    } catch (error) {
      throw new RpcException(new BadRequestException());
    }
    return result;
  } catch (error) {
    if (error instanceof RpcException) {
      throw error;
    }
    throw new RpcException(error);
  }
}
