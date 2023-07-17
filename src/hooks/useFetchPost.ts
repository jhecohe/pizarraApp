import { useEffect, useState } from "react";

type UseFetchState<T> = {
    state: "idle" | "loading" | "error" | "success";
    data: null | T;
    error: null | any;
}

export default function useFetchPost<T, B>(url: string, payload?: B){
    const [fetchState, setFetchState] = useState<UseFetchState<T>>({
        state: "idle",
        data: null,
        error: null,
    })

    useEffect(function() {
        async function fetchData() {
            try {
                setFetchState((oldValue) => ({
                    ...oldValue,
                    state: "loading"
                }));
                const response = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify(payload),
                    mode: "cors",
                    headers:{
                        "Access-Control-Allow-Origin": "*"
                    }
                });
                if(response.ok){
                    const json = await response.json();
                    setFetchState({
                        data: json,
                        state: "success",
                        error: null,
                    });
                } else {
                    setFetchState({
                        data: null,
                        state: "error",
                        error: new Error(response.statusText),
                    });
                }
            } catch (error) {
                setFetchState({
                    data: null,
                    state: "error",
                    error: error as Error,
                });
            }
        }
        fetchData();
    }, [url]);

    return fetchState;

}