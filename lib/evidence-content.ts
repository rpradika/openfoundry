// "Evidence — Programmes we've delivered" content — EN verbatim from the
// openfoundry.app/preview/vcuinternational-owjd2j page, plus a VI translation.

export interface EvidenceCard {
  image: string;
  pdf: string;
  kpiBadge: string;
  tags: string[];
  title: string;
  summary: string;
  bullets: string[];
}

const EN: EvidenceCard[] = [
  { image: "/images/process/stamping-1.jpg", pdf: "Stamping.pdf", kpiBadge: "<350 PPM defect rate", tags: ["Industrial", "High-volume"], title: "High-volume stamped enclosure programme", summary: "Progressive-die stamped sheet-metal enclosures and brackets for industrial control assemblies, run on automated press lines with in-process dimensional checks.", bullets: ["Progressive die — blanking, piercing and drawing in one stroke", "Carbon and stainless steel, 0.8 – 3.0 mm thickness", "First-off + SPC sampling on critical features"] },
  { image: "/images/process/powder-metallurgy-4.jpg", pdf: "PowderMetallurgy.pdf", kpiBadge: "±0.05 mm tolerance", tags: ["Automotive", "Drivetrain"], title: "Near-net-shape sintered gear components", summary: "Sintered iron and stainless gears, sprockets and bearing components produced near-net-shape for high-volume drivetrain and small-motor assemblies.", bullets: ["Iron-copper and sintered stainless alloys", "Near-net-shape — minimal post-machining required", "Density verification + dimensional sampling per batch"] },
  { image: "/images/capabilities/casting.jpg", pdf: "InvestmentCasting.pdf", kpiBadge: "100% CMM verified", tags: ["Industrial", "Valves & flow"], title: "Stainless investment-cast valve bodies", summary: "316L and CF8M stainless investment castings for industrial valve and pump bodies with complex internal geometries — finished to ASTM dimensional standards.", bullets: ["316L / CF8M stainless, parts up to 8 kg", "Wax-pattern through to post-cast machining", "Dye-penetrant + dimensional inspection on every lot"] },
  { image: "/images/process/aluminum-extrusion-5.jpg", pdf: "InjectionMolding.pdf", kpiBadge: "98.4% on-time", tags: ["Industrial", "Pumps & valves"], title: "Iron pump-housing casting programme", summary: "Medium-weight ductile iron and grey iron housings for industrial pump and valve assemblies — sand-cast in-house, finished with downstream machining to drawing tolerance.", bullets: ["5 – 80 kg per part, ductile iron / grey iron", "Pattern through to first-article inspection in-house", "Post-cast machining and dye-penetrant inspection"] },
];

const VI: EvidenceCard[] = [
  { image: "/images/process/stamping-1.jpg", pdf: "Stamping.pdf", kpiBadge: "<350 PPM tỷ lệ lỗi", tags: ["Công nghiệp", "Sản lượng cao"], title: "Chương trình vỏ dập sản lượng cao", summary: "Vỏ và giá đỡ kim loại tấm dập khuôn liên hợp cho cụm điều khiển công nghiệp, chạy trên dây chuyền ép tự động với kiểm tra kích thước trong quá trình.", bullets: ["Khuôn liên hợp — cắt, đột và kéo trong một hành trình", "Thép carbon và không gỉ, dày 0.8 – 3.0 mm", "Kiểm tra đầu chuyền + lấy mẫu SPC trên đặc tính quan trọng"] },
  { image: "/images/process/powder-metallurgy-4.jpg", pdf: "PowderMetallurgy.pdf", kpiBadge: "±0.05 mm dung sai", tags: ["Ô tô", "Hệ truyền động"], title: "Linh kiện bánh răng thiêu kết gần net", summary: "Bánh răng, đĩa xích và bạc đạn bằng sắt và thép không gỉ thiêu kết gần net cho cụm truyền động và động cơ nhỏ sản lượng cao.", bullets: ["Hợp kim sắt-đồng và thép không gỉ thiêu kết", "Gần net — giảm thiểu gia công sau", "Xác minh mật độ + lấy mẫu kích thước theo lô"] },
  { image: "/images/capabilities/casting.jpg", pdf: "InvestmentCasting.pdf", kpiBadge: "100% kiểm CMM", tags: ["Công nghiệp", "Van & dòng chảy"], title: "Thân van đúc mẫu chảy thép không gỉ", summary: "Vật đúc mẫu chảy thép không gỉ 316L và CF8M cho thân van và bơm công nghiệp với hình học bên trong phức tạp — hoàn thiện theo tiêu chuẩn kích thước ASTM.", bullets: ["Thép không gỉ 316L / CF8M, chi tiết tới 8 kg", "Từ mẫu sáp đến gia công sau đúc", "Thẩm thấu chất chỉ thị + kiểm tra kích thước mỗi lô"] },
  { image: "/images/process/aluminum-extrusion-5.jpg", pdf: "InjectionMolding.pdf", kpiBadge: "98.4% đúng hạn", tags: ["Công nghiệp", "Bơm & van"], title: "Chương trình đúc thân bơm gang", summary: "Vỏ gang dẻo và gang xám trọng lượng vừa cho cụm bơm và van công nghiệp — đúc khuôn cát nội bộ, hoàn thiện bằng gia công hạ nguồn theo dung sai bản vẽ.", bullets: ["5 – 80 kg mỗi chi tiết, gang dẻo / gang xám", "Từ mẫu đến kiểm tra chi tiết đầu tiên nội bộ", "Gia công sau đúc và thẩm thấu chất chỉ thị"] },
];

export function getEvidenceCards(locale: string): EvidenceCard[] {
  return locale === "vi" ? VI : EN;
}
