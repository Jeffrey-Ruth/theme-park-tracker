import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [rides, setRides] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/parks/wait-times')
      .then(response => {
        const sorted = response.data.rides.sort((a, b) => a.name.localeCompare(b.name));
        setRides(sorted);
      });
  }, []);

  const filteredRides = rides.filter(ride =>
    ride.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <input
        placeholder="Search rides..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      />
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