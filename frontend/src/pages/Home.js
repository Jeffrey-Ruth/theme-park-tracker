import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [rides, setRides] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedPark, setSelectedPark] = useState('All');
  const [selectedRide, setSelectedRide] = useState(null);
  const [rideDetail, setRideDetail] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/parks/wait-times')
      .then(response => {
        const sorted = response.data.rides.sort((a, b) => a.name.localeCompare(b.name));
        setRides(sorted);
      });
  }, []);

  const handleRideClick = (ride) => {
    setSelectedRide(ride);
    setRideDetail(null);
    axios.get(`http://localhost:8000/ride-details/${ride.id}`)
      .then(response => setRideDetail(response.data))
      .catch(() => setRideDetail(null));
  };

  const closeModal = () => {
    setSelectedRide(null);
    setRideDetail(null);
  };

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
        <div
          key={ride.id}
          onClick={() => handleRideClick(ride)}
          style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #ccc', cursor: 'pointer' }}
        >
          <div>
            <div>{ride.name}</div>
            <div style={{ fontSize: '12px', color: '#888' }}>{ride.park}</div>
          </div>
          <span>{ride.is_open ? `${ride.wait_time} min` : 'Closed'}</span>
        </div>
      ))}

      {selectedRide && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', width: '400px', position: 'relative' }}>
            <button onClick={closeModal} style={{ position: 'absolute', top: '10px', right: '10px' }}>✕</button>
            <h2>{selectedRide.name}</h2>
            <p><strong>Park:</strong> {selectedRide.park}</p>
            <p><strong>Status:</strong> {selectedRide.is_open ? `Open - ${selectedRide.wait_time} min wait` : 'Closed'}</p>
            {rideDetail ? (
              <>
                <p><strong>Height Requirement:</strong> {rideDetail.height_requirement || 'N/A'}</p>
                <p><strong>Year Opened:</strong> {rideDetail.year_opened || 'N/A'}</p>
                <p><strong>Top Speed:</strong> {rideDetail.speed || 'N/A'}</p>
              </>
            ) : (
              <p style={{ color: '#888' }}>No additional details available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;