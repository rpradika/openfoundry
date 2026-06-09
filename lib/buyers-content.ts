// "Why buyers choose this supplier" content — EN verbatim from the
// openfoundry.app/preview/vcuinternational-owjd2j page, plus a VI translation.

export interface BuyerConfidence {
  title: string;
  detail: string;
}

const VERIFY_EN: string[] = [
  "Same supplier from prototype through volume — no re-qualification mid-programme",
  "Documented process routes across CNC, casting, sheet-metal fabrication and polymer moulding",
  "In-process inspection aligned to OEM final acceptance criteria",
  "IATF 16949 and ISO 9001 quality systems on file, with audit history",
  "Export and repeat-supply capability for international programmes",
];

const VERIFY_VI: string[] = [
  "Cùng một nhà cung cấp từ mẫu thử đến sản xuất hàng loạt — không cần tái đánh giá giữa chương trình",
  "Quy trình được tài liệu hoá trên CNC, đúc, gia công kim loại tấm và ép nhựa",
  "Kiểm tra trong quá trình phù hợp tiêu chí chấp nhận cuối của OEM",
  "Hệ thống chất lượng IATF 16949 và ISO 9001 có hồ sơ, kèm lịch sử đánh giá",
  "Năng lực xuất khẩu và cung ứng lặp lại cho các chương trình quốc tế",
];

const CONFIDENCE_EN: BuyerConfidence[] = [
  { title: "Single accountable technical interface", detail: "One contact owns the part from RFQ through final delivery — no handover gaps where dimensional or material context gets lost between machining, casting and assembly." },
  { title: "PPAP-ready inspection evidence", detail: "Dimensional reports, material certifications and process control records are produced in formats your quality team already accepts — no late-stage rework on the qualification pack." },
  { title: "Pre-aligned with OEM audit standards", detail: "IATF 16949 and ISO 9001 systems mean your supplier-approval team starts from a known compliance baseline, not a blank checklist." },
];

const CONFIDENCE_VI: BuyerConfidence[] = [
  { title: "Một đầu mối kỹ thuật chịu trách nhiệm duy nhất", detail: "Một đầu mối sở hữu chi tiết từ RFQ đến giao hàng cuối — không có khoảng trống bàn giao làm mất ngữ cảnh kích thước hay vật liệu giữa gia công, đúc và lắp ráp." },
  { title: "Bằng chứng kiểm tra sẵn sàng PPAP", detail: "Báo cáo kích thước, chứng nhận vật liệu và hồ sơ kiểm soát quy trình được tạo theo định dạng mà đội ngũ chất lượng của bạn đã chấp nhận — không phải làm lại hồ sơ duyệt ở giai đoạn cuối." },
  { title: "Phù hợp sẵn với tiêu chuẩn đánh giá OEM", detail: "Hệ thống IATF 16949 và ISO 9001 nghĩa là đội phê duyệt nhà cung cấp của bạn bắt đầu từ một nền tảng tuân thủ đã biết, không phải từ danh sách trống." },
];

export function getBuyerVerify(locale: string): string[] {
  return locale === "vi" ? VERIFY_VI : VERIFY_EN;
}

export function getBuyerConfidence(locale: string): BuyerConfidence[] {
  return locale === "vi" ? CONFIDENCE_VI : CONFIDENCE_EN;
}
