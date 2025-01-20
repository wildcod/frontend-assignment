type Request<TBody> = {
  endpoint: string;
  method: string;
  body?: TBody;
  options: RequestInit;
  retriesLeft?: number;
};

class ApiHandler {
  private baseURL: string;
  private retries: number;
  private retryDelay: number;

  constructor(
    baseURL: string,
    retryOptions: { retries: number; retryDelay: number } = {
      retries: 3,
      retryDelay: 1000
    }
  ) {
    this.baseURL = baseURL;
    this.retries = retryOptions.retries;
    this.retryDelay = retryOptions.retryDelay;
  }

  private async request<T, TBody = unknown>({
    endpoint,
    method,
    body,
    options = {},
    retriesLeft = this.retries
  }: Request<TBody>): Promise<T | undefined> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = options.headers || undefined;

    const config: RequestInit = {
      method,
      headers,
      ...options
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return (await response.json()) as T;
    } catch (error: unknown) {
      if (retriesLeft > 0) {
        console.warn(`Retrying... (${this.retries - retriesLeft + 1})`);
        await this.delay(this.retryDelay);
        return this.request<T>({
          endpoint,
          method,
          body,
          options,
          retriesLeft: retriesLeft - 1
        });
      } else if (error instanceof Error) {
        throw new Error(
          `Request failed after ${this.retries} retries: ${error.message}`
        );
      }
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public get<T>(endpoint: string, options: RequestInit = {}) {
    return this.request<T>({ endpoint, method: 'GET', options });
  }

  public post<T, TBody>(
    endpoint: string,
    body: TBody,
    options: RequestInit = {}
  ) {
    return this.request<T>({ endpoint, method: 'POST', body, options });
  }

  public put<T, TBody>(
    endpoint: string,
    body: TBody,
    options: RequestInit = {}
  ) {
    return this.request<T>({ endpoint, method: 'PUT', body, options });
  }

  public patch<T, TBody>(
    endpoint: string,
    body: TBody,
    options: RequestInit = {}
  ) {
    return this.request<T>({ endpoint, method: 'PATCH', body, options });
  }

  public delete<T>(endpoint: string, options: RequestInit = {}) {
    return this.request<T>({ endpoint, method: 'DELETE', options });
  }
}

export default ApiHandler;
