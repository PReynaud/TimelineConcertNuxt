import { parseDate } from '@/utils/date.utils';
import Band from './Band.model';
import Place from './Place.model';

export default class Show {
  constructor(
    public id: string,
    public date: Date,
    public band: Band,
    public place?: Place
  ) {}

  static fromJson(fromApiEntity: any): Show {
    return new Show(
      fromApiEntity.id,
      parseDate(fromApiEntity.date),
      Band.fromJson(fromApiEntity.band),
      fromApiEntity.place ? Place.fromJson(fromApiEntity.place) : undefined
    );
  }
}
