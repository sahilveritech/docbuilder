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

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#111827",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: 18,
    borderBottomWidth: 2,
    borderBottomColor: "#111827",
  },
  brand: { fontFamily: "Helvetica-Bold", fontSize: 20, marginBottom: 6 },
  muted: { color: "#6B7280" },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
    color: "#6B7280",
  },
  partiesRow: { flexDirection: "row", gap: 24, marginTop: 24 },
  partyBlock: { flex: 1 },
  partyName: { fontFamily: "Helvetica-Bold", marginBottom: 2 },
  metaRow: {
    marginTop: 18,
    padding: 12,
    backgroundColor: "#F9FAFB",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaItem: { flex: 1 },
  metaLabel: {
    fontSize: 8,
    textTransform: "uppercase",
    color: "#6B7280",
    marginBottom: 2,
    letterSpacing: 0.8,
  },
  metaValue: { fontFamily: "Helvetica-Bold" },
  table: { marginTop: 22, borderTopWidth: 1, borderTopColor: "#111827" },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#111827",
  },
  th: { fontFamily: "Helvetica-Bold", fontSize: 9, color: "#6B7280" },
  tr: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E5E7EB",
  },
  td: {},
  colDesc: { flex: 3 },
  colQty: { flex: 1, textAlign: "right" },
  colPrice: { flex: 1, textAlign: "right" },
  colTotal: { flex: 1.2, textAlign: "right" },
  totals: {
    marginTop: 18,
    alignSelf: "flex-end",
    width: "50%",
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
  },
  grandTotalRow: {
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 1.5,
    borderTopColor: "#111827",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  grandTotalLabel: { fontFamily: "Helvetica-Bold", fontSize: 12 },
  grandTotalValue: { fontFamily: "Helvetica-Bold", fontSize: 12 },
  notes: { marginTop: 28, color: "#374151" },
  logo: { width: 52, height: 52, objectFit: "contain", marginBottom: 8 },
});

export function ClassicInvoiceTemplate({ data, totals }: InvoiceTemplateProps) {
  return (
    <Document title={`Invoice ${data.number}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View>
            {data.logo ? <Image src={data.logo} style={styles.logo} /> : null}
            <Text style={styles.brand}>{data.sender.name || "Your Business"}</Text>
            {data.sender.address ? (
              <Text style={styles.muted}>{data.sender.address}</Text>
            ) : null}
            {data.sender.email ? (
              <Text style={styles.muted}>{data.sender.email}</Text>
            ) : null}
            {data.sender.phone ? (
              <Text style={styles.muted}>{data.sender.phone}</Text>
            ) : null}
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text
              style={{
                fontFamily: "Helvetica-Bold",
                fontSize: 28,
                letterSpacing: 4,
              }}
            >
              INVOICE
            </Text>
            <Text style={styles.muted}>#{data.number}</Text>
          </View>
        </View>

        <View style={styles.partiesRow}>
          <View style={styles.partyBlock}>
            <Text style={styles.sectionTitle}>Bill To</Text>
            <Text style={styles.partyName}>{data.client.name || "—"}</Text>
            {data.client.address ? (
              <Text style={styles.muted}>{data.client.address}</Text>
            ) : null}
            {data.client.email ? (
              <Text style={styles.muted}>{data.client.email}</Text>
            ) : null}
            {data.client.phone ? (
              <Text style={styles.muted}>{data.client.phone}</Text>
            ) : null}
          </View>
          <View style={styles.partyBlock}>
            <Text style={styles.sectionTitle}>From</Text>
            <Text style={styles.partyName}>{data.sender.name || "—"}</Text>
            {data.sender.website ? (
              <Text style={styles.muted}>{data.sender.website}</Text>
            ) : null}
            {data.sender.taxId ? (
              <Text style={styles.muted}>Tax ID: {data.sender.taxId}</Text>
            ) : null}
          </View>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Issued</Text>
            <Text style={styles.metaValue}>{formatDate(data.issueDate)}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Due</Text>
            <Text style={styles.metaValue}>{formatDate(data.dueDate)}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Amount</Text>
            <Text style={styles.metaValue}>
              {formatCurrency(totals.total, data.currency)}
            </Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.th, styles.colDesc]}>Description</Text>
            <Text style={[styles.th, styles.colQty]}>Qty</Text>
            <Text style={[styles.th, styles.colPrice]}>Price</Text>
            <Text style={[styles.th, styles.colTotal]}>Total</Text>
          </View>
          {data.items.map((item) => (
            <View key={item.id} style={styles.tr}>
              <Text style={[styles.td, styles.colDesc]}>
                {item.description || "—"}
              </Text>
              <Text style={[styles.td, styles.colQty]}>{item.quantity}</Text>
              <Text style={[styles.td, styles.colPrice]}>
                {formatCurrency(item.unitPrice, data.currency)}
              </Text>
              <Text style={[styles.td, styles.colTotal]}>
                {formatCurrency(item.quantity * item.unitPrice, data.currency)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totals}>
          <View style={styles.totalsRow}>
            <Text>Subtotal</Text>
            <Text>{formatCurrency(totals.subtotal, data.currency)}</Text>
          </View>
          {totals.discountAmount > 0 ? (
            <View style={styles.totalsRow}>
              <Text>Discount</Text>
              <Text>- {formatCurrency(totals.discountAmount, data.currency)}</Text>
            </View>
          ) : null}
          {totals.taxAmount > 0 ? (
            <View style={styles.totalsRow}>
              <Text>Tax ({data.taxRate}%)</Text>
              <Text>{formatCurrency(totals.taxAmount, data.currency)}</Text>
            </View>
          ) : null}
          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>Total</Text>
            <Text style={styles.grandTotalValue}>
              {formatCurrency(totals.total, data.currency)}
            </Text>
          </View>
        </View>

        {data.notes ? (
          <View style={styles.notes}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text>{data.notes}</Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
}
