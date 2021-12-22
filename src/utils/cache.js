import { makeVar } from '@apollo/client';

export const authenticatedToken = makeVar([]);
export const userIdVar = makeVar([0]);
export const userMailNameVar = makeVar([]);
export const showCoordinates = makeVar([false])