/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';
import { NameSpace } from '../../../reducer/name-space';

const selectData = (state) => state[NameSpace.DATA].offers;

const selectSection = createSelector(
  selectData,
  (offers) => offers.map((offer) => ({
    name: offer.rname,
    url: offer.urlalias,
  })),
);

export { selectSection, selectData };
