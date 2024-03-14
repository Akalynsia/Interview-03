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
    <div className="container mx-auto my-8 text-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleGenerateActivity}
      >
        Generate Activity
      </button>
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
    <div className="container mx-auto my-4 border border-gray-400 rounded-lg shadow-md">
      <div className="p-4 cursor-pointer" onClick={toggleExpansion}>
        <div className="font-bold text-xl">{item.activity}</div>
      </div>
      {expanded && (
        <div className="p-4">
          <p>
            <span className="font-semibold">Type:</span> {item.type}
          </p>
          <p>
            <span className="font-semibold">Participants:</span>{" "}
            {item.participants}
          </p>
          <p>
            <span className="font-semibold">Price:</span> {item.price}
          </p>
          <p>
            <span className="font-semibold">Accessibility:</span>{" "}
            {item.accessibility}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
