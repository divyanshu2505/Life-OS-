// Real Indian freight railway coordinates
export const STATIONS = {
  dhanbad:     { name: 'Dhanbad',       lat: 23.7957, lng: 86.4304 },
  korba:       { name: 'Korba',         lat: 22.3595, lng: 82.7501 },
  singrauli:   { name: 'Singrauli',     lat: 24.1993, lng: 82.6616 },
  vindhyachal: { name: 'Vindhyachal',   lat: 24.1178, lng: 82.7524 },
  talcher:     { name: 'Talcher',       lat: 20.9508, lng: 85.2354 },
  farakka:     { name: 'Farakka',       lat: 24.8764, lng: 87.9165 },
  jharsuguda:  { name: 'Jharsuguda',    lat: 21.8545, lng: 84.0067 },
  raipur:      { name: 'Raipur',        lat: 21.2514, lng: 81.6296 },
  sipat:       { name: 'Sipat',         lat: 22.0971, lng: 82.3489 },
  nagpur:      { name: 'Nagpur',        lat: 21.1458, lng: 79.0882 },
  bilaspur:    { name: 'Bilaspur',      lat: 22.0797, lng: 82.1391 },
  bokaro:      { name: 'Bokaro',        lat: 23.6693, lng: 85.9564 },
  asansol:     { name: 'Asansol',       lat: 23.6850, lng: 86.9726 },
  kolkata:     { name: 'Kolkata',       lat: 22.5726, lng: 88.3639 },
  ranchi:      { name: 'Ranchi',        lat: 23.3441, lng: 85.3096 },
}

// Freight routes mapped to locos (via intermediate stations)
export const FREIGHT_ROUTES = [
  {
    id: 'WAG7-28451',
    color: '#c8e870',
    waypoints: [
      [23.7957, 86.4304], // Dhanbad
      [23.5, 85.5],       // intermediate
      [23.0, 84.5],       // intermediate
      [22.7, 83.8],       // intermediate
      [22.5, 83.3],       // intermediate
      [22.3595, 82.7501], // Korba
    ]
  },
  {
    id: 'WDG4-13302',
    color: '#e8c070',
    waypoints: [
      [24.1993, 82.6616], // Singrauli
      [24.15, 82.7],      // intermediate
      [24.1178, 82.7524], // Vindhyachal
    ]
  },
  {
    id: 'WAG9-31001',
    color: '#c8e870',
    waypoints: [
      [20.9508, 85.2354], // Talcher
      [21.5, 85.8],       // intermediate
      [22.0, 86.2],       // intermediate
      [22.5, 86.6],       // intermediate
      [23.0, 87.0],       // intermediate
      [23.8, 87.5],       // intermediate
      [24.5, 87.8],       // intermediate
      [24.8764, 87.9165], // Farakka
    ]
  },
  {
    id: 'WDG4-13450',
    color: '#e05050',
    waypoints: [
      [21.8545, 84.0067], // Jharsuguda
      [21.7, 83.2],       // intermediate
      [21.5, 82.5],       // intermediate
      [21.3, 82.0],       // intermediate
      [21.2514, 81.6296], // Raipur
    ]
  },
  {
    id: 'WAG7-29102',
    color: '#c8e870',
    waypoints: [
      [22.3595, 82.7501], // Korba
      [22.3, 82.6],       // intermediate
      [22.2, 82.5],       // intermediate
      [22.0971, 82.3489], // Sipat
    ]
  },
]
