import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ResumeTemplateProps } from "../types";

const styles = StyleSheet.create({
  page: { padding: 36, fontFamily: "Helvetica", fontSize: 10, color: "#111827" },
  name: { fontSize: 24, fontFamily: "Helvetica-Bold" },
  title: { fontSize: 11, color: "#374151", marginTop: 2 },
  contact: { marginTop: 6, color: "#4B5563", fontSize: 9 },
  section: { marginTop: 14 },
  heading: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 5,
  },
  paragraph: { lineHeight: 1.4 },
  role: { fontFamily: "Helvetica-Bold" },
  row: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  muted: { color: "#6B7280" },
  bullet: { marginTop: 2, lineHeight: 1.35 },
  projectItem: { marginBottom: 7 },
});

export function ClassicResumeTemplate({ data }: ResumeTemplateProps) {
  return (
    <Document title={`${data.name || "Resume"}`}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{data.name || "Your Name"}</Text>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.contact}>
          {[data.location, data.phone, data.email, data.linkedin, data.website]
            .filter(Boolean)
            .join("  •  ")}
        </Text>

        <View style={styles.section}>
          <Text style={styles.heading}>Professional Summary</Text>
          <Text style={styles.paragraph}>{data.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Experience</Text>
          {data.experiences.map((exp) => (
            <View key={exp.id} style={{ marginBottom: 8 }}>
              <View style={styles.row}>
                <Text style={styles.role}>
                  {exp.role} • {exp.company}
                </Text>
                <Text style={styles.muted}>
                  {exp.startDate} - {exp.endDate}
                </Text>
              </View>
              {!!exp.location && <Text style={styles.muted}>{exp.location}</Text>}
              {exp.bullets
                .split("\n")
                .filter(Boolean)
                .map((line, idx) => (
                  <Text key={idx} style={styles.bullet}>
                    • {line}
                  </Text>
                ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Education</Text>
          {data.education.map((ed, idx) => (
            <View key={idx} style={{ marginBottom: 6 }}>
              <View style={styles.row}>
                <Text style={styles.role}>{ed.degree}</Text>
                <Text style={styles.muted}>
                  {ed.startYear} - {ed.endYear}
                </Text>
              </View>
              <Text>{ed.institution}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Projects</Text>
          {data.projects.map((project) => (
            <View key={project.id} style={styles.projectItem}>
              <Text style={styles.role}>
                {project.name}
                {project.role ? ` • ${project.role}` : ""}
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

        <View style={styles.section}>
          <Text style={styles.heading}>Skills</Text>
          <Text>{data.skills}</Text>
        </View>
      </Page>
    </Document>
  );
}
