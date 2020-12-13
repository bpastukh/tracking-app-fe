import {Moment} from 'moment';

export interface Task {
  title: string;
  comment: string;
  createdAt: string | Moment;
  loggedTime: number;
}
