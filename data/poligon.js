import {creteCoordinates} from './coordinates';
import {athinesCoordinates} from './coordinates';
import {spartaCoordinates} from './coordinates';
import {delphiCoordinates} from './coordinates';
import {thermopylaeCoordinates} from './coordinates';

export const poligonRegions = [
  {
    title: 'Crete',
    coordinates: creteCoordinates,
    strokeColor: '#27f',
    fillColor: '#27f',
    strokeWidth: 2,
    id:'5'
  },
  {
    title: 'Athines',
    coordinates: athinesCoordinates,
    strokeColor: '#423',
    fillColor: '#423',
    strokeWidth: 2,
    id:'1'
  },
  {
    title: 'Sparta',
    coordinates: spartaCoordinates,
    strokeColor: '#423',
    fillColor: '#423',
    strokeWidth: 2,
    id:'2'
  },
  {
    title: 'Delphi',
    coordinates: delphiCoordinates,
    strokeColor: '#423',
    fillColor: '#423',
    strokeWidth: 2,
    id:'4'
  },
  {
    title: 'Thermopylae',
    coordinates: thermopylaeCoordinates,
    strokeColor: '#423',
    fillColor: '#423',
    strokeWidth: 2,
    id:'3'
  },
];
