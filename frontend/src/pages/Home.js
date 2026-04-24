import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/parks/6/wait-times')
      .then(response => {
        const allRides = response.data.lands.flatMap(land => land.rides);
        const sorted = allRides.sort((a, b) => a.name.localeCompare(b.name));
        setRides(sorted);
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <input placeholder="Search rides..." style={{ width: '100%', padding: '10px', marginBottom: '20px' }} />
      {rides.map(ride => (
        <div key={ride.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #ccc' }}>
          <span>{ride.name}</span>
          <span>{ride.is_open ? `${ride.wait_time} min` : 'Closed'}</span>
        </div>
      ))}
    </div>
  );
}

export default Home;