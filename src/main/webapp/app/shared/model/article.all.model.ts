import { Moment } from 'moment';
import { IArticle } from './article.model';

export interface IMapArticle {
  key?: string;
  contents?: IArticle[];
}

export const defaultValue: Readonly<IMapArticle> = {};
