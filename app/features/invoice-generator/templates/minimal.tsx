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
    padding: 60,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#111827",
  },
  header: { marginBottom: 32 },
  brand: { fontFamily: "Helvetica-Bold", fontSize: 14, marginBottom: 4 },
  muted: { color: "#6B7280" },
  invoiceMeta: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  invoiceNumber: {
    fontFamily: "Helvetica-Bold",
    fontSize: 18,
    letterSpacing: 1,
  },
  dates: { textAlign: "right", color: "#6B7280" },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 20,
  },
  partiesRow: { flexDirection: "row", gap: 40, marginBottom: 24 },
  partyBlock: { flex: 1 },
  label: {
    fontSize: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#6B7280",
    marginBottom: 6,
  },
  partyName: { fontFamily: "Helvetica-Bold", marginBottom: 2 },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#111827",
  },
  th: { fontSize: 8, textTransform: "uppercase", color: "#6B7280", letterSpacing: 1 },
  tr: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F3F4F6",
  },
  colDesc: { flex: 3 },
  colQty: { flex: 1, textAlign: "right" },
  colPrice: { flex: 1, textAlign: "right" },
  colTotal: { flex: 1.2, textAlign: "right" },
  totals: { marginTop: 24, alignSelf: "flex-end", width: "45%" },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
  },
  grandTotalRow: {
    marginTop: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#111827",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  grandTotal: { fontFamily: "Helvetica-Bold", fontSize: 12 },
  notes: { marginTop: 36, color: "#374151", fontSize: 9 },
  logo: { width: 36, height: 36, objectFit: "contain", marginBottom: 10 },
});

export function MinimalInvoiceTemplate({ data, totals }: InvoiceTemplateProps) {
  return (
    <Document title={`Invoice ${data.number}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {data.logo ? <Image src={data.logo} style={styles.logo} /> : null}
          <Text style={styles.brand}>{data.sender.name || "Your Business"}</Text>
          <Text style={styles.muted}>
            {[data.sender.website, data.sender.email]
              .filter(Boolean)
              .join("  ·  ")}
          </Text>
          <View style={styles.invoiceMeta}>
            <Text style={styles.invoiceNumber}>Invoice {data.number}</Text>
            <View style={styles.dates}>
              <Text>Issued {formatDate(data.issueDate)}</Text>
              <Text>Due {formatDate(data.dueDate)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.partiesRow}>
          <View style={styles.partyBlock}>
            <Text style={styles.label}>Billed to</Text>
            <Text style={styles.partyName}>{data.client.name || "—"}</Text>
            {data.client.address ? (
              <Text style={styles.muted}>{data.client.address}</Text>
            ) : null}
            {data.client.email ? (
              <Text style={styles.muted}>{data.client.email}</Text>
            ) : null}
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
            <Text style={styles.muted}>Subtotal</Text>
            <Text>{formatCurrency(totals.subtotal, data.currency)}</Text>
          </View>
          {totals.discountAmount > 0 ? (
            <View style={styles.totalsRow}>
              <Text style={styles.muted}>Discount</Text>
              <Text>- {formatCurrency(totals.discountAmount, data.currency)}</Text>
            </View>
          ) : null}
          {totals.taxAmount > 0 ? (
            <View style={styles.totalsRow}>
              <Text style={styles.muted}>Tax ({data.taxRate}%)</Text>
              <Text>{formatCurrency(totals.taxAmount, data.currency)}</Text>
            </View>
          ) : null}
          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotal}>Total</Text>
            <Text style={styles.grandTotal}>
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
      </Page>
    </Document>
  );
}
