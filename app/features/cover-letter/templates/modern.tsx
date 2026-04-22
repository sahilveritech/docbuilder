import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { CoverLetterTemplateProps } from "../types";
import { formatDate } from "~/lib/utils";

const makeStyles = (accent: string) =>
  StyleSheet.create({
    page: {
      padding: 0,
      fontSize: 10.5,
      fontFamily: "Helvetica",
      color: "#0F172A",
      lineHeight: 1.55,
    },
    header: {
      backgroundColor: accent,
      padding: 40,
      color: "#ffffff",
    },
    headerName: {
      fontFamily: "Helvetica-Bold",
      fontSize: 22,
      letterSpacing: 0.5,
    },
    headerTitle: { fontSize: 11, opacity: 0.9, marginTop: 2 },
    headerMeta: {
      marginTop: 10,
      flexDirection: "row",
      gap: 14,
      flexWrap: "wrap",
    },
    headerMetaItem: { fontSize: 9, opacity: 0.95 },
    body: { padding: 40 },
    date: { marginBottom: 18, color: "#6B7280" },
    recipient: { marginBottom: 20 },
    recipientName: { fontFamily: "Helvetica-Bold" },
    subject: {
      fontFamily: "Helvetica-Bold",
      marginBottom: 14,
      color: accent,
    },
    salutation: { marginBottom: 10 },
    paragraph: { marginBottom: 10 },
    closing: { marginTop: 16 },
    signature: { marginTop: 28, fontFamily: "Helvetica-Bold" },
  });

export function ModernLetterTemplate({ data }: CoverLetterTemplateProps) {
  const styles = makeStyles(data.accent || "#4F46E5");
  const paragraphs = splitParagraphs(data.body);

  return (
    <Document title={`Cover Letter — ${data.sender.name || "Untitled"}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerName}>
            {data.sender.name || "Your Name"}
          </Text>
          {data.sender.title ? (
            <Text style={styles.headerTitle}>{data.sender.title}</Text>
          ) : null}
          <View style={styles.headerMeta}>
            {data.sender.email ? (
              <Text style={styles.headerMetaItem}>{data.sender.email}</Text>
            ) : null}
            {data.sender.phone ? (
              <Text style={styles.headerMetaItem}>{data.sender.phone}</Text>
            ) : null}
            {data.sender.address ? (
              <Text style={styles.headerMetaItem}>{data.sender.address}</Text>
            ) : null}
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.date}>{formatDate(data.date)}</Text>
          <View style={styles.recipient}>
            {data.recipient.name ? (
              <Text style={styles.recipientName}>{data.recipient.name}</Text>
            ) : null}
            {data.recipient.title ? <Text>{data.recipient.title}</Text> : null}
            {data.recipient.company ? <Text>{data.recipient.company}</Text> : null}
            {data.recipient.address ? <Text>{data.recipient.address}</Text> : null}
          </View>

          {data.subject ? <Text style={styles.subject}>{data.subject}</Text> : null}
          <Text style={styles.salutation}>{data.salutation}</Text>
          {paragraphs.map((p, i) => (
            <Text key={i} style={styles.paragraph}>
              {p}
            </Text>
          ))}

          <Text style={styles.closing}>{data.closing}</Text>
          <Text style={styles.signature}>
            {data.signature || data.sender.name}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

function splitParagraphs(body: string): string[] {
  return body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}
