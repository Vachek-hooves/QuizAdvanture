import {creteCoordinates} from './coordinates';
import {athinesCoordinates} from './coordinates';
import {spartaCoordinates} from './coordinates';
import {delphiCoordinates} from './coordinates';
import {thermopylaeCoordinates} from './coordinates';

// Modern Greek-inspired color palette
export const poligonRegions = [
  {
    title: 'Crete',
    coordinates: creteCoordinates,
    strokeColor: '#1A5F7A', // Deep Mediterranean Blue
    fillColor: 'rgba(26, 95, 122, 0.5)', // Transparent Mediterranean Blue
    strokeWidth: 2,
    id: '5'
  },
  {
    title: 'Athines',
    coordinates: athinesCoordinates,
    strokeColor: '#C84630', // Terracotta Red
    fillColor: 'rgba(200, 70, 48, 0.5)', // Transparent Terracotta
    strokeWidth: 2,
    id: '1'
  },
  {
    title: 'Sparta',
    coordinates: spartaCoordinates,
    strokeColor: '#2D5A27', // Olive Green
    fillColor: 'rgba(45, 90, 39, 0.3)', // Transparent Olive
    strokeWidth: 2,
    id: '2'
  },
  {
    title: 'Delphi',
    coordinates: delphiCoordinates,
    strokeColor: '#B4A269', // Ancient Gold
    fillColor: 'rgba(180, 162, 105, 0.5)', // Transparent Gold
    strokeWidth: 2,
    id: '4'
  },
  {
    title: 'Thermopylae',
    coordinates: thermopylaeCoordinates,
    strokeColor: '#7A4988', // Royal Purple
    fillColor: 'rgba(122, 73, 136, 0.5)', // Transparent Purple
    strokeWidth: 2,
    id: '3'
  },
];
