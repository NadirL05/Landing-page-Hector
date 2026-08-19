import { ImageResponse } from "next/og";

export const alt = "Hector — pas un logiciel, un collaborateur. Pour CGPI indépendants.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Image OG statique générée au build. Palette reprise de app/globals.css
// (@theme inline) : papier ivoire, encre navy, or en filet seul — pas de
// remplissage plein, cohérent avec la DA "lettre de cabinet".
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#F4F1E9",
          color: "#14171F",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div style={{ width: "48px", height: "2px", backgroundColor: "#B08D3F" }} />
          <span
            style={{
              fontSize: "22px",
              letterSpacing: "0.14em",
              color: "#5B5F6B",
              textTransform: "uppercase",
            }}
          >
            Pour CGPI indépendants
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <span
            style={{
              fontSize: "104px",
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
          >
            HECTOR
          </span>
          <span style={{ fontSize: "36px", color: "#40444F", maxWidth: "900px" }}>
            Pas un logiciel, un collaborateur.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div style={{ width: "48px", height: "2px", backgroundColor: "#B08D3F" }} />
          <span style={{ fontSize: "22px", color: "#5B5F6B" }}>
            hector.agentimpact.fr
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
