import { useEffect, useState } from "react";
import {get, post} from "../utils/apiClient";
import ApiResponse from "../interfaces/ApiResponse";

type UseFetchArguments = {
  url: string;
  method: "GET" | "POST";
  body?: Record<string, any> | null;
};

export type UseFetchReturn<T> = {
  state: "loading" | "error" | "success";
  data: null | ApiResponse<T>;
  error: null | any;
};

export default function useFetch<T>({
  url,
  method,
  body,
}: UseFetchArguments): UseFetchReturn<T> {
  const [fetchState, setFetchState] = useState<UseFetchReturn<T>>({
    state: "loading",
    data: null,
    error: null,
  });

  useEffect(
    function () {
      async function fetchData() {
        try {
          let result = null;
          switch (method) {
            case "GET":
              result = await get(url);
              break;
            case "POST":
              result = await post(url, body);
              break;
            default:
              throw new Error("Invalid method");
          }
          setFetchState({
            state: "success",
            data: result,
            error: null,
          });
          
        } catch (error) {
          setFetchState({
            data: null,
            state: "error",
            error,
          });
        }
      }
      fetchData();
    },
    [url, method, body]
  );

  return {fetchState};
}
