import { QRCodeCanvas } from "qrcode.react";

const Scanner = () => {

  // IMPORTANT: must be reachable from PHONE
  const qrValue = "https://phenomenal-klepon-ba6c29.netlify.app/scan";

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      
      <h2>Scan QR Code</h2>

      <QRCodeCanvas value={qrValue} size={250} />

      <p>Scan using any phone camera</p>

    </div>
  );
};

export default Scanner;