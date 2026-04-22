import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { BusinessCardTemplateProps } from "../types";

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "100%",
    padding: 20,
    fontSize: 8,
    fontFamily: "Helvetica",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
  },
  top: { flexDirection: "row", alignItems: "center", gap: 6 },
  logo: { width: 20, height: 20, objectFit: "contain" },
  companyLine: { fontSize: 8, color: "#111827", letterSpacing: 1, textTransform: "uppercase" },
  name: { fontFamily: "Helvetica-Bold", fontSize: 16 },
  title: { fontSize: 8, color: "#6B7280" },
  rule: { height: 1, width: 28, marginVertical: 6 },
  contact: { fontSize: 7, color: "#374151" },
  back: {
    width: "100%",
    height: "100%",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
});

export function MinimalCardTemplate({ data, side }: BusinessCardTemplateProps) {
  if (side === "back") {
    return (
      <View style={styles.back}>
        <View style={{ ...styles.rule, backgroundColor: data.primaryColor, width: 40 }} />
        <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 9, letterSpacing: 2, textTransform: "uppercase" }}>
          {data.company || data.name || "Your Company"}
        </Text>
        {data.website ? (
          <Text style={{ fontSize: 8, color: "#6B7280" }}>{data.website}</Text>
        ) : null}
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        {data.logo ? <Image src={data.logo} style={styles.logo} /> : null}
        <Text style={styles.companyLine}>{data.company || "Your Company"}</Text>
      </View>
      <View>
        <Text style={styles.name}>{data.name || "Your Name"}</Text>
        <Text style={styles.title}>{data.title}</Text>
        <View style={{ ...styles.rule, backgroundColor: data.primaryColor }} />
        {data.email ? <Text style={styles.contact}>{data.email}</Text> : null}
        {data.phone ? <Text style={styles.contact}>{data.phone}</Text> : null}
        {data.website ? <Text style={styles.contact}>{data.website}</Text> : null}
      </View>
    </View>
  );
}
