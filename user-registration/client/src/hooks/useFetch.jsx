import { useState, useEffect, useCallback } from "react";

const useFetch = (url, options = {}) => {
  const {
    method = "GET",
    body = null,
    headers: customHeaders = {},
    triggerFetch = true,
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (bodyData = body) => {
      setLoading(true);
      setError(null);
      try {
        const headers = {
          "Content-Type": "application/json",
          ...customHeaders,
        };

        const res = await fetch(url, {
          method,
          headers,
          body: bodyData ? JSON.stringify(bodyData) : null,
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({
            message: `Request failed with status ${res.status}`,
          }));
          throw new Error(errData.message || res.statusText);
        }

        const result = await res.json();
        setData(result.data || result);
        return result;
      } catch (err) {
        const message = err.message || "Something went wrong";
        setError(message);
        return { error: message };
      } finally {
        setLoading(false);
      }
    },
    [url, method, body, customHeaders]
  );

  useEffect(() => {
    const abortController = new AbortController();
    if (triggerFetch && method === "GET") {
      fetchData();
    }
    return () => abortController.abort();
  }, [fetchData, triggerFetch, method]);

  const reset = () => {
    setData(null);
    setError(null);
  };

  return { data, loading, error, triggerFetch: fetchData, reset };
};

export default useFetch;
