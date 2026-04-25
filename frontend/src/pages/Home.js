import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [rides, setRides] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedPark, setSelectedPark] = useState('All');

  useEffect(() => {
    axios.get('http://localhost:8000/parks/wait-times')
      .then(response => {
        const sorted = response.data.rides.sort((a, b) => a.name.localeCompare(b.name));
        setRides(sorted);
      });
  }, []);

  const parks = ['All', ...new Set(rides.map(ride => ride.park))];

  const filteredRides = rides.filter(ride => {
    const matchesSearch = ride.name.toLowerCase().includes(search.toLowerCase());
    const matchesPark = selectedPark === 'All' || ride.park === selectedPark;
    return matchesSearch && matchesPark;
  });

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          placeholder="Search rides..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, padding: '10px' }}
        />
        <select
          value={selectedPark}
          onChange={e => setSelectedPark(e.target.value)}
          style={{ padding: '10px' }}
        >
          {parks.map(park => (
            <option key={park} value={park}>{park}</option>
          ))}
        </select>
      </div>
      {filteredRides.map(ride => (
        <div key={ride.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #ccc' }}>
          <div>
            <div>{ride.name}</div>
            <div style={{ fontSize: '12px', color: '#888' }}>{ride.park}</div>
          </div>
          <span>{ride.is_open ? `${ride.wait_time} min` : 'Closed'}</span>
        </div>
      ))}
    </div>
  );
}

export default Home;