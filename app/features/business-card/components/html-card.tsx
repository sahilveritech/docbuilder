import { forwardRef } from "react";
import type { BusinessCard } from "~/services/business-card.service";
import type { CardTemplateKey } from "../templates/map";

export interface HtmlCardProps {
  data: BusinessCard;
  side: "front" | "back";
  template: CardTemplateKey;
  scale?: number;
}

const CARD_WIDTH_IN = 3.5;
const CARD_HEIGHT_IN = 2;
const DPI = 96;

export const HtmlCard = forwardRef<HTMLDivElement, HtmlCardProps>(
  ({ data, side, template, scale = 1 }, ref) => {
    const width = CARD_WIDTH_IN * DPI * scale;
    const height = CARD_HEIGHT_IN * DPI * scale;

    return (
      <div
        ref={ref}
        style={{
          width,
          height,
          backgroundColor: "#ffffff",
          boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
          borderRadius: 8 * scale,
          overflow: "hidden",
          fontFamily: "Inter, system-ui, sans-serif",
          position: "relative",
        }}
      >
        {renderCard(data, side, template, scale)}
      </div>
    );
  },
);

HtmlCard.displayName = "HtmlCard";

function renderCard(
  data: BusinessCard,
  side: "front" | "back",
  template: CardTemplateKey,
  scale: number,
) {
  if (template === "modern") return <ModernCard data={data} side={side} scale={scale} />;
  if (template === "bold") return <BoldCard data={data} side={side} scale={scale} />;
  if (template === "minimal") return <MinimalCard data={data} side={side} scale={scale} />;
  return <ClassicCard data={data} side={side} scale={scale} />;
}

interface Props {
  data: BusinessCard;
  side: "front" | "back";
  scale: number;
}

const px = (n: number, scale: number) => `${n * scale}px`;

function ClassicCard({ data, side, scale }: Props) {
  if (side === "back") {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: px(18, scale),
          background: data.secondaryColor,
          color: data.textColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: px(4, scale),
        }}
      >
        <div style={{ fontWeight: 700, fontSize: px(14, scale) }}>
          {data.company || data.name || "Your Company"}
        </div>
        {data.tagline ? (
          <div style={{ fontSize: px(9, scale), opacity: 0.85 }}>{data.tagline}</div>
        ) : null}
        {data.website ? (
          <div style={{ fontSize: px(8, scale), opacity: 0.75, marginTop: px(4, scale) }}>
            {data.website}
          </div>
        ) : null}
      </div>
    );
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: px(18, scale),
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "#111827",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: px(8, scale) }}>
        {data.logo ? (
          <img
            src={data.logo}
            alt=""
            style={{ width: px(26, scale), height: px(26, scale), objectFit: "contain" }}
          />
        ) : null}
        <div>
          <div style={{ fontWeight: 700, fontSize: px(10, scale) }}>
            {data.company || "Your Company"}
          </div>
          {data.tagline ? (
            <div style={{ color: "#6B7280", fontSize: px(7, scale) }}>
              {data.tagline}
            </div>
          ) : null}
        </div>
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: px(14, scale), color: data.primaryColor }}>
          {data.name || "Your Name"}
        </div>
        <div style={{ fontSize: px(8, scale), color: "#6B7280" }}>{data.title}</div>
        <div
          style={{
            height: 1,
            background: data.primaryColor,
            margin: `${px(6, scale)} 0`,
          }}
        />
        <div style={{ fontSize: px(7, scale), lineHeight: 1.5 }}>
          {data.email ? <div>{data.email}</div> : null}
          {data.phone ? <div>{data.phone}</div> : null}
          {data.website ? <div>{data.website}</div> : null}
          {data.address ? <div>{data.address}</div> : null}
        </div>
      </div>
    </div>
  );
}

function ModernCard({ data, side, scale }: Props) {
  if (side === "back") {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: data.primaryColor,
          color: data.textColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: px(4, scale),
          padding: px(18, scale),
          textAlign: "center",
        }}
      >
        {data.logo ? (
          <img
            src={data.logo}
            alt=""
            style={{ width: px(36, scale), height: px(36, scale), objectFit: "contain" }}
          />
        ) : null}
        <div style={{ fontWeight: 700, fontSize: px(14, scale) }}>
          {data.company || data.name || "Your Company"}
        </div>
        {data.tagline ? (
          <div style={{ fontSize: px(9, scale), opacity: 0.85 }}>{data.tagline}</div>
        ) : null}
      </div>
    );
  }
  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <div
        style={{
          width: "38%",
          background: data.primaryColor,
          color: data.textColor,
          padding: px(14, scale),
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: px(4, scale),
        }}
      >
        {data.logo ? (
          <img
            src={data.logo}
            alt=""
            style={{
              width: px(28, scale),
              height: px(28, scale),
              objectFit: "contain",
              marginBottom: px(4, scale),
            }}
          />
        ) : null}
        <div style={{ fontWeight: 700, fontSize: px(11, scale) }}>
          {data.company || "Your Company"}
        </div>
        {data.tagline ? (
          <div style={{ fontSize: px(7, scale), opacity: 0.85 }}>
            {data.tagline}
          </div>
        ) : null}
      </div>
      <div
        style={{
          flex: 1,
          padding: px(14, scale),
          color: "#111827",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: px(3, scale),
        }}
      >
        <div style={{ fontWeight: 700, fontSize: px(14, scale) }}>
          {data.name || "Your Name"}
        </div>
        <div style={{ fontSize: px(8, scale), color: "#6B7280", marginBottom: px(6, scale) }}>
          {data.title}
        </div>
        <div style={{ fontSize: px(7, scale), lineHeight: 1.6, color: "#374151" }}>
          {data.email ? <div>{data.email}</div> : null}
          {data.phone ? <div>{data.phone}</div> : null}
          {data.website ? <div>{data.website}</div> : null}
          {data.address ? <div>{data.address}</div> : null}
        </div>
      </div>
    </div>
  );
}

function BoldCard({ data, side, scale }: Props) {
  if (side === "back") {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: data.secondaryColor,
          padding: px(18, scale),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: px(6, scale),
        }}
      >
        <div
          style={{
            fontWeight: 800,
            fontSize: px(22, scale),
            color: data.primaryColor,
            letterSpacing: px(1, scale),
            textTransform: "uppercase",
          }}
        >
          {data.company || data.name || "HELLO"}
        </div>
        {data.tagline ? (
          <div style={{ fontSize: px(8, scale), color: data.textColor, opacity: 0.8 }}>
            {data.tagline}
          </div>
        ) : null}
      </div>
    );
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: data.primaryColor,
        padding: px(16, scale),
        color: data.textColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ fontWeight: 700, fontSize: px(9, scale) }}>
          {data.company || "Your Company"}
        </div>
        {data.logo ? (
          <img
            src={data.logo}
            alt=""
            style={{ width: px(28, scale), height: px(28, scale), objectFit: "contain" }}
          />
        ) : null}
      </div>
      <div style={{ marginTop: "auto" }}>
        <div style={{ fontWeight: 800, fontSize: px(18, scale), letterSpacing: px(0.5, scale) }}>
          {data.name || "Your Name"}
        </div>
        <div style={{ fontSize: px(9, scale), opacity: 0.9 }}>{data.title}</div>
      </div>
      <div
        style={{
          marginTop: px(10, scale),
          display: "flex",
          justifyContent: "space-between",
          fontSize: px(7, scale),
          opacity: 0.9,
        }}
      >
        <div>
          {data.email ? <div>{data.email}</div> : null}
          {data.phone ? <div>{data.phone}</div> : null}
        </div>
        <div style={{ textAlign: "right" }}>
          {data.website ? <div>{data.website}</div> : null}
          {data.address ? <div>{data.address}</div> : null}
        </div>
      </div>
    </div>
  );
}

function MinimalCard({ data, side, scale }: Props) {
  if (side === "back") {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: px(20, scale),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: px(4, scale),
          color: "#111827",
        }}
      >
        <div style={{ width: px(40, scale), height: 1, background: data.primaryColor }} />
        <div
          style={{
            fontWeight: 700,
            fontSize: px(9, scale),
            letterSpacing: px(2, scale),
            textTransform: "uppercase",
          }}
        >
          {data.company || data.name || "Your Company"}
        </div>
        {data.website ? (
          <div style={{ fontSize: px(8, scale), color: "#6B7280" }}>{data.website}</div>
        ) : null}
      </div>
    );
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: px(20, scale),
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "#111827",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: px(6, scale) }}>
        {data.logo ? (
          <img
            src={data.logo}
            alt=""
            style={{ width: px(20, scale), height: px(20, scale), objectFit: "contain" }}
          />
        ) : null}
        <div
          style={{
            fontSize: px(8, scale),
            letterSpacing: px(1, scale),
            textTransform: "uppercase",
          }}
        >
          {data.company || "Your Company"}
        </div>
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: px(16, scale) }}>
          {data.name || "Your Name"}
        </div>
        <div style={{ fontSize: px(8, scale), color: "#6B7280" }}>{data.title}</div>
        <div
          style={{
            width: px(28, scale),
            height: 1,
            background: data.primaryColor,
            margin: `${px(6, scale)} 0`,
          }}
        />
        <div style={{ fontSize: px(7, scale), color: "#374151", lineHeight: 1.6 }}>
          {data.email ? <div>{data.email}</div> : null}
          {data.phone ? <div>{data.phone}</div> : null}
          {data.website ? <div>{data.website}</div> : null}
        </div>
      </div>
    </div>
  );
}
