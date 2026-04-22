import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { BusinessCardTemplateProps } from "../types";

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "100%",
    fontSize: 8,
    fontFamily: "Helvetica",
    flexDirection: "row",
  },
  sidebar: {
    width: "38%",
    padding: 14,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 4,
  },
  logo: { width: 28, height: 28, objectFit: "contain", marginBottom: 4 },
  company: { fontFamily: "Helvetica-Bold", fontSize: 11 },
  tagline: { fontSize: 7, opacity: 0.8 },
  body: {
    flex: 1,
    padding: 14,
    justifyContent: "center",
    gap: 3,
    backgroundColor: "#ffffff",
  },
  name: { fontFamily: "Helvetica-Bold", fontSize: 14 },
  title: { fontSize: 8, color: "#6B7280", marginBottom: 6 },
  contactRow: { fontSize: 7, color: "#374151" },
  backRoot: {
    width: "100%",
    height: "100%",
    padding: 18,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
});

export function ModernCardTemplate({ data, side }: BusinessCardTemplateProps) {
  if (side === "back") {
    return (
      <View
        style={{
          ...styles.backRoot,
          backgroundColor: data.primaryColor,
        }}
      >
        {data.logo ? (
          <Image src={data.logo} style={{ width: 36, height: 36, objectFit: "contain" }} />
        ) : null}
        <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 14, color: data.textColor }}>
          {data.company || data.name || "Your Company"}
        </Text>
        {data.tagline ? (
          <Text style={{ fontSize: 9, color: data.textColor, opacity: 0.85 }}>
            {data.tagline}
          </Text>
        ) : null}
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View
        style={{
          ...styles.sidebar,
          backgroundColor: data.primaryColor,
        }}
      >
        {data.logo ? <Image src={data.logo} style={styles.logo} /> : null}
        <Text style={{ ...styles.company, color: data.textColor }}>
          {data.company || "Your Company"}
        </Text>
        {data.tagline ? (
          <Text style={{ ...styles.tagline, color: data.textColor }}>
            {data.tagline}
          </Text>
        ) : null}
      </View>
      <View style={styles.body}>
        <Text style={styles.name}>{data.name || "Your Name"}</Text>
        <Text style={styles.title}>{data.title}</Text>
        {data.email ? <Text style={styles.contactRow}>{data.email}</Text> : null}
        {data.phone ? <Text style={styles.contactRow}>{data.phone}</Text> : null}
        {data.website ? <Text style={styles.contactRow}>{data.website}</Text> : null}
        {data.address ? <Text style={styles.contactRow}>{data.address}</Text> : null}
      </View>
    </View>
  );
}
