/**
 * Typography System for AURA COUTURE
 * Based on Google Fonts Inter
 */

export const typography = {
  // Font Weights
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  } as const,

  // Font Scale (in pixels)
  scale: {
    display: "48px",
    heroTitle: "40px",
    pageTitle: "32px",
    sectionTitle: "24px",
    cardTitle: "20px",
    productName: "18px",
    body: "16px",
    secondaryText: "14px",
    caption: "12px",
    buttonText: "16px",
    sidebar: "14px",
    tableHeader: "14px",
    tableContent: "14px",
    inputText: "14px",
    badge: "12px",
  } as const,

  // Font Weight Usage Rules
  usage: {
    bold: ["revenue", "prices", "importantNumbers", "dashboardStatistics", "heroTitles"],
    semibold: ["pageTitles", "productNames", "cardTitles", "buttons", "tableHeaders"],
    medium: ["sidebar", "navigation", "labels", "menuItems"],
    regular: ["descriptions", "paragraphs", "productDetails", "formInputs"],
  } as const,
} as const;

export type TypographyScale = keyof typeof typography.scale;
export type TypographyWeight = keyof typeof typography.weights;
