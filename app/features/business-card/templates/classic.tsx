import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { BusinessCardTemplateProps } from "../types";

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "100%",
    padding: 18,
    fontSize: 8,
    fontFamily: "Helvetica",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: { flexDirection: "row", alignItems: "center", gap: 8 },
  logo: { width: 26, height: 26, objectFit: "contain" },
  company: { fontFamily: "Helvetica-Bold", fontSize: 10 },
  tagline: { color: "#6B7280", fontSize: 7, marginTop: 1 },
  name: { fontFamily: "Helvetica-Bold", fontSize: 14, marginTop: 2 },
  title: { fontSize: 8, color: "#6B7280", marginTop: 1 },
  divider: { height: 1, marginVertical: 6 },
  contacts: { fontSize: 7, gap: 2 },
  backCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  backCompany: { fontFamily: "Helvetica-Bold", fontSize: 14 },
  backTagline: { fontSize: 9 },
});

export function ClassicCardTemplate({ data, side }: BusinessCardTemplateProps) {
  if (side === "back") {
    return (
      <View
        style={{
          ...styles.card,
          backgroundColor: data.secondaryColor,
        }}
      >
        <View style={styles.backCenter}>
          <Text style={{ ...styles.backCompany, color: data.textColor }}>
            {data.company || data.name || "Your Company"}
          </Text>
          {data.tagline ? (
            <Text style={{ ...styles.backTagline, color: data.textColor, opacity: 0.8 }}>
              {data.tagline}
            </Text>
          ) : null}
          {data.website ? (
            <Text style={{ fontSize: 8, color: data.textColor, opacity: 0.7, marginTop: 4 }}>
              {data.website}
            </Text>
          ) : null}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View>
        <View style={styles.header}>
          {data.logo ? <Image src={data.logo} style={styles.logo} /> : null}
          <View>
            <Text style={styles.company}>{data.company || "Your Company"}</Text>
            {data.tagline ? (
              <Text style={styles.tagline}>{data.tagline}</Text>
            ) : null}
          </View>
        </View>
      </View>
      <View>
        <Text style={{ ...styles.name, color: data.primaryColor }}>
          {data.name || "Your Name"}
        </Text>
        <Text style={styles.title}>{data.title}</Text>
        <View
          style={{ ...styles.divider, backgroundColor: data.primaryColor }}
        />
        <View style={styles.contacts}>
          {data.email ? <Text>{data.email}</Text> : null}
          {data.phone ? <Text>{data.phone}</Text> : null}
          {data.website ? <Text>{data.website}</Text> : null}
          {data.address ? <Text>{data.address}</Text> : null}
        </View>
      </View>
    </View>
  );
}
