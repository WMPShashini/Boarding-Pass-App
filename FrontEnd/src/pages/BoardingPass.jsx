import { useParams } from "react-router-dom";

const countryData = {
  "United Kingdom": {
    city: "London",
    flag: "🇬🇧",
    color: "#1e3a8a",
    airport: "LHR",
    flight: "BA 1509",
    gate: "G12",
    seat: "A1",
    class: "Business",
    watermark:
      "https://images.unsplash.com/photo-1674738689581-cdba855a5790?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fFVuaXRlZCUyMEtpbmdkb20lMjBMb25kb258ZW58MHx8MHx8fDA%3D?auto=format&fit=crop&w=2500&q=40"
  },

  "United States": {
    city: "Las Vegas",
    flag: "🇺🇸",
    color: "#dc2626",
    airport: "LAS",
    flight: "UA 220",
    gate: "B7",
    seat: "D5",
    class: "Economy",
    watermark:
      "https://images.unsplash.com/photo-1694855923511-cca12ccbd57c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFVuaXRlZCUyMFN0YXRlcy1sYXMlMjB2ZWdhc3xlbnwwfHwwfHx8MA%3D%3D?auto=format&fit=crop&w=2500&q=40"
  },

  Australia: {
    city: "Sydney",
    flag: "🇦🇺",
    color: "#0ea5e9",
    airport: "SYD",
    flight: "QF 12",
    gate: "A3",
    seat: "F2",
    class: "Business",
    watermark:
      "https://plus.unsplash.com/premium_photo-1697730247961-9066e1398257?w=60&auto=format&fit=crop&w=2500&q=40"
  },

  "New Zealand": {
    city: "Auckland",
    flag: "🇳🇿",
    color: "#22c55e",
    airport: "AKL",
    flight: "NZ 101",
    gate: "C5",
    seat: "B4",
    class: "Economy",
    watermark:
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=2500&q=40"
  },

  Germany: {
    city: "Frankfurt",
    flag: "🇩🇪",
    color: "#f59e0b",
    airport: "FRA",
    flight: "LH 760",
    gate: "D2",
    seat: "E6",
    class: "Business",
    watermark:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=2500&q=40"
  },

  Japan: {
    city: "Tokyo",
    flag: "🇯🇵",
    color: "#dc2626",
    airport: "HND",
    flight: "JL 707",
    gate: "D9",
    seat: "F5",
    class: "Business",
    watermark:
      "https://images.unsplash.com/photo-1505069446780-4ef442b5207f?auto=format&fit=crop&w=2500&q=40"
  }
};

const BoardingPass = () => {
  const { country } = useParams();
  const data = countryData[country];

  const now = new Date();

  const currentDate = now.toLocaleDateString("en-GB");
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
  <>
    {/* FULL SCREEN WATERMARK */}
    <div
      style={{
        ...styles.background,
        backgroundImage: `url(${data.watermark})`
      }}
    />

    {/* OVERLAY */}
    <div style={styles.overlay}></div>

    {/* MAIN CONTENT */}
    <div style={styles.page}>
      <h1 style={styles.welcome}>
        {country} {data.flag} - Welcome to {data.city}
      </h1>

      <div style={{ ...styles.card, borderLeft: `12px solid ${data.color}` }}>
        {/* LEFT */}
        <div style={styles.left}>
          <p style={styles.smallText}>BOARDING PASS</p>

          <h2 style={styles.city}>{data.city}</h2>

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
  </>
);
};

const styles = {
page: {
  minHeight: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "stretch",
  padding: "20px",
  boxSizing: "border-box"
},

background: {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",        // ✅ FIX (was 100vh ❌)
  height: "100vh",
  backgroundSize: "cover",  // ✅ better full-screen look
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundColor: "#373232",
  zIndex: -2
},

overlay: {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(255,255,255,0.75)",
  zIndex: -1
},

welcome: {
  fontSize: "36px",
  fontWeight: "bold",
  zIndex: 1,
  marginTop: "100px", 
},

card: {
  width: "100%",
  maxWidth: "100%",
  height: "100%",
  display: "flex",
  background: "rgba(255,255,255,0.9)",
  borderRadius: "2px",
  boxShadow: "none",
  overflow: "hidden",
  zIndex: 1,  // ✅ ensure no top spacing
},

  left: {
    flex: 2,
    padding: "20px",
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