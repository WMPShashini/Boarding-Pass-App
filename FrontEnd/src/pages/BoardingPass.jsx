import { useParams } from "react-router-dom";

const countryData = {
  London: {
    flag: "🇬🇧",
    color: "#1e3a8a",
    airport: "LHR",
    flight: "BA 1509",
    gate: "G12",
    seat: "A1",
    class: "Business"
  },
  India: {
    flag: "🇮🇳",
    color: "#f97316",
    airport: "DEL",
    flight: "AI 202",
    gate: "B4",
    seat: "C3",
    class: "Economy"
  },
  "Sri Lanka": {
    flag: "🇱🇰",
    color: "#16a34a",
    airport: "CMB",
    flight: "UL 404",
    gate: "A2",
    seat: "J7",
    class: "First Class"
  },
  Japan: {
    flag: "🇯🇵",
    color: "#dc2626",
    airport: "HND",
    flight: "JL 707",
    gate: "D9",
    seat: "F5",
    class: "Business"
  },
  France: {
    flag: "🇫🇷",
    color: "#2563eb",
    airport: "CDG",
    flight: "AF 888",
    gate: "C1",
    seat: "K2",
    class: "Economy"
  }
};

const BoardingPass = () => {
  const { country } = useParams();
  const data = countryData[country];

  // 🕒 REAL TIME DATE & TIME
  const now = new Date();

  const currentDate = now.toLocaleDateString("en-GB"); // 23/05/2026
  const boardingTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  if (!data) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>
        Invalid Boarding Pass
      </h2>
    );
  }

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <h1 style={styles.welcome}>
        Welcome {country} {data.flag}
      </h1>

      {/* CARD */}
      <div style={{ ...styles.card, borderLeft: `12px solid ${data.color}` }}>

        {/* LEFT */}
        <div style={styles.left}>
          <p style={styles.smallText}>BOARDING PASS</p>

          <h2 style={styles.city}>{country}</h2>

          <p style={styles.label}>Boarding Time</p>
          <h3>{boardingTime}</h3>

          <p style={styles.label}>Date</p>
          <h3>{currentDate}</h3>

          <img
            style={{ marginTop: "20px" }}
            src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${country}`}
            alt="QR"
          />
        </div>

        {/* RIGHT */}
        <div style={styles.right}>
          <h3>✈ Flight {data.flight}</h3>

          <p><b>Gate:</b> {data.gate}</p>
          <hr />

          <p><b>Airport:</b> {data.airport}</p>
          <p><b>Class:</b> {data.class}</p>
          <p><b>Seat:</b> {data.seat}</p>

          <div style={styles.barcode}></div>
        </div>

      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#dbeafe,#fce7f3)",
    padding: "10px"
  },

  welcome: {
    fontSize: "24px",
    marginBottom: "20px",
    fontWeight: "bold"
  },

  card: {
    width: "100%",
    maxWidth: "750px",
    display: "flex",
    background: "#fff",
    borderRadius: "20px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
    overflow: "hidden"
  },

  left: {
    flex: 2,
    padding: "20px"
  },

  right: {
    flex: 1,
    padding: "20px",
    background: "#f8fafc",
    borderLeft: "2px dashed #ccc"
  },

  smallText: {
    fontSize: "12px",
    letterSpacing: "2px",
    color: "#888"
  },

  city: {
    fontSize: "30px",
    margin: "10px 0"
  },

  label: {
    fontSize: "12px",
    color: "#777",
    marginTop: "10px"
  },

  barcode: {
    marginTop: "25px",
    height: "50px",
    background:
      "repeating-linear-gradient(90deg,#000,#000 2px,#fff 2px,#fff 4px)"
  }
};

export default BoardingPass;