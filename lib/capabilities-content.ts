// Capability accordion content — the 10-item "What we do" list mirroring the
// openfoundry.app/preview/vcuinternational-owjd2j page.
//
// EN values for summary/tolerances/materials are verbatim from the preview; the
// labelled grid fields are reconstructed per category. VI is a full translation.
// Each capability uses a distinct local category-specific photo for visual variety.

export interface CapabilityItem {
  name: string;
  image: string;
  summary: string;
  processScope: string;
  materials: string;
  tolerances: string;
  inspection: string;
  productionScale: string;
  applications: string[];
}

const IMG = {
  cnc: "/images/capabilities/cnc-machining.jpg",
  casting: "/images/capabilities/casting.jpg",
  sheet: "/images/capabilities/sheet-metal-fabrication.jpg",
  welding: "/images/capabilities/welding-assembly.jpg",
  ext4: "/images/process/aluminum-extrusion-4.jpg",
  pm4: "/images/process/powder-metallurgy-4.jpg",
  ext5: "/images/process/aluminum-extrusion-5.jpg",
  stamping: "/images/process/stamping-1.jpg",
  laser: "/stock-heroes/sheet-metal-2.jpg",
  pm5: "/images/process/powder-metallurgy-5.jpg",
};

const EN: CapabilityItem[] = [
  { name: "Precision Machining", image: IMG.cnc, summary: "Precision machining across a documented envelope, with in-process inspection and material traceability.", processScope: "Prototype → pilot → volume", materials: "Aluminium, stainless, brass, specialty alloys", tolerances: "±0.01 mm typical", inspection: "CMM + in-process dimensional", productionScale: "100 – 100,000+ parts / year", applications: ["Precision housings and brackets", "Medical instrument components", "Aerospace structural mounts"] },
  { name: "Casting", image: IMG.casting, summary: "Casting route with tooling oversight, downstream machining and inspection in sequence.", processScope: "Prototype → pilot → volume", materials: "Aluminium, ferrous alloys, copper alloys", tolerances: "±0.1 mm as-cast · ±0.01 mm post-machining", inspection: "Dimensional + dye-penetrant per lot", productionScale: "100 – 100,000+ parts / year", applications: ["Pump and valve bodies", "Structural housings", "Complex near-net geometries"] },
  { name: "Sheet Metal Fabrication", image: IMG.sheet, summary: "Formed and fabricated parts with downstream finishing support.", processScope: "Prototype → pilot → volume", materials: "Mild steel, stainless, aluminium", tolerances: "±0.1 mm", inspection: "First-off + in-process dimensional", productionScale: "100 – 100,000+ parts / year", applications: ["Enclosures and brackets", "Chassis and panels", "Fabricated assemblies"] },
  { name: "Welding & Assembly", image: IMG.welding, summary: "Welding and assembly with documented procedure specs and inspection aligned to OEM expectations.", processScope: "Prototype → pilot → volume", materials: "Carbon steel, stainless, aluminium", tolerances: "Assembly stack per drawing", inspection: "Visual + dimensional per WPS", productionScale: "100 – 100,000+ parts / year", applications: ["Multi-part weldments", "Fabricated sub-assemblies", "Structural frames"] },
  { name: "Investment Casting", image: IMG.ext4, summary: "Casting route with tooling oversight, downstream machining and inspection in sequence.", processScope: "Prototype → pilot → volume", materials: "Aluminium, ferrous alloys, copper alloys", tolerances: "±0.1 mm as-cast · ±0.01 mm post-machining", inspection: "Dye-penetrant + dimensional per lot", productionScale: "100 – 100,000+ parts / year", applications: ["Stainless valve bodies", "Complex internal geometries", "Near-net structural parts"] },
  { name: "Sand Casting", image: IMG.pm4, summary: "Casting route with tooling oversight, downstream machining and inspection in sequence.", processScope: "Prototype → pilot → volume", materials: "Ductile iron, grey iron, aluminium", tolerances: "±0.1 mm as-cast · ±0.01 mm post-machining", inspection: "Dimensional + dye-penetrant per lot", productionScale: "100 – 100,000+ parts / year", applications: ["Medium-to-large iron parts", "Pump and valve housings", "Structural castings"] },
  { name: "Die Casting", image: IMG.ext5, summary: "Casting route with tooling oversight, downstream machining and inspection in sequence.", processScope: "Prototype → pilot → volume", materials: "Aluminium, zinc alloys", tolerances: "±0.1 mm as-cast · ±0.01 mm post-machining", inspection: "Dimensional + porosity check per lot", productionScale: "100 – 100,000+ parts / year", applications: ["High-volume housings", "Thin-wall components", "Heat-sink and bracket parts"] },
  { name: "Stamping", image: IMG.stamping, summary: "Metal stamping with progressive-die capability and in-line inspection at production volume.", processScope: "Prototype → pilot → volume", materials: "Carbon steel, stainless, aluminium", tolerances: "±0.05 mm", inspection: "First-off + SPC sampling", productionScale: "100 – 100,000+ parts / year", applications: ["Brackets and clips", "Stamped enclosures", "High-volume components"] },
  { name: "Laser Cutting", image: IMG.laser, summary: "Laser Cutting handled with process controls, documentation and inspection evidence engineers need to qualify the part.", processScope: "Prototype → pilot → volume", materials: "Mild steel, stainless, aluminium", tolerances: "±0.1 mm", inspection: "Profile + dimensional check", productionScale: "100 – 100,000+ parts / year", applications: ["Profiles and blanks", "Brackets", "Flat components"] },
  { name: "Injection Molding", image: IMG.pm5, summary: "Injection moulding from tool try-out through serial production, polymer range matched to programme.", processScope: "Prototype → pilot → volume", materials: "ABS, PC, PP, POM, Nylon, specialty polymers", tolerances: "±0.05 mm", inspection: "Dimensional + visual per AQL", productionScale: "100 – 100,000+ parts / year", applications: ["Housings and covers", "Functional polymer parts", "High-volume mouldings"] },
];

const SCOPE_VI = "Mẫu thử → thử nghiệm → sản xuất hàng loạt";
const SCALE_VI = "100 – 100.000+ chi tiết / năm";

const VI: CapabilityItem[] = [
  { name: "Gia công chính xác", image: IMG.cnc, summary: "Gia công chính xác trong phạm vi được tài liệu hoá, với kiểm tra trong quá trình và truy xuất nguồn gốc vật liệu.", processScope: SCOPE_VI, materials: "Nhôm, thép không gỉ, đồng thau, hợp kim đặc biệt", tolerances: "±0.01 mm điển hình", inspection: "CMM + đo kích thước trong quá trình", productionScale: SCALE_VI, applications: ["Vỏ và giá đỡ chính xác", "Linh kiện thiết bị y tế", "Giá đỡ kết cấu hàng không"] },
  { name: "Đúc", image: IMG.casting, summary: "Quy trình đúc với giám sát khuôn mẫu, gia công và kiểm tra theo trình tự.", processScope: SCOPE_VI, materials: "Nhôm, hợp kim sắt, hợp kim đồng", tolerances: "±0.1 mm khi đúc · ±0.01 mm sau gia công", inspection: "Đo kích thước + thẩm thấu chất chỉ thị theo lô", productionScale: SCALE_VI, applications: ["Thân bơm và van", "Vỏ kết cấu", "Hình học gần net phức tạp"] },
  { name: "Gia công kim loại tấm", image: IMG.sheet, summary: "Chi tiết được tạo hình và gia công với hỗ trợ hoàn thiện hạ nguồn.", processScope: SCOPE_VI, materials: "Thép nhẹ, thép không gỉ, nhôm", tolerances: "±0.1 mm", inspection: "Kiểm tra đầu chuyền + đo kích thước trong quá trình", productionScale: SCALE_VI, applications: ["Vỏ và giá đỡ", "Khung và tấm", "Cụm lắp ráp"] },
  { name: "Hàn & Lắp ráp", image: IMG.welding, summary: "Hàn và lắp ráp với quy trình được tài liệu hoá và kiểm tra phù hợp yêu cầu OEM.", processScope: SCOPE_VI, materials: "Thép carbon, thép không gỉ, nhôm", tolerances: "Chồng lắp theo bản vẽ", inspection: "Kiểm tra trực quan + kích thước theo WPS", productionScale: SCALE_VI, applications: ["Cụm hàn nhiều chi tiết", "Cụm lắp ráp phụ", "Khung kết cấu"] },
  { name: "Đúc mẫu chảy", image: IMG.ext4, summary: "Quy trình đúc với giám sát khuôn mẫu, gia công và kiểm tra theo trình tự.", processScope: SCOPE_VI, materials: "Nhôm, hợp kim sắt, hợp kim đồng", tolerances: "±0.1 mm khi đúc · ±0.01 mm sau gia công", inspection: "Thẩm thấu chất chỉ thị + đo kích thước theo lô", productionScale: SCALE_VI, applications: ["Thân van thép không gỉ", "Hình học bên trong phức tạp", "Chi tiết kết cấu gần net"] },
  { name: "Đúc khuôn cát", image: IMG.pm4, summary: "Quy trình đúc với giám sát khuôn mẫu, gia công và kiểm tra theo trình tự.", processScope: SCOPE_VI, materials: "Gang dẻo, gang xám, nhôm", tolerances: "±0.1 mm khi đúc · ±0.01 mm sau gia công", inspection: "Đo kích thước + thẩm thấu chất chỉ thị theo lô", productionScale: SCALE_VI, applications: ["Chi tiết gang vừa và lớn", "Vỏ bơm và van", "Vật đúc kết cấu"] },
  { name: "Đúc áp lực", image: IMG.ext5, summary: "Quy trình đúc với giám sát khuôn mẫu, gia công và kiểm tra theo trình tự.", processScope: SCOPE_VI, materials: "Nhôm, hợp kim kẽm", tolerances: "±0.1 mm khi đúc · ±0.01 mm sau gia công", inspection: "Đo kích thước + kiểm tra rỗ khí theo lô", productionScale: SCALE_VI, applications: ["Vỏ sản lượng cao", "Chi tiết thành mỏng", "Tản nhiệt và giá đỡ"] },
  { name: "Dập", image: IMG.stamping, summary: "Dập kim loại với khả năng khuôn liên hợp và kiểm tra trong chuyền ở quy mô sản xuất.", processScope: SCOPE_VI, materials: "Thép carbon, thép không gỉ, nhôm", tolerances: "±0.05 mm", inspection: "Kiểm tra đầu chuyền + lấy mẫu SPC", productionScale: SCALE_VI, applications: ["Giá đỡ và kẹp", "Vỏ dập", "Linh kiện sản lượng cao"] },
  { name: "Cắt laser", image: IMG.laser, summary: "Cắt laser với kiểm soát quy trình, tài liệu và bằng chứng kiểm tra mà kỹ sư cần để duyệt chi tiết.", processScope: SCOPE_VI, materials: "Thép nhẹ, thép không gỉ, nhôm", tolerances: "±0.1 mm", inspection: "Kiểm tra biên dạng + kích thước", productionScale: SCALE_VI, applications: ["Biên dạng và phôi", "Giá đỡ", "Chi tiết phẳng"] },
  { name: "Ép phun", image: IMG.pm5, summary: "Ép phun từ thử khuôn đến sản xuất hàng loạt, dải polymer phù hợp với chương trình.", processScope: SCOPE_VI, materials: "ABS, PC, PP, POM, Nylon, polymer đặc biệt", tolerances: "±0.05 mm", inspection: "Đo kích thước + trực quan theo AQL", productionScale: SCALE_VI, applications: ["Vỏ và nắp", "Chi tiết polymer chức năng", "Sản phẩm ép sản lượng cao"] },
];

export function getCapabilityItems(locale: string): CapabilityItem[] {
  return locale === "vi" ? VI : EN;
}
