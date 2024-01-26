import { RpcException } from "@nestjs/microservices";
import { Observable, firstValueFrom, lastValueFrom } from "rxjs";

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
export async function RpcResponseWrapper<T>(obs: Observable<T>) {
  try {
    const res = await lastValueFrom(obs);
    return res;
  } catch (error) {
    if (error) {
      throw new RpcException(error);
    }
  }
}
