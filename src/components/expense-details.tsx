import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Expense, ExpenseFormatted } from '@/types/Expense';

export default async function ExpenseDetails({
  expense,
}: {
  expense?: Expense | ExpenseFormatted;
}) {
  const DetailStringMap: Record<keyof Expense, string> = {
    _id: 'ID',
    atcud: 'ATCUD',
    merchantVatNumber: 'Merchant VAT Number',
    customerVatNumber: 'Customer VAT Number',
    customerCountry: 'Customer Country',
    documentType: 'Document Type',
    documentStatus: 'Document Status',
    documentUniqueId: 'Document Unique ID',
    fiscalSpaceI: 'Fiscal Space I',
    taxableBaseExemptVatI: 'Taxable Base Exempt VAT I',
    taxableBaseReducedRateVatI: 'Taxable Base Reduced Rate VAT I',
    totalReducedRateVatI: 'Total Reduced Rate VAT I',
    taxableBaseIntermediateRateVatI: 'Taxable Base Intermediate Rate VAT I',
    totalIntermediateRateVatI: 'Total Intermediate Rate VAT I',
    taxableBaseNormalRateVatI: 'Taxable Base Normal Rate VAT I',
    totalNormalRateVatI: 'Total Normal Rate VAT I',
    fiscalSpaceJ: 'Fiscal Space J',
    taxableBaseExemptVatJ: 'Taxable Base Exempt VAT J',
    taxableBaseReducedRateVatJ: 'Taxable Base Reduced Rate VAT J',
    totalReducedRateVatJ: 'Total Reduced Rate VAT J',
    taxableBaseIntermediateRateVatJ: 'Taxable Base Intermediate Rate VAT J',
    totalIntermediateRateVatJ: 'Total Intermediate Rate VAT J',
    taxableBaseNormalRateVatJ: 'Taxable Base Normal Rate VAT J',
    totalNormalRateVatJ: 'Total Normal Rate VAT J',
    fiscalSpaceK: 'Fiscal Space K',
    taxableBaseExemptVatK: 'Taxable Base Exempt VAT K',
    taxableBaseReducedRateVatK: 'Taxable Base Reduced Rate VAT K',
    totalReducedRateVatK: 'Total Reduced Rate VAT K',
    taxableBaseIntermediateRateVatK: 'Taxable Base Intermediate Rate VAT K',
    totalIntermediateRateVatK: 'Total Intermediate Rate VAT K',
    taxableBaseNormalRateVatK: 'Taxable Base Normal Rate VAT K',
    totalNormalRateVatK: 'Total Normal Rate VAT K',
    nonVatTaxable: 'Non-VAT Taxable',
    stampTax: 'Stamp Tax',
    totalTaxes: 'Total Taxes',
    totalAmount: 'Total Amount',
    withholdingTax: 'Withholding Tax',
    hash: 'Hash',
    certificateNumber: 'Certificate Number',
    documentDate: 'Document Date',
    additionalInformation: 'Additional Information',
  };

  const renderDetail = (key: keyof Expense) => (
    <TableRow key={key}>
      <TableCell className="font-semibold">{DetailStringMap[key]}</TableCell>
      <TableCell>{String(expense?.[key])}</TableCell>
    </TableRow>
  );

  return (
    <Table>
      <TableBody>
        {expense &&
          Object.keys(expense).map((key) => renderDetail(key as keyof Expense))}
      </TableBody>
    </Table>
  );
}
