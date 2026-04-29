import React from 'react';
import { useUser } from '@clerk/clerk-react';

function Settings() {
  const { user } = useUser();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Settings</h2>
      <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
      <p><strong>Email:</strong> {user.emailAddresses[0].emailAddress}</p>
    </div>
  );
}

export default Settings;