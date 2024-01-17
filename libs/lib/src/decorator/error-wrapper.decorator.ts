import { RpcException } from "@nestjs/microservices";
import { Observable, firstValueFrom } from "rxjs";

// export async function AxiosErrorWrapper(axios: Promise<AxiosResponse>) {
//   try {
//     const res = (await axios).data;
//     return res;
//   } catch (error) {
//     throw new RpcException(qs.stringify(error.response.data));
//   }
// }

export async function RpcRequestWrapper<T>(obs: Observable<T>) {
  return await firstValueFrom(obs)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
}
export async function RpcResponseWrapper<T>(promise: Promise<T>) {
  try {
    console.log("true here");
    return promise;
  } catch (error) {
    if (error) {
      throw new RpcException(error);
    }
  }
}
