export default class Place {
  constructor(
    public id: string,
    public name: string,
    public address?: string,
    public zipCode?: string,
    public town?: string,
    public country?: string
  ) {}

  static fromJson(fromApiEntity: any): Place {
    return new Place(
      fromApiEntity.id,
      fromApiEntity.name,
      fromApiEntity.address,
      fromApiEntity.zipCode,
      fromApiEntity.town,
      fromApiEntity.country
    );
  }

  get display(): string {
    if (this.town && this.country) {
      return `${this.name}, ${this.town}, ${this.country}`;
    } else if (this.country) {
      return `${this.name}, ${this.country}`;
    } else {
      return `${this.name}`;
    }
  }
}
