import { RequestHandler } from 'express';
import * as t from 'io-ts';
import { pipe } from 'fp-ts/lib/pipeable';
import { fold } from 'fp-ts/lib/Either';
import { failure } from 'io-ts/lib/PathReporter';
import { ParamsDictionary } from 'express-serve-static-core';

export const validator: <T>(input: t.Type<T, unknown>) => RequestHandler<ParamsDictionary, any, T> = input => (req, res, next) => {
  return pipe(
    req.body,
    input.decode,
    fold(
      errors => {
        res.status(422).json(failure(errors).join('\n'));
      },
      () => {
        next();
      },
    ),
  );
};
