import { RequestHandler } from 'express';
import { pipe } from 'fp-ts/lib/pipeable';
import { fold } from 'fp-ts/lib/Either';
import { ParamsDictionary } from 'express-serve-static-core';
import * as D from 'io-ts/lib/Decoder';

export const validator: <T>(input: D.Decoder<unknown, T>) => RequestHandler<ParamsDictionary, any, T> = input => (req, res, next) => {
  return pipe(
    req.body,
    input.decode,
    fold(
      errors => {
        res.status(422).json(D.draw(errors));
      },
      () => {
        next();
      },
    ),
  );
};
