export abstract class BaseAssembler<TResponse, TEntity> {
  abstract toEntity(response: TResponse): TEntity;

  toEntities(responses: TResponse[]): TEntity[] {
    return responses.map((response) => this.toEntity(response));
  }
}
