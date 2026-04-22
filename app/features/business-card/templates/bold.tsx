import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { BusinessCardTemplateProps } from "../types";

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "100%",
    padding: 16,
    fontSize: 8,
    fontFamily: "Helvetica",
    justifyContent: "space-between",
  },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  logo: { width: 28, height: 28, objectFit: "contain" },
  nameWrap: { marginTop: "auto" },
  name: { fontFamily: "Helvetica-Bold", fontSize: 18, letterSpacing: 0.5 },
  title: { fontSize: 9, marginTop: 2, opacity: 0.85 },
  bottomRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 10,
  },
  contacts: { fontSize: 7, opacity: 0.9, gap: 2 },
  back: {
    width: "100%",
    height: "100%",
    padding: 18,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
});

export function BoldCardTemplate({ data, side }: BusinessCardTemplateProps) {
  if (side === "back") {
    return (
      <View
        style={{
          ...styles.back,
          backgroundColor: data.secondaryColor,
        }}
      >
        <Text
          style={{
            fontFamily: "Helvetica-Bold",
            fontSize: 22,
            color: data.primaryColor,
            letterSpacing: 1,
          }}
        >
          {(data.company || data.name || "HELLO").toUpperCase()}
        </Text>
        {data.tagline ? (
          <Text style={{ fontSize: 8, color: data.textColor, opacity: 0.8 }}>
            {data.tagline}
          </Text>
        ) : null}
      </View>
    );
  }

  return (
    <View
      style={{
        ...styles.card,
        backgroundColor: data.primaryColor,
      }}
    >
      <View style={styles.topRow}>
        <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 9, color: data.textColor }}>
          {data.company || "Your Company"}
        </Text>
        {data.logo ? <Image src={data.logo} style={styles.logo} /> : null}
      </View>
      <View style={styles.nameWrap}>
        <Text style={{ ...styles.name, color: data.textColor }}>
          {data.name || "Your Name"}
        </Text>
        <Text style={{ ...styles.title, color: data.textColor }}>{data.title}</Text>
      </View>
      <View style={styles.bottomRow}>
        <View style={styles.contacts}>
          {data.email ? (
            <Text style={{ color: data.textColor }}>{data.email}</Text>
          ) : null}
          {data.phone ? (
            <Text style={{ color: data.textColor }}>{data.phone}</Text>
          ) : null}
        </View>
        <View style={{ ...styles.contacts, alignItems: "flex-end" }}>
          {data.website ? (
            <Text style={{ color: data.textColor }}>{data.website}</Text>
          ) : null}
          {data.address ? (
            <Text style={{ color: data.textColor }}>{data.address}</Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}
