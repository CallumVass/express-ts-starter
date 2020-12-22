import { pipe } from 'fp-ts/lib/function';
import * as D from 'io-ts/Decoder';

export interface NonEmptyStringBrand {
  readonly NonEmptyString: unique symbol;
}

export type NonEmptyString = string & NonEmptyStringBrand;

export interface NonEmptyStringC extends D.Decoder<unknown, NonEmptyString> {}

export const NonEmptyString: NonEmptyStringC = pipe(
  D.string,
  D.refine((s): s is NonEmptyString => s.length > 0, 'NonEmptyString'),
);
