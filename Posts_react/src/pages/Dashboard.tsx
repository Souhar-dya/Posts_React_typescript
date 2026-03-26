import { useState } from 'react';
import AddPost from '../components/AddPost';
import FetchPost from '../components/FetchPost';

const Dashboard = () => {
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const handleCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <AddPost onCreated={handleCreated} />
      <FetchPost refreshKey={refreshKey} />
    </div>
  );
};

export default Dashboard;