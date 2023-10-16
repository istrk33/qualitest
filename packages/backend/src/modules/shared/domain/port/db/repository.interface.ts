export interface RepositoryInterface {
  persist?<T>(entityToBePersisted: DeepPartial<T>): Promise<T>;
  save<T>(entity: DeepPartial<T>): Promise<T>;
  create<T>(entity: DeepPartial<T>): T;
  delete({ id }: { id: string }): Promise<{}>;
}
