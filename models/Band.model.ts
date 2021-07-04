export default class Band {
  constructor(public name: string) {}

  static fromJson(fromApiEntity: any): Band {
    return new Band(fromApiEntity.name);
  }
}
