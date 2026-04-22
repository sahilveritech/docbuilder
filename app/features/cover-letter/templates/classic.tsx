import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { CoverLetterTemplateProps } from "../types";
import { formatDate } from "~/lib/utils";

const styles = StyleSheet.create({
  page: {
    padding: 64,
    fontSize: 11,
    fontFamily: "Times-Roman",
    color: "#111827",
    lineHeight: 1.55,
  },
  header: { textAlign: "center", marginBottom: 28 },
  senderName: {
    fontFamily: "Times-Bold",
    fontSize: 16,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  senderMeta: { fontSize: 9, color: "#6B7280", marginTop: 4 },
  divider: {
    height: 0.5,
    backgroundColor: "#111827",
    marginTop: 10,
  },
  date: { marginBottom: 18 },
  recipient: { marginBottom: 24 },
  recipientName: { fontFamily: "Times-Bold" },
  subject: {
    fontFamily: "Times-Bold",
    marginBottom: 14,
    textDecoration: "underline",
  },
  salutation: { marginBottom: 12 },
  paragraph: { marginBottom: 12, textAlign: "justify" },
  closing: { marginTop: 18 },
  signature: { marginTop: 36, fontFamily: "Times-Bold" },
});

export function ClassicLetterTemplate({ data }: CoverLetterTemplateProps) {
  const paragraphs = splitParagraphs(data.body);
  return (
    <Document title={`Cover Letter — ${data.sender.name || "Untitled"}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.senderName}>
            {data.sender.name || "Your Name"}
          </Text>
          <Text style={styles.senderMeta}>
            {[data.sender.address, data.sender.phone, data.sender.email]
              .filter(Boolean)
              .join("  ·  ")}
          </Text>
          <View style={styles.divider} />
        </View>

        <Text style={styles.date}>{formatDate(data.date)}</Text>

        <View style={styles.recipient}>
          {data.recipient.name ? (
            <Text style={styles.recipientName}>{data.recipient.name}</Text>
          ) : null}
          {data.recipient.title ? <Text>{data.recipient.title}</Text> : null}
          {data.recipient.company ? <Text>{data.recipient.company}</Text> : null}
          {data.recipient.address ? <Text>{data.recipient.address}</Text> : null}
        </View>

        {data.subject ? <Text style={styles.subject}>Re: {data.subject}</Text> : null}
        <Text style={styles.salutation}>{data.salutation}</Text>
        {paragraphs.map((p, i) => (
          <Text key={i} style={styles.paragraph}>
            {p}
          </Text>
        ))}

        <Text style={styles.closing}>{data.closing}</Text>
        <Text style={styles.signature}>{data.signature || data.sender.name}</Text>
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
