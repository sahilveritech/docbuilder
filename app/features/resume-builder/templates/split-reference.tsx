import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ResumeTemplateProps } from "../types";

const makeStyles = (accent: string) =>
  StyleSheet.create({
    page: {
      padding: 24,
      fontFamily: "Helvetica",
      fontSize: 9.4,
      color: "#111827",
      backgroundColor: "#FFFFFF",
    },
    container: {
      flexDirection: "row",
      gap: 16,
    },
    left: {
      width: "69%",
      paddingRight: 14,
      borderRightWidth: 1,
      borderRightColor: "#D1D5DB",
    },
    right: {
      width: "31%",
      paddingLeft: 2,
    },
    name: {
      fontFamily: "Helvetica-Bold",
      fontSize: 25,
      textTransform: "uppercase",
      marginBottom: 3,
    },
    title: {
      fontSize: 11,
      color: "#374151",
      marginBottom: 12,
    },
    section: { marginBottom: 16 },
    sectionHeading: {
      fontFamily: "Helvetica-Bold",
      fontSize: 12,
      textTransform: "uppercase",
      borderBottomWidth: 1,
      borderBottomColor: "#111827",
      paddingBottom: 3,
      marginBottom: 7,
      color: accent,
    },
    companyLine: {
      fontFamily: "Helvetica-Bold",
      fontSize: 10.2,
      marginBottom: 1,
    },
    dateLine: {
      fontSize: 8.8,
      color: "#6B7280",
      marginBottom: 2,
    },
    roleLine: { fontSize: 9.2, marginBottom: 2 },
    paragraph: { lineHeight: 1.35 },
    projectDescription: { lineHeight: 1.2, marginTop: 1 },
    bullet: { marginTop: 1.5, lineHeight: 1.28 },
    projectBlock: { marginBottom: 8 },
    rightText: { fontSize: 9.1, marginTop: 2, lineHeight: 1.28 },
    rightItem: { marginBottom: 9 },
    link: { color: accent, fontFamily: "Helvetica-Bold" },
  });

export function SplitReferenceResumeTemplate({ data }: ResumeTemplateProps) {
  const styles = makeStyles(data.accent || "#1D4ED8");
  const skills = toItems(data.skills);
  const languages = toItems(data.languages);

  return (
    <Document title={`${data.name || "Resume"}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.left}>
            <Text style={styles.name}>{data.name || "Your Name"}</Text>
            <Text style={styles.title}>
              {[data.title, data.location].filter(Boolean).join(" | ")}
            </Text>

            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Summary</Text>
              <Text style={styles.paragraph}>{data.summary}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Professional Experience</Text>
              {data.experiences.map((exp) => (
                <View key={exp.id} style={{ marginBottom: 9 }}>
                  <Text style={styles.companyLine}>
                    {exp.company || "Company"}
                  </Text>
                  <Text style={styles.dateLine}>
                    {[exp.startDate, exp.endDate].filter(Boolean).join(" - ")}
                  </Text>
                  <Text style={styles.roleLine}>{exp.role}</Text>
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
              <Text style={styles.sectionHeading}>Projects</Text>
              {data.projects.map((project) => (
                <View key={project.id} style={styles.projectBlock}>
                  <Text style={styles.companyLine}>
                    {normalizeText(project.name)}
                    {project.role ? ` | ${normalizeText(project.role)}` : ""}
                  </Text>
                  {project.skillsUsed ? (
                    <Text style={styles.dateLine}>
                      Skills: {normalizeText(project.skillsUsed)}
                    </Text>
                  ) : null}
                  {project.description ? (
                    <Text style={styles.projectDescription}>
                      {normalizeText(project.description)}
                    </Text>
                  ) : null}
                </View>
              ))}
            </View>
          </View>

          <View style={styles.right}>
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Contact</Text>
              {data.linkedin ? (
                <Text style={[styles.rightText, styles.link]}>LinkedIn</Text>
              ) : null}
              {data.email ? <Text style={styles.rightText}>{data.email}</Text> : null}
              {data.phone ? <Text style={styles.rightText}>{data.phone}</Text> : null}
              {data.website ? (
                <Text style={[styles.rightText, styles.link]}>Portfolio</Text>
              ) : null}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Education</Text>
              {data.education.map((ed, idx) => (
                <View key={idx} style={styles.rightItem}>
                  <Text style={styles.companyLine}>
                    {[ed.startYear, ed.endYear].filter(Boolean).join("-")}
                  </Text>
                  <Text style={styles.rightText}>{ed.degree}</Text>
                  <Text style={styles.rightText}>{ed.institution}</Text>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Languages</Text>
              {languages.map((item, idx) => (
                <Text key={idx} style={styles.rightText}>
                  {item}
                </Text>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Skills</Text>
              {skills.map((item, idx) => (
                <Text key={idx} style={styles.rightText}>
                  {item}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

function toItems(value: string): string[] {
  return normalizeText(value)
    .split(/\n|,/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}
