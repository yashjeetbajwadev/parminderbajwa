import React from "react";
import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <Html>
    <Head />
    <Preview>Thank you for contacting Parminder Bajwa Real Estate</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={content}>
          <Heading style={h1}>Hello, {firstName}!</Heading>
          <Text style={text}>
            Thank you for reaching out to Parminder Bajwa Real Estate. We have
            received your message and appreciate your interest in our services.
          </Text>
          <Text style={text}>
            I will review your inquiry and get back to you as soon as possible
            with the information you need. We strive to respond to all inquiries
            within 24 hours.
          </Text>
          <Text style={text}>
            If you have any urgent matters in the meantime, please don't
            hesitate to call me at{" "}
            <Link href="tel:+642102496278" style={link}>
              +64 210 249 6278
            </Link>
            .
          </Text>
          <Text style={text}>
            We look forward to assisting you with your real estate needs and
            providing you with exceptional service.
          </Text>
          <Text style={signature}>Best regards,</Text>
          <Text style={signatureName}>Parminder Bajwa</Text>
        </Section>
        <Hr style={hr} />
        <Section style={footer}>
          <Row>
            <Column align="left" style={footerIcon}>
              <Link href="https://www.facebook.com/profile.php?id=100075699308387">
                <Img
                  src="icons/facebook.svg"
                  width="24"
                  height="24"
                  alt="Facebook"
                />
              </Link>
            </Column>
            <Column align="center" style={footerIcon}>
              <Link href="https://www.tiktok.com/@parminderbajwabarfoot">
                <Img
                  src="icons/tiktok.svg"
                  width="24"
                  height="24"
                  alt="TikTok"
                />
              </Link>
            </Column>
          </Row>
          <Text style={footerText}>
            © {new Date().getFullYear()} Parminder Bajwa Real Estate, All
            Rights Reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default EmailTemplate;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
  boxShadow: "0 0 48px rgba(0, 0, 0, 0.1)",
};

const logoContainer = {
  padding: "20px 30px",
};

const logo = {
  margin: "0 auto",
};

const content = {
  padding: "0 30px",
};

const h1 = {
  color: "#1e3a8a",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "30px 0",
  padding: "0",
  lineHeight: "40px",
};

const text = {
  color: "#4a5568",
  fontSize: "16px",
  margin: "24px 0",
  lineHeight: "24px",
};

const link = {
  color: "#0366d6",
  textDecoration: "underline",
};

const signature = {
  color: "#4a5568",
  fontSize: "16px",
  margin: "32px 0 0 0",
};

const signatureImg = {
  margin: "16px 0",
};

const signatureName = {
  color: "#4a5568",
  fontSize: "16px",
  margin: "0 0 32px 0",
  fontWeight: "bold",
};

const hr = {
  borderColor: "#e2e8f0",
  margin: "0",
};

const footer = {
  padding: "0 30px",
};

const footerIcon = {
  paddingRight: "12px",
};

const footerText = {
  fontSize: "12px",
  color: "#6c757d",
  margin: "20px 0 0 0",
  textAlign: "center" as const,
};
