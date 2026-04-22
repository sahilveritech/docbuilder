import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { InvoiceTemplateProps } from "../types";
import { formatCurrency, formatDate } from "./prepare-data";

const makeStyles = (accent: string) =>
  StyleSheet.create({
    page: {
      padding: 0,
      fontSize: 10,
      fontFamily: "Helvetica",
      color: "#0F172A",
    },
    banner: {
      backgroundColor: accent,
      color: "#ffffff",
      padding: 40,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
    brand: {
      fontFamily: "Helvetica-Bold",
      fontSize: 22,
      color: "#ffffff",
    },
    bannerMuted: { color: "#E5E7EB", marginTop: 2 },
    invoiceLabel: {
      fontFamily: "Helvetica-Bold",
      fontSize: 32,
      color: "#ffffff",
      letterSpacing: 2,
    },
    body: { padding: 40 },
    partiesRow: { flexDirection: "row", gap: 24, marginBottom: 24 },
    partyBlock: {
      flex: 1,
      backgroundColor: "#F9FAFB",
      padding: 14,
      borderRadius: 6,
    },
    label: {
      fontSize: 8,
      textTransform: "uppercase",
      color: "#6B7280",
      letterSpacing: 1,
      marginBottom: 4,
    },
    partyName: { fontFamily: "Helvetica-Bold", marginBottom: 2 },
    muted: { color: "#6B7280" },
    tableHeader: {
      flexDirection: "row",
      paddingVertical: 8,
      paddingHorizontal: 8,
      backgroundColor: accent,
      color: "#ffffff",
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    },
    th: { fontFamily: "Helvetica-Bold", fontSize: 9, color: "#ffffff" },
    tr: {
      flexDirection: "row",
      paddingVertical: 8,
      paddingHorizontal: 8,
      borderBottomWidth: 0.5,
      borderBottomColor: "#E5E7EB",
    },
    colDesc: { flex: 3 },
    colQty: { flex: 1, textAlign: "right" },
    colPrice: { flex: 1, textAlign: "right" },
    colTotal: { flex: 1.2, textAlign: "right" },
    totals: { marginTop: 20, alignSelf: "flex-end", width: "50%" },
    totalsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 3,
    },
    grandTotal: {
      marginTop: 6,
      padding: 10,
      backgroundColor: accent,
      color: "#ffffff",
      borderRadius: 4,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    grandTotalText: {
      fontFamily: "Helvetica-Bold",
      fontSize: 12,
      color: "#ffffff",
    },
    notes: {
      marginTop: 28,
      padding: 14,
      borderLeftWidth: 3,
      borderLeftColor: accent,
      backgroundColor: "#F9FAFB",
    },
    logo: { width: 40, height: 40, objectFit: "contain", marginBottom: 8 },
  });

export function ModernInvoiceTemplate({ data, totals }: InvoiceTemplateProps) {
  const styles = makeStyles(data.accent || "#4F46E5");
  return (
    <Document title={`Invoice ${data.number}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.banner}>
          <View>
            {data.logo ? <Image src={data.logo} style={styles.logo} /> : null}
            <Text style={styles.brand}>{data.sender.name || "Your Business"}</Text>
            <Text style={styles.bannerMuted}>
              {data.sender.email || data.sender.website || ""}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.invoiceLabel}>INVOICE</Text>
            <Text style={styles.bannerMuted}>#{data.number}</Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.partiesRow}>
            <View style={styles.partyBlock}>
              <Text style={styles.label}>Bill To</Text>
              <Text style={styles.partyName}>{data.client.name || "—"}</Text>
              {data.client.email ? (
                <Text style={styles.muted}>{data.client.email}</Text>
              ) : null}
              {data.client.address ? (
                <Text style={styles.muted}>{data.client.address}</Text>
              ) : null}
            </View>
            <View style={styles.partyBlock}>
              <Text style={styles.label}>Details</Text>
              <Text style={styles.partyName}>
                {formatDate(data.issueDate)}
              </Text>
              <Text style={styles.muted}>Due {formatDate(data.dueDate)}</Text>
            </View>
          </View>

          <View style={styles.tableHeader}>
            <Text style={[styles.th, styles.colDesc]}>Description</Text>
            <Text style={[styles.th, styles.colQty]}>Qty</Text>
            <Text style={[styles.th, styles.colPrice]}>Price</Text>
            <Text style={[styles.th, styles.colTotal]}>Total</Text>
          </View>
          {data.items.map((item) => (
            <View key={item.id} style={styles.tr}>
              <Text style={styles.colDesc}>{item.description || "—"}</Text>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colPrice}>
                {formatCurrency(item.unitPrice, data.currency)}
              </Text>
              <Text style={styles.colTotal}>
                {formatCurrency(item.quantity * item.unitPrice, data.currency)}
              </Text>
            </View>
          ))}

          <View style={styles.totals}>
            <View style={styles.totalsRow}>
              <Text>Subtotal</Text>
              <Text>{formatCurrency(totals.subtotal, data.currency)}</Text>
            </View>
            {totals.discountAmount > 0 ? (
              <View style={styles.totalsRow}>
                <Text>Discount</Text>
                <Text>
                  - {formatCurrency(totals.discountAmount, data.currency)}
                </Text>
              </View>
            ) : null}
            {totals.taxAmount > 0 ? (
              <View style={styles.totalsRow}>
                <Text>Tax ({data.taxRate}%)</Text>
                <Text>{formatCurrency(totals.taxAmount, data.currency)}</Text>
              </View>
            ) : null}
            <View style={styles.grandTotal}>
              <Text style={styles.grandTotalText}>Total</Text>
              <Text style={styles.grandTotalText}>
                {formatCurrency(totals.total, data.currency)}
              </Text>
            </View>
          </View>

          {data.notes ? (
            <View style={styles.notes}>
              <Text style={styles.label}>Notes</Text>
              <Text>{data.notes}</Text>
            </View>
          ) : null}
        </View>
      </Page>
    </Document>
  );
}
