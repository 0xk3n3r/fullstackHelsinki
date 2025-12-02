import { z } from 'zod';
import { NewEntrySchema } from './utils';

export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}


export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

export interface Diagnose {
    "code": string,
    "name": string,
    "latin"?: string,
}

export interface Patient {
    "id": string,
    "name": string,
    "dateOfBirth": string,
    "ssn": string,
    "gender": string,
    "occupation": string,
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type NewDiaryEntry = z.infer<typeof NewEntrySchema>;
export type NewPatient = Omit<Patient, 'id' | 'entries'>;
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;