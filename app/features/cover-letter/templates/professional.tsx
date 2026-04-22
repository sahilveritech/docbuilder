import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { CoverLetterTemplateProps } from "../types";
import { formatDate } from "~/lib/utils";

const makeStyles = (accent: string) =>
  StyleSheet.create({
    page: {
      padding: 0,
      fontSize: 10.5,
      fontFamily: "Helvetica",
      color: "#111827",
      lineHeight: 1.6,
    },
    root: { flexDirection: "row", minHeight: "100%" },
    sidebar: {
      width: 180,
      backgroundColor: "#F3F4F6",
      padding: 28,
      borderRightWidth: 3,
      borderRightColor: accent,
    },
    name: { fontFamily: "Helvetica-Bold", fontSize: 15 },
    title: { fontSize: 10, color: "#374151", marginTop: 2 },
    sidebarLabel: {
      fontSize: 8,
      textTransform: "uppercase",
      letterSpacing: 1,
      color: accent,
      marginTop: 18,
      marginBottom: 4,
      fontFamily: "Helvetica-Bold",
    },
    sidebarText: { fontSize: 9, color: "#111827" },
    content: { flex: 1, padding: 36 },
    date: { marginBottom: 16, color: "#6B7280" },
    recipient: { marginBottom: 20 },
    recipientName: { fontFamily: "Helvetica-Bold" },
    subject: { fontFamily: "Helvetica-Bold", marginBottom: 14 },
    salutation: { marginBottom: 10 },
    paragraph: { marginBottom: 10 },
    closing: { marginTop: 16 },
    signature: { marginTop: 28, fontFamily: "Helvetica-Bold" },
  });

export function ProfessionalLetterTemplate({ data }: CoverLetterTemplateProps) {
  const styles = makeStyles(data.accent || "#4F46E5");
  const paragraphs = splitParagraphs(data.body);

  return (
    <Document title={`Cover Letter — ${data.sender.name || "Untitled"}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.root}>
          <View style={styles.sidebar}>
            <Text style={styles.name}>{data.sender.name || "Your Name"}</Text>
            {data.sender.title ? (
              <Text style={styles.title}>{data.sender.title}</Text>
            ) : null}

            <Text style={styles.sidebarLabel}>Contact</Text>
            {data.sender.email ? (
              <Text style={styles.sidebarText}>{data.sender.email}</Text>
            ) : null}
            {data.sender.phone ? (
              <Text style={styles.sidebarText}>{data.sender.phone}</Text>
            ) : null}
            {data.sender.address ? (
              <Text style={styles.sidebarText}>{data.sender.address}</Text>
            ) : null}

            <Text style={styles.sidebarLabel}>Sent</Text>
            <Text style={styles.sidebarText}>{formatDate(data.date)}</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.date}>{formatDate(data.date)}</Text>
            <View style={styles.recipient}>
              {data.recipient.name ? (
                <Text style={styles.recipientName}>{data.recipient.name}</Text>
              ) : null}
              {data.recipient.title ? <Text>{data.recipient.title}</Text> : null}
              {data.recipient.company ? (
                <Text>{data.recipient.company}</Text>
              ) : null}
              {data.recipient.address ? (
                <Text>{data.recipient.address}</Text>
              ) : null}
            </View>

            {data.subject ? (
              <Text style={styles.subject}>Re: {data.subject}</Text>
            ) : null}
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
