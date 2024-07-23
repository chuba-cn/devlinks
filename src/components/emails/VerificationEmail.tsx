// emails/VerificationEmail.tsx
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Link,
  Hr,
  Section,
} from "@react-email/components";
import * as React from "react";

interface VerificationEmailProps {
  verificationUrl: string;
}

const VerificationEmail: React.FC<VerificationEmailProps> = ({
  verificationUrl,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Email Verification</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerTitle}>Welcome to Our Service</Heading>
          </Section>
          <Hr style={divider} />
          <Section style={content}>
            <Heading style={heading}>Verify your email address</Heading>
            <Text style={paragraph}>
              Thank you for registering! Please verify your email address by
              clicking the button below.
            </Text>
            <Button style={button} href={verificationUrl}>
              Verify Email
            </Button>
            <Text style={paragraph}>
              If the button above does not work, please copy and paste the
              following link into your browser:
            </Text>
            <Link href={verificationUrl} style={link}>
              {verificationUrl}
            </Link>
          </Section>
          <Hr style={divider} />
          <Section style={footer}>
            <Text style={footerText}>
              If you have any questions, feel free to{" "}
              <Link href="mailto:shinekoko1276@gmail.com">contact us</Link>.
            </Text>
            <Text style={footerText}>
              © 2024 Our Service. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default VerificationEmail;

const main: React.CSSProperties = {
  backgroundColor: "#f4f4f7",
  padding: "20px 0",
  fontFamily: "Arial, sans-serif",
};

const container: React.CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
};

const header: React.CSSProperties = {
  backgroundColor: "#643DFF",
  padding: "40px",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
};

const headerTitle: React.CSSProperties = {
  fontSize: "20px",
  color: "#ffffff",
  textAlign: "center" as const,
  margin: 0,
};

const content: React.CSSProperties = {
  padding: "20px",
};

const heading: React.CSSProperties = {
  fontSize: "24px",
  color: "#333333",
  marginBottom: "20px",
  textAlign: "center" as const,
};

const paragraph: React.CSSProperties = {
  fontSize: "16px",
  color: "#666666",
  lineHeight: "1.5",
  marginBottom: "20px",
  textAlign: "center" as const,
};

const button: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "10px",
  backgroundColor: "#643DFF",
  color: "#ffffff",
  textAlign: "center" as const,
  borderRadius: "5px",
  textDecoration: "none",
  fontSize: "16px",
  marginBottom: "20px",
};

const link: React.CSSProperties = {
  color: "#007bff",
  textDecoration: "none",
  wordWrap: "break-word",
};

const divider: React.CSSProperties = {
  borderColor: "#dddddd",
  margin: "20px 0",
};

const footer: React.CSSProperties = {
  padding: "10px",
  backgroundColor: "#f4f4f7",
  borderBottomLeftRadius: "8px",
  borderBottomRightRadius: "8px",
  textAlign: "center" as const,
};

const footerText: React.CSSProperties = {
  fontSize: "14px",
  color: "#666666",
  margin: "5px 0",
};
