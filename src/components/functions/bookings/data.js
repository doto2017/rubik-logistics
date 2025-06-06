export const headers = [
  { label: 'Month', key: 'month', dep: 'all', hidden: false },
  { label: 'Signal', key: 'signalAcc', dep: 'Acc', hidden: false },
  { label: 'Signal Cus', key: 'signalCus', dep: 'Cus', hidden: false },
  { label: 'Signal Sale', key: 'signalSale', dep: 'Sale', hidden: false },
  { label: 'Signal Ops', key: 'signalOps', dep: 'Ops', hidden: false },
  { label: 'Signal Docs', key: 'signalDocs', dep: 'Docs', hidden: false },
  { label: 'Signal Ops Docs', key: 'signalOpsDocs', dep: 'OpsDocs', hidden: false },
  { label: 'BK. No', key: 'bkNo', dep: 'all', hidden: false },
  { label: 'File Type', key: 'bookingType', dep: 'all', hidden: false },
  { label: 'File.No', key: 'fileNo', dep: 'all', hidden: false },
  { label: 'MST', key: 'mst', dep: 'all', hidden: false },
  { label: 'Customer', key: 'customerName', dep: 'all', hidden: false },
  { label: 'Shipper', key: 'shipper', dep: 'Cus', hidden: false },
  { label: 'Consignee', key: 'consignee', dep: 'Cus', hidden: false },
  { label: 'Agent', key: 'agent', dep: 'Cus', hidden: false },
  { label: 'Term', key: 'term', dep: 'Sale', hidden: false },
  { label: 'Service', key: 'service', dep: 'Sale', hidden: false },
  { label: 'Transport', key: 'transport', dep: 'Sale', hidden: false },
  { label: 'Cbm', key: 'cbm', dep: 'Cus', hidden: false },
  { label: 'TEU', key: 'teu', dep: 'Cus', hidden: false },
  { label: 'Type', key: 'type', dep: 'Cus', hidden: false },
  { label: 'Type Quantity', key: 'typeQuantity', dep: 'Cus', hidden: false },
  { label: 'VESSEL', key: 'vessel', dep: 'Cus', hidden: false },
  { label: 'VESSEL TRANSIT', key: 'vesselTransit', dep: 'Cus', hidden: false },
  { label: 'Shipping/Airline', key: 'shippingAirline', dep: 'Cus', hidden: false },
  { label: 'Loading Date', key: 'loadingDate', dep: 'Cus', hidden: false },
  { label: 'CLS', key: 'cls', dep: 'Cus', hidden: false },
  { label: 'ETD', key: 'etd', dep: 'Cus', hidden: false },
  { label: 'ETA', key: 'eta', dep: 'Cus', hidden: false },
  { label: 'POR', key: 'por', dep: 'Cus', hidden: false },
  { label: 'POL', key: 'pol', dep: 'Cus', hidden: false },
  { label: 'POD', key: 'pod', dep: 'Cus', hidden: false },
  { label: 'MBL No', key: 'mbl', dep: 'Cus', hidden: false },
  { label: 'HBL No', key: 'hbl', dep: 'Cus', hidden: false },
  { label: 'Cont & Sea No', key: 'containerNumber', dep: 'Cus', hidden: false },
  { label: 'Depot', key: 'depot', dep: 'Cus', hidden: false },
  { label: 'CFS', key: 'cfs', dep: 'Cus', hidden: false },
  { label: 'MNF', key: 'mnf', dep: 'Docs', hidden: false },
  { label: 'CF MNF', key: 'cfMnf', dep: 'Docs', hidden: false },
  { label: 'Cược cont', key: 'cuocContDoc', dep: 'Docs', hidden: false },
  { label: 'DO/EDO', key: 'doEdo', dep: 'Docs', hidden: false },
  { label: 'Release Type', key: 'releaseType', dep: 'Docs', hidden: false },
  { label: 'Release or Not', key: 'releaseOrNot', dep: 'Docs', hidden: false },
  { label: 'Arival Actually', key: 'arrivalActually', dep: 'Cus', hidden: false },
  { label: 'Door or Not', key: 'doorOrNot', dep: 'Sale', hidden: false },
  { label: 'HR Sale', key: 'hrSale', dep: 'Sale', hidden: false },
  { label: 'HR Cus', key: 'hrCus', dep: null, hidden: false },
  { label: 'HR Doc', key: 'hrDoc', dep: null, hidden: false },
  { label: 'HR Ops Doc', key: 'hrOpsDoc', dep: null, hidden: false },
  { label: 'HR Ops', key: 'hrOps', dep: null, hidden: false },
  { label: 'HR Acc', key: 'hrAcc', dep: null, hidden: false },
  { label: 'Chi cục', key: 'chicuc', dep: 'OpsDocs', hidden: false },
  { label: 'Số tờ khai', key: 'sotokhai', dep: 'OpsDocs', hidden: false },
  { label: 'Luồng', key: 'lane', dep: 'OpsDocs', hidden: false },
  { label: 'Nhập/Xuất', key: 'nhapxuat', dep: 'OpsDocs', hidden: false },
  { label: 'Ngày mở tờ khai', key: 'ngaymotokhai', dep: 'OpsDocs', hidden: false },
  { label: 'Ngày thông quan', key: 'ngaythongquan', dep: 'OpsDocs', hidden: false },
  { label: 'Soi chiếu', key: 'soiChieu', dep: 'Ops', hidden: false },
  { label: 'Cược cont', key: 'cuocContOps', dep: 'Ops', hidden: false },
  { label: 'Vận chuyển', key: 'vanchuyenOps', dep: 'Ops', hidden: false },
  { label: 'Tiền cược', key: 'tienCuocOps', dep: 'Ops', hidden: false },
  { label: 'Ngày cược', key: 'ngayCuocOps', dep: 'Ops', hidden: false },
  { label: 'Ngày hoàn', key: 'ngayHoanAcc', dep: 'Acc' },
  { label: 'Cbm', key: 'cbmDocOps', dep: 'OpsDocs', hidden: false },
  { label: 'TEU', key: 'teuDocOps', dep: 'OpsDocs', hidden: false },
  { label: 'Type', key: 'typeDocOps', dep: 'OpsDocs', hidden: false },
  { label: 'Type Quantity', key: 'typeQuantityDocOps', dep: 'OpsDocs', hidden: false },
  { label: 'Số cont/ Chì', key: 'containerNumberDocOps', dep: 'OpsDocs', hidden: false },
  { label: 'Depot/CFS', key: 'depotCfsDocOps', dep: 'OpsDocs', hidden: false },
  { label: 'Nhà xe', key: 'carrierOps', dep: 'Ops', hidden: false },
  { label: 'Ngày trả', key: 'returnDateSale', dep: 'Sale', hidden: false },
  { label: 'Địa chỉ trả hàng', key: 'deliveryAddressSale', dep: 'Sale', hidden: false },
  { label: 'Người nhận', key: 'recipientSale', dep: 'Sale', hidden: false },
  { label: 'Số điện thoại', key: 'picPhoneSale', dep: 'Sale', hidden: false },
  {
    label: 'Xác nhận trả hàng(ngày)',
    key: 'confirmationReturnDateSale',
    dep: 'Sale',
    hidden: false,
  },
  { label: 'Income', key: 'incomeSale', dep: 'Sale', hidden: false },
  { label: 'VAT(income)', key: 'vatIncomeSale', dep: 'Sale', hidden: false },
  { label: 'Cost', key: 'costMix', dep: 'Mix', hidden: false },
  { label: 'VAT cost', key: 'vatCostMix', dep: 'Mix', hidden: false },
  { label: 'Profit', key: 'profitMix', dep: 'Mix', hidden: false },
  { label: 'Commission Client', key: 'commissionClientMix', dep: 'Mix', hidden: false },
  { label: 'ROE %', key: 'roeMix', dep: 'Mix', hidden: false },
  { label: 'Ngày gửi debit', key: 'ngayGuiDebitAcc', dep: 'Acc', hidden: false },
  { label: 'Hạn thanh toán', key: 'hanThanhToanAcc', dep: 'Acc', hidden: false },
  { label: 'Ngày thanh toán', key: 'ngayThanhToanAcc', dep: 'Acc', hidden: false },
  // { label: 'PIC name', key: 'picName' },
  // { label: 'PIC phone', key: 'picPhone' },
  // { label: 'PIC email', key: 'picEmail' },
  { label: 'Ngày tạo', key: 'timestamp', dep: 'all', hidden: false },
  { label: 'Ghi chú', key: 'note', dep: 'all', hidden: false },
]

export const bookingObject = {
  month: null,
  signalAcc: null,
  signalCus: null,
  signalSale: null,
  signalOps: null,
  signalDocs: null,
  signalOpsDocs: null,
  bkNo: null,
  bookingType: null,
  fileNo: null,
  mst: null,
  customerName: null,
  shipper: null,
  consignee: null,
  agent: null,
  term: null,
  service: null,
  transport: null,
  cbm: null,
  teu: null,
  type: null,
  typeQuantity: null,
  vessel: null,
  vesselTransit: null,
  shippingAirline: null,
  loadingDate: null,
  cls: null,
  etd: null,
  eta: null,
  por: null,
  pol: null,
  pod: null,
  mbl: null,
  hbl: null,
  containerNumber: null,
  depot: null,
  cfs: null,
  mnf: false,
  cfMnf: false,
  cuocContDoc: false,
  doEdo: null,
  releaseType: null,
  releaseOrNot: false,
  arrivalActually: null,
  doorOrNot: false,
  hrSale: null,
  hrCus: null,
  hrDoc: null,
  hrOpsDoc: null,
  hrOps: null,
  hrAcc: null,
  chicuc: null,
  sotokhai: null,
  lane: null,
  nhapxuat: null,
  ngaymotokhai: null,
  ngaythongquan: null,
  soiChieu: false,
  cuocContOps: false,
  vanchuyenOps: false,
  tienCuocOps: null,
  ngayCuocOps: null,
  ngayHoanAcc: null,
  tongTienOps: null,
  cbmDocOps: null,
  teuDocOps: null,
  typeDocOps: null,
  typeQuantityDocOps: null,
  containerNumberDocOps: null,
  depotCfsDocOps: null,
  carrierOps: null,
  returnDateSale: null,
  deliveryAddressSale: null,
  recipientSale: null,
  picPhoneSale: null,
  confirmationReturnDateSale: null,
  incomeSale: null,
  vatIncomeSale: null,
  costMix: null,
  vatCostMix: null,
  profitMix: null,
  commissionClientMix: null,
  roeMix: null,
  ngayGuiDebitAcc: null,
  hanThanhToanAcc: null,
  ngayThanhToanAcc: null,
  picName: null,
  picPhone: null,
  picEmail: null,
  timestamp: null,
  note: null,
}

export const depColor = {
  sale: 'bg-green-100 border-green-500',
  cus: 'bg-blue-100 border-blue-500',
  doc: 'bg-blue-200 border-blue-500',
  acc: 'bg-yellow-100 border-yellow-500',
  ops: 'bg-orange-100 border-orange-500',
  mix: 'bg-purple-100 border-purple-500',
}

export const generalFields = ['mst', 'customerName', 'bkNo', 'fileNo', 'timestamp', 'note']

export const saleFields = [
  'term',
  'doorOrNot',
  'returnDateSale',
  'deliveryAddressSale',
  'recipientSale',
  'picPhoneSale',
  'incomeSale',
  'vatIncomeSale',
  'service',
  'transport',
  'signalSale',
]

export const cusFields = [
  'signalCus',
  'shipper',
  'consignee',
  'agent',
  'cbm',
  'teu',
  'type',
  'typeQuantity',
  'vessel',
  'vesselTransit',
  'shippingAirline',
  'loadingDate',
  'cls',
  'etd',
  'eta',
  'por',
  'pol',
  'pod',
  'mbl',
  'hbl',
  'containerNumber',
  'depot',
  'cfs',
  'arrivalActually',
  'signalCus',
]

export const docFields = [
  'mnf',
  'cfMnf',
  'cuocContDoc',
  'doEdo',
  'releaseType',
  'confirmationReturnDateSale',
  'releaseOrNot',
  'signalDoc',
]

export const opsFields = [
  'soiChieu',
  'cuocContOps',
  'vanchuyenOps',
  'tienCuocOps',
  'ngayCuocOps',
  'carrierOps',
  'signalOps',
]

export const accFields = [
  'ngayHoanAcc',
  'ngayGuiDebitAcc',
  'hanThanhToanAcc',
  'ngayThanhToanAcc',
  'signalAcc',
]

export const opsDocFields = [
  'chicuc',
  'sotokhai',
  'lane',
  'nhapxuat',
  'ngaymotokhai',
  'ngaythongquan',
  'cbmDocOps',
  'teuDocOps',
  'typeDocOps',
  'typeQuantityDocOps',
  'containerNumberDocOps',
  'depotCfsDocOps',
  'signalOpsDoc',
]

export const checkboxFields = [
  'doorOrNot',
  'releaseOrNot',
  'mnf',
  'cfMnf',
  'cuocContDoc',
  'soiChieu',
  'cuocContOps',
  'vanchuyenOps',
]

export const datetimeFields = [
  'loadingDate',
  'eta',
  'etd',
  'ngayCuocOps',
  'ngayHoanAcc',
  'ngayGuiDebitAcc',
  'ngayThanhToanAcc',
  'ngaymotokhai',
  'ngaythongquan',
  'returnDateSale',
  'confirmationReturnDateSale',
  'arrivalActually',
]

export const agents = [
  { value: null, label: 'None' },
  { value: 'IQ CARGO', label: 'IQ CARGO' },
  { value: 'EGLOBE', label: 'EGLOBE' },
  { value: 'ANB', label: 'ANB' },
  { value: 'OMEGA', label: 'OMEGA' },
  { value: 'PCF24', label: 'PCF24' },
  { value: 'QUANTERM', label: 'QUANTERM' },
  { value: 'EMC', label: 'EMC' },
]

export const bookingCostFields = () => [
  { key: 'costDesc', label: 'Description' },
  { key: 'ob', label: 'OB' },
  { key: 'quantity', label: 'Quantity' },
  { key: 'unit', label: 'Unit' },
  { key: 'unitPrice', label: 'Unit Price' },
  { key: 'currency', label: 'Currency' },
  { key: 'tax', label: 'Tax' },
  { key: 'total', label: 'Total' },
  { key: 'edit', label: 'Edit' },
  { key: 'pp', label: 'PP' },
  { key: 'notes', label: 'Notes' },
  { key: 'accountRef', label: 'Account Ref' },
  { key: 'docs', label: 'Docs' },
  { key: 'noRev', label: 'No Rev' },
  { key: 'finishDate', label: 'Finish Date' },
]

export const bookingCostData = () => [
  {
    costDesc: null,
    ob: false,
    quantity: null,
    unit: null,
    unitPrice: null,
    currency: null,
    tax: null,
    total: null,
    edit: false,
    pp: false,
    notes: null,
    accountRef: null,
    docs: null,
    noRev: null,
    finishDate: null,
  },
]
