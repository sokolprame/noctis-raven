import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "NOCTIS — Artist, Designer & Web Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050505",
          color: "#f5f5f5",
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ letterSpacing: 12, fontSize: 28, color: "#a1a1a1" }}>NOCTIS</span>
          <span style={{ width: 94, height: 94, borderRadius: 999, background: "#b3002d" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 110, letterSpacing: -8, fontWeight: 600, lineHeight: 0.9 }}>
            RAVEN
          </div>
          <div style={{ fontSize: 42, letterSpacing: 12, color: "#a1a1a1" }}>
            ARTIST / DESIGNER / DEVELOPER
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <span style={{ fontSize: 28, letterSpacing: 10, color: "#a1a1a1" }}>DIGITAL WORLDS</span>
          <span style={{ fontSize: 28, color: "#ff1a4d" }}>© 2026</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
