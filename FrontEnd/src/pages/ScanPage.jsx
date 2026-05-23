import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ScanPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getCountry = async () => {
      const res = await axios.get("http://192.168.66.197:5000/api/scan");
      // redirect inside phone app
      navigate(`/boarding/${res.data.country}`);
    };

    getCountry();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Generating your boarding pass...</h2>
    </div>
  );
};

export default ScanPage;