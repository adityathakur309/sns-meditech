import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#101820",
          padding: "72px",
        }}
      >
        <div style={{ color: "#F07C00", fontSize: 22, letterSpacing: 6, textTransform: "uppercase" }}>
          SNS Meditech
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ color: "white", fontSize: 64, lineHeight: 1.1, maxWidth: 860 }}>
            Medical technology for the OR, ICU, and neonatal unit.
          </div>
          <div style={{ color: "rgba(255,255,255,0.62)", fontSize: 28 }}>
            Distributor and healthcare consultant · Chandigarh
          </div>
        </div>
      </div>
    ),
    size,
  );
}
