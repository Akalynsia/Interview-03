import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  return <GenerateList />;
}
const GenerateList = () => {
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    fetchActivity();
  }, []);

  const fetchActivity = async () => {
    try {
      const response = await axios.get("https://www.boredapi.com/api/activity");
      setActivity(response.data);
    } catch (error) {
      console.error("Error fetching activity:", error);
    }
  };

  const handleGenerateActivity = () => {
    fetchActivity();
  };

  return (
    <div>
      <button onClick={handleGenerateActivity}>Generate Activity</button>
      {activity && <ExpandableListItem item={activity} />}
    </div>
  );
};

const ExpandableListItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={{ margin: "10px", border: "1px solid black", padding: "10px" }}>
      <div onClick={toggleExpansion} style={{ cursor: "pointer" }}>
        {item.activity}
      </div>
      {expanded && (
        <div>
          <p>Type: {item.type}</p>
          <p>Participants: {item.participants}</p>
          <p>Price: {item.price}</p>
          <p>Accessibility: {item.accessibility}</p>
        </div>
      )}
    </div>
  );
};

export default App;
