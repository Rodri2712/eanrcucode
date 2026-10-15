export abstract class BaseApi {
  constructor(protected readonly apiBaseUrl: string) {}

  protected buildUrl(endpoint: string): string {
    const baseUrl = this.apiBaseUrl.replace(/\/+$/, '');
    const normalizedEndpoint = endpoint.replace(/^\/+/, '');

    return `${baseUrl}/${normalizedEndpoint}`;
  }
}
