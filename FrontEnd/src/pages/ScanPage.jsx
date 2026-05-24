import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ScanPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getCountry = async () => {
      try {
        const res = await axios.get(
  "https://attractive-strength-production-23be.up.railway.app/api/scan",
  { timeout: 5000 }
);

        console.log("API RESPONSE:", res.data);

        if (res.data?.country) {
          navigate(`/boarding/${res.data.country}`);
        } else {
          alert("No country received ❌");
        }

      } catch (error) {
        console.error("API ERROR:", error.message);

        alert("Cannot connect to server ❌");
      }
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