import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ResumeTemplateProps } from "../types";

const makeStyles = (accent: string) =>
  StyleSheet.create({
    page: {
      paddingVertical: 28,
      paddingHorizontal: 30,
      fontFamily: "Helvetica",
      fontSize: 9.5,
      color: "#111827",
      backgroundColor: "#FFFFFF",
    },
    top: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 12,
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: "#E5E7EB",
    },
    topLeft: { flex: 1, paddingRight: 10 },
    topRight: { width: 185, alignItems: "flex-start", gap: 3 },
    name: { fontFamily: "Helvetica-Bold", fontSize: 34, color: "#0F172A" },
    title: { fontSize: 10, color: "#374151", marginTop: 4 },
    contactItem: { fontSize: 9, color: "#111827" },
    contactLink: { fontSize: 9, color: accent, fontFamily: "Helvetica-Bold" },
    body: { flexDirection: "row", gap: 18 },
    leftCol: { flex: 1 },
    rightCol: { width: 185 },
    section: { marginBottom: 12 },
    heading: {
      fontFamily: "Helvetica-Bold",
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 0.8,
      marginBottom: 5,
      color: accent,
    },
    paragraph: { lineHeight: 1.35, color: "#111827" },
    role: { fontFamily: "Helvetica-Bold", fontSize: 10.2, color: "#0F172A" },
    row: { flexDirection: "row", justifyContent: "space-between", gap: 8, marginBottom: 2 },
    muted: { color: "#6B7280" },
    bullet: { marginTop: 1.5, lineHeight: 1.3 },
    roleMeta: { color: "#6B7280", marginBottom: 3 },
    expBlock: { marginBottom: 10 },
    projectBlock: { marginBottom: 8 },
    sidebarBlock: { marginBottom: 10 },
    sidebarTitle: { fontFamily: "Helvetica-Bold", fontSize: 9.5, color: "#0F172A" },
    sidebarText: { fontSize: 9, color: "#111827", lineHeight: 1.3, marginTop: 2 },
    listItem: { fontSize: 9, color: "#111827", lineHeight: 1.25, marginTop: 1.5 },
  });

export function ModernResumeTemplate({ data }: ResumeTemplateProps) {
  const styles = makeStyles(data.accent || "#1D4ED8");
  const skills = toLineItems(data.skills);
  const languages = toLineItems(data.languages);

  return (
    <Document title={`${data.name || "Resume"}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.top}>
          <View style={styles.topLeft}>
            <Text style={styles.name}>{(data.name || "Your Name").toUpperCase()}</Text>
            <Text style={styles.title}>
              {[data.title, data.location].filter(Boolean).join(" | ")}
            </Text>
          </View>
          <View style={styles.topRight}>
            {data.phone ? <Text style={styles.contactItem}>{data.phone}</Text> : null}
            {data.email ? <Text style={styles.contactItem}>{data.email}</Text> : null}
            {data.linkedin ? <Text style={styles.contactLink}>LinkedIn</Text> : null}
            {data.website ? <Text style={styles.contactLink}>Portfolio</Text> : null}
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.leftCol}>
            <View style={styles.section}>
              <Text style={styles.heading}>Experience Summary</Text>
              <Text style={styles.paragraph}>{data.summary}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.heading}>Work Experience</Text>
              {data.experiences.map((exp) => (
                <View key={exp.id} style={styles.expBlock}>
                  <Text style={styles.role}>{(exp.company || "Company").toUpperCase()}</Text>
                  <View style={styles.row}>
                    <Text style={styles.muted}>
                      {[exp.startDate, exp.endDate].filter(Boolean).join(" - ")}
                      {exp.role ? ` | ${exp.role}` : ""}
                    </Text>
                    {!!exp.location && <Text style={styles.muted}>{exp.location}</Text>}
                  </View>
                  {exp.bullets
                    .split("\n")
                    .filter(Boolean)
                    .map((line, idx) => (
                      <Text key={idx} style={styles.bullet}>
                        {idx + 1}. {line}
                      </Text>
                    ))}
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.heading}>Projects</Text>
              {data.projects.map((project) => (
                <View key={project.id} style={styles.projectBlock}>
                  <Text style={styles.role}>
                    {project.name}
                    {project.role ? ` | ${project.role}` : ""}
                  </Text>
                  {project.skillsUsed ? (
                    <Text style={styles.muted}>Tech: {project.skillsUsed}</Text>
                  ) : null}
                  {project.description ? (
                    <Text style={styles.paragraph}>{project.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          </View>

          <View style={styles.rightCol}>
            <View style={styles.sidebarBlock}>
              <Text style={styles.heading}>Education</Text>
              {data.education.map((ed, idx) => (
                <View key={idx} style={{ marginBottom: 7 }}>
                  <Text style={styles.sidebarTitle}>
                    {[ed.startYear, ed.endYear].filter(Boolean).join("-")}
                  </Text>
                  <Text style={styles.sidebarText}>{ed.degree}</Text>
                  <Text style={styles.sidebarText}>{ed.institution}</Text>
                </View>
              ))}
            </View>

            <View style={styles.sidebarBlock}>
              <Text style={styles.heading}>Proficient Languages</Text>
              {languages.map((item, idx) => (
                <Text key={idx} style={styles.listItem}>
                  {item}
                </Text>
              ))}
            </View>

            <View style={styles.sidebarBlock}>
              <Text style={styles.heading}>Technical & Key Skills</Text>
              {skills.map((item, idx) => (
                <Text key={idx} style={styles.listItem}>
                  {item}
                </Text>
              ))}
            </View>

            {data.title ? (
              <View style={styles.sidebarBlock}>
                <Text style={styles.heading}>Profile</Text>
                <Text style={styles.sidebarText}>{data.title}</Text>
                {data.location ? (
                  <Text style={styles.muted}>
                    {data.location}
                  </Text>
                ) : null}
              </View>
            ) : null}
          </View>
        </View>
      </Page>
    </Document>
  );
}

function toLineItems(value: string): string[] {
  return value
    .split(/\n|,/g)
    .map((item) => item.trim())
    .filter(Boolean);
}
