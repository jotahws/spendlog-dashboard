import { formatCurrency } from "@/utils/expenseUtils";
import moment from "moment";
import { z } from "zod";

// --------------
// Expense
// --------------

export const ExpenseSchema = z.object({
    _id: z.string().optional(),
    merchantVatNumber: z.string().optional(),
    customerVatNumber: z.string().optional(),
    customerCountry: z.string().optional(),
    documentType: z.string().optional(),
    documentStatus: z.string().optional(),
    documentDate: z.coerce.date(),
    documentUniqueId: z.string().optional(),
    atcud: z.string().optional(),
    fiscalSpaceI: z.string().optional(),
    taxableBaseExemptVatI: z.number().optional(),
    taxableBaseReducedRateVatI: z.number().optional(),
    totalReducedRateVatI: z.number().optional(),
    taxableBaseIntermediateRateVatI: z.number().optional(),
    totalIntermediateRateVatI: z.number().optional(),
    taxableBaseNormalRateVatI: z.number().optional(),
    totalNormalRateVatI: z.number().optional(),
    fiscalSpaceJ: z.string().optional(),
    taxableBaseExemptVatJ: z.number().optional(),
    taxableBaseReducedRateVatJ: z.number().optional(),
    totalReducedRateVatJ: z.number().optional(),
    taxableBaseIntermediateRateVatJ: z.number().optional(),
    totalIntermediateRateVatJ: z.number().optional(),
    taxableBaseNormalRateVatJ: z.number().optional(),
    totalNormalRateVatJ: z.number().optional(),
    fiscalSpaceK: z.string().optional(),
    taxableBaseExemptVatK: z.number().optional(),
    taxableBaseReducedRateVatK: z.number().optional(),
    totalReducedRateVatK: z.number().optional(),
    taxableBaseIntermediateRateVatK: z.number().optional(),
    totalIntermediateRateVatK: z.number().optional(),
    taxableBaseNormalRateVatK: z.number().optional(),
    totalNormalRateVatK: z.number().optional(),
    nonVatTaxable: z.number().optional(),
    stampTax: z.number().optional(),
    totalTaxes: z.number().optional(),
    totalAmount: z.number(),
    withholdingTax: z.number().optional(),
    hash: z.string().optional(),
    certificateNumber: z.string().optional(),
    additionalInformation: z.string().optional(),
}).strict();

export const ExpenseListSchema = z.array(ExpenseSchema)

export const ExpenseFormattedSchema = z.object({
    _id: z.string().optional(),
    merchantVatNumber: z.string().optional(),
    customerVatNumber: z.string().optional(),
    customerCountry: z.string().optional(),
    documentType: z.string().optional(),
    documentStatus: z.string().optional(),
    documentDate: z.coerce.date().transform((date) => moment(date).format("DD/MM/YYYY")),
    documentUniqueId: z.string().optional(),
    atcud: z.string().optional(),
    fiscalSpaceI: z.string().optional(),
    taxableBaseExemptVatI: z.number().optional().transform((value) => formatCurrency(value)),
    taxableBaseReducedRateVatI: z.number().optional().transform((value) => formatCurrency(value)),
    totalReducedRateVatI: z.number().optional().transform((value) => formatCurrency(value)),
    taxableBaseIntermediateRateVatI: z.number().optional().transform((value) => formatCurrency(value)),
    totalIntermediateRateVatI: z.number().optional().transform((value) => formatCurrency(value)),
    taxableBaseNormalRateVatI: z.number().optional().transform((value) => formatCurrency(value)),
    totalNormalRateVatI: z.number().optional().transform((value) => formatCurrency(value)),
    fiscalSpaceJ: z.string().optional(),
    taxableBaseExemptVatJ: z.number().optional().transform((value) => formatCurrency(value)),
    taxableBaseReducedRateVatJ: z.number().optional().transform((value) => formatCurrency(value)),
    totalReducedRateVatJ: z.number().optional().transform((value) => formatCurrency(value)),
    taxableBaseIntermediateRateVatJ: z.number().optional().transform((value) => formatCurrency(value)),
    totalIntermediateRateVatJ: z.number().optional().transform((value) => formatCurrency(value)),
    taxableBaseNormalRateVatJ: z.number().optional().transform((value) => formatCurrency(value)),
    totalNormalRateVatJ: z.number().optional().transform((value) => formatCurrency(value)),
    fiscalSpaceK: z.string().optional(),
    taxableBaseExemptVatK: z.number().optional().transform((value) => formatCurrency(value)),
    taxableBaseReducedRateVatK: z.number().optional().transform((value) => formatCurrency(value)),
    totalReducedRateVatK: z.number().optional().transform((value) => formatCurrency(value)),
    taxableBaseIntermediateRateVatK: z.number().optional().transform((value) => formatCurrency(value)),
    totalIntermediateRateVatK: z.number().optional().transform((value) => formatCurrency(value)),
    taxableBaseNormalRateVatK: z.number().optional().transform((value) => formatCurrency(value)),
    totalNormalRateVatK: z.number().optional().transform((value) => formatCurrency(value)),
    nonVatTaxable: z.number().optional().transform((value) => formatCurrency(value)),
    stampTax: z.number().optional().transform((value) => formatCurrency(value)),
    totalTaxes: z.number().optional().transform((value) => formatCurrency(value)),
    totalAmount: z.number().transform((value) => formatCurrency(value)),
    withholdingTax: z.number().optional().transform((value) => formatCurrency(value)),
    hash: z.string().optional(),
    certificateNumber: z.string().optional(),
    additionalInformation: z.string().optional(),
}).strict();

export type Expense = z.infer<typeof ExpenseSchema>;
export type ExpenseFormatted = z.infer<typeof ExpenseFormattedSchema>;

// --------------
// Filter
// --------------

const datePattern = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;

export const ExpenseFilterSchema = z.object({
    dateFrom: z.string().regex(datePattern, {
        message: `Must follow pattern YYYY-MM-DD`,
    }).optional().transform((
        val,
    ) => (val ? new Date(val) : undefined)),
    dateTo: z.string().regex(datePattern, {
        message: `Must follow pattern YYYY-MM-DD`,
    }).optional().transform((
        val,
    ) => (val ? new Date(val) : undefined)),
    minAmount: z.string().optional().transform((
        val,
    ) => (val ? parseFloat(val) : undefined)),
    maxAmount: z.string().optional().transform((
        val,
    ) => (val ? parseFloat(val) : undefined)),
    atcud: z.string().optional(),
    merchantVatNumber: z.string().optional(),
}).strict();
