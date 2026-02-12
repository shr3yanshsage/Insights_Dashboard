// src/types/index.ts
/**
 * Represents a single row of the mock‑data.json dataset.
 *
 * All fields are required and match the JSON keys exactly.
 */
export interface DashboardRecord {
  /** Unique identifier of the account (e.g. "ACC-00123") */
  accountNumber: string;

  /** Customer’s age in years */
  age: number;

  /** Company name that owns the account */
  companyName: string;

  /** The product line the account belongs to (SaaS, Hardware, AI/ML, …) */
  productType: string;

  /** Two‑letter US state abbreviation */
  states: string;

  /** Size category of the company (Small, Medium, Large) */
  sizeOfCompany: string;

  /** How many API calls that account has generated */
  numberOfApiCalls: number;
}
