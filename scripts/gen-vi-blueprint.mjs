import fs from "node:fs";

const src = JSON.parse(fs.readFileSync("content/blueprint.json", "utf8"));

const TRANSLATE = {
  // company
  "Multi-Process Manufacturing": "Sản xuất đa quy trình",
  "Serving Automotive applications": "Phục vụ các ứng dụng ngành ô tô",
  "Vcuinternational supports Automotive and Defence supply with multi-process manufacturing support, backed by IATF 16949 and ISO 9001:2015.":
    "Vcuinternational hỗ trợ cung ứng cho ngành ô tô và quốc phòng với năng lực sản xuất đa quy trình, được chứng nhận IATF 16949 và ISO 9001:2015.",

  // hero
  "Automotive and Defence Supply": "Cung ứng ngành ô tô và quốc phòng",
  "Precision manufacturing for Automotive and Defence programmes.":
    "Sản xuất chính xác cho các chương trình ô tô và quốc phòng.",
  "Supporting Automotive and Defence supply with IATF 16949 and cmm inspection.":
    "Hỗ trợ cung ứng ô tô và quốc phòng với IATF 16949 và kiểm tra CMM.",
  "Request a Quote": "Yêu cầu báo giá",
  "View Capabilities": "Xem năng lực",

  // top badges
  "Automotive supply": "Cung ứng ngành ô tô",
  "Prototype to production": "Từ mẫu thử đến sản xuất",
  "CMM Inspection": "Kiểm tra CMM",

  // stat labels
  "Capability Areas": "Lĩnh vực năng lực",
  "Accreditations": "Chứng nhận",
  "Industries Served": "Ngành phục vụ",

  // intros
  "CNC Machining, Casting, Sheet Metal Fabrication run in-house, with documented experience across Aluminium, Steel.":
    "Gia công CNC, đúc và gia công kim loại tấm thực hiện nội bộ, với kinh nghiệm tài liệu hóa trên nhôm và thép.",
  "Manufacturing support aligned to Automotive, Defence, Marine, with capability across CNC Machining, Casting.":
    "Hỗ trợ sản xuất phục vụ ngành ô tô, quốc phòng và hàng hải, với năng lực gia công CNC và đúc.",
  "What buyers get in practice: a shorter path to qualification, a narrower set of suppliers to manage, and fewer unknowns at launch.":
    "Lợi ích thực tế cho người mua: rút ngắn lộ trình đánh giá, thu hẹp danh sách nhà cung cấp cần quản lý và giảm thiểu rủi ro khi khởi chạy.",

  // capability names
  "CNC Machining": "Gia công CNC",
  "Casting": "Đúc",
  "Sheet Metal Fabrication": "Gia công kim loại tấm",
  "Welding & Assembly": "Hàn và lắp ráp",
  "Investment Casting": "Đúc khuôn mẫu chảy",
  "Sand Casting": "Đúc khuôn cát",
  "Die Casting": "Đúc áp lực",
  "Precision Machining": "Gia công chính xác",
  "Stamping": "Dập",
  "Laser Cutting": "Cắt laser",
  "Injection Molding": "Ép phun nhựa",

  // capability summaries
  "Precision-machined parts with dimensional verification support.":
    "Chi tiết gia công chính xác kèm xác minh kích thước.",
  "Metal casting support for repeatable automotive and defence components.":
    "Đúc kim loại cho các chi tiết ô tô và quốc phòng cần tính lặp lại cao.",
  "Formed and fabricated parts with downstream finishing support.":
    "Chi tiết tạo hình và gia công kèm các công đoạn hoàn thiện tiếp theo.",
  "Fabrication and assembly support for coordinated multi-stage component supply.":
    "Hỗ trợ chế tạo và lắp ráp cho chuỗi cung ứng linh kiện đa công đoạn.",

  // pdfBullets / specItems
  "CMM dimensional verification": "Xác minh kích thước CMM",
  "Prototype support": "Hỗ trợ mẫu thử",
  "DFM review": "Đánh giá DFM",
  "Complex stainless & carbon steel geometries":
    "Hình học phức tạp với thép không gỉ và thép carbon",
  "Post-machining to tight tolerance": "Gia công sau đúc với dung sai chặt",
  "Prototype and series production routes": "Quy trình sản xuất mẫu thử và hàng loạt",
  "Dimensional verification": "Xác minh kích thước",
  "3-axis / 4-axis / 5-axis CNC support": "Hỗ trợ CNC 3 trục / 4 trục / 5 trục",
  "Swiss turning, milling & grinding": "Tiện Swiss, phay và mài",
  "Aluminium, steel & stainless steel": "Nhôm, thép và thép không gỉ",
  "CMM dimensional inspection": "Kiểm tra kích thước CMM",
  "Laser cutting, bending & forming": "Cắt laser, uốn và tạo hình",
  "Downstream welding and assembly": "Hàn và lắp ráp tiếp theo",
  "Prototype and batch production": "Sản xuất mẫu thử và theo lô",
  "Surface finishing support": "Hỗ trợ hoàn thiện bề mặt",
  "MIG, TIG and robotic welding": "Hàn MIG, TIG và hàn robot",
  "Sub-assembly and full assembly": "Lắp ráp cụm con và lắp ráp hoàn chỉnh",
  "Structural and precision parts": "Chi tiết kết cấu và chính xác",
  "Inspection and dimensional sign-off": "Kiểm tra và phê duyệt kích thước",
  "Powder Metallurgy": "Luyện kim bột",

  // materials
  "Aluminium": "Nhôm",
  "Aluminum": "Nhôm",
  "Steel": "Thép",
  "Stainless Steel": "Thép không gỉ",
  "Copper & Brass": "Đồng và đồng thau",
  "Brass": "Đồng thau",
  "Copper": "Đồng",
  "Light Alloys": "Hợp kim nhẹ",
  "Magnesium": "Magie",

  // industries
  "Automotive": "Ô tô",
  "Defence": "Quốc phòng",
  "Marine": "Hàng hải",

  // trustSignals
  "Process coverage across CNC Machining, Casting, Sheet Metal Fabrication":
    "Bao phủ quy trình gia công CNC, đúc và gia công kim loại tấm",
  "CMM inspection": "Kiểm tra CMM",
  "OEM production support": "Hỗ trợ sản xuất OEM",
  "Export support": "Hỗ trợ xuất khẩu",

  // process workflow
  "Technical Review": "Đánh giá kỹ thuật",
  "RFQ review, DFM analysis and production route definition. Drawing alignment before tooling or material commitment.":
    "Rà soát RFQ, phân tích DFM và xác định tuyến sản xuất. Thống nhất bản vẽ trước khi đầu tư khuôn và vật tư.",
  "Prototype & Validation": "Mẫu thử và xác nhận",
  "Sample builds, first-off dimensional checks and first article inspection. Feedback loop before launch approval.":
    "Chế tạo mẫu, kiểm tra kích thước lần đầu và kiểm tra chi tiết đầu tiên. Vòng phản hồi trước khi phê duyệt khởi chạy.",
  "Launch Readiness": "Sẵn sàng khởi chạy",
  "PPAP submission, tooling sign-off and production control plan. Gate review before SOP release.":
    "Nộp PPAP, ký duyệt khuôn và kế hoạch kiểm soát sản xuất. Đánh giá cổng trước khi phát hành SOP.",
  "Volume Production": "Sản xuất hàng loạt",
  "Controlled serial manufacture with in-process inspection gates, SPC monitoring and delivery scheduling.":
    "Sản xuất hàng loạt được kiểm soát với các cổng kiểm tra trong quy trình, theo dõi SPC và lập kế hoạch giao hàng.",
  "Repeat Supply & Export": "Cung ứng lặp lại và xuất khẩu",
  "Ongoing delivery coordination, ERP-linked scheduling and export documentation for international programmes.":
    "Điều phối giao hàng liên tục, lập kế hoạch tích hợp ERP và tài liệu xuất khẩu cho các chương trình quốc tế.",

  // quality methods
  "Coordinate measurement capability for dimensional verification.":
    "Năng lực đo lường tọa độ phục vụ xác minh kích thước.",

  // program support
  "Launch Programme Support": "Hỗ trợ chương trình khởi chạy",
  "Cross-functional coordination from technical review through production readiness.":
    "Điều phối liên phòng ban từ đánh giá kỹ thuật đến sẵn sàng sản xuất.",
  "Engineering Collaboration": "Hợp tác kỹ thuật",
  "DFM review and technical alignment to support manufacturable outcomes.":
    "Đánh giá DFM và thống nhất kỹ thuật để đảm bảo khả năng sản xuất.",
  "RFQ & Procurement Support": "Hỗ trợ RFQ và mua hàng",
  "Structured quotation and buyer communication support during sourcing.":
    "Báo giá có cấu trúc và hỗ trợ trao đổi với người mua trong quá trình tìm nguồn.",
  "Supply Coordination": "Điều phối cung ứng",
  "Supplier-side coordination for delivery and production planning.":
    "Điều phối phía nhà cung cấp cho giao hàng và lập kế hoạch sản xuất.",

  // production scale
  "Prototype": "Mẫu thử",
  "Supports early-stage builds, samples and technical validation.":
    "Hỗ trợ chế tạo giai đoạn đầu, mẫu thử và xác nhận kỹ thuật.",

  // buyer proofs
  "One supplier, fewer interfaces": "Một nhà cung cấp, ít đầu mối hơn",
  "Consolidating multiple process steps under a single technical contact reduces sourcing overhead and handover risk.":
    "Gộp nhiều công đoạn về một đầu mối kỹ thuật giúp giảm chi phí tìm nguồn và rủi ro bàn giao.",
  "Evidence your quality team can sign off on":
    "Bằng chứng để đội chất lượng của bạn phê duyệt",
  "Inspection records, launch-control documentation and measurement traceability align with standard OEM qualification packs.":
    "Hồ sơ kiểm tra, tài liệu kiểm soát khởi chạy và truy xuất đo lường phù hợp với bộ tài liệu phê duyệt OEM tiêu chuẩn.",
  "Pre-qualified for regulated automotive sourcing":
    "Đã được phê duyệt sơ bộ cho tìm nguồn ô tô được kiểm soát",
  "IATF-aligned quality systems plus documented automotive supply experience shorten the supplier-approval path.":
    "Hệ thống chất lượng tương thích IATF cùng kinh nghiệm cung ứng ô tô có tài liệu giúp rút ngắn lộ trình phê duyệt nhà cung cấp.",

  // buyer challenge
  "Stay with one supplier from first sample to repeat supply.":
    "Đồng hành cùng một nhà cung cấp từ mẫu đầu tiên đến cung ứng lặp lại.",
  "Keep the same technical contact, the same quality baseline, and the same production route from validation through volume — no mid-programme re-qualification.":
    "Giữ nguyên đầu mối kỹ thuật, tiêu chuẩn chất lượng và tuyến sản xuất từ giai đoạn xác nhận đến sản xuất hàng loạt — không phải đánh giá lại giữa chương trình.",

  // lead times
  "RFQ response": "Phản hồi RFQ",
  "24–48 hour technical review": "Đánh giá kỹ thuật trong 24–48 giờ",
  "Project discussion": "Trao đổi dự án",
  "Engineering team engagement within 3 business days":
    "Đội kỹ thuật phản hồi trong 3 ngày làm việc",

  // contact
  "Share your requirements, application, and timing to discuss your project with the team.":
    "Chia sẻ yêu cầu, ứng dụng và thời gian để trao đổi dự án cùng đội ngũ.",

  // nav labels
  "What We Do": "Chúng tôi làm gì",
  "Capabilities": "Năng lực",
  "Services": "Dịch vụ",
  "Company": "Công ty",
  "Contact": "Liên hệ",

  // process highlights (templateSlots)
  "Progressive and compound die stamping for sheet metal components.":
    "Dập tiến và dập tổ hợp cho chi tiết kim loại tấm.",
  "Progressive die stamping for sheet metal components":
    "Dập tiến cho chi tiết kim loại tấm",
  "High-volume in-process inspection": "Kiểm tra trong quy trình ở sản lượng cao",
  "Stamped Sheet Metal Programme": "Chương trình kim loại tấm dập",
  "Powder metallurgy for near-net-shape sintered components.":
    "Luyện kim bột cho chi tiết thiêu kết gần đúng hình dạng cuối.",
  "Near-net-shape sintered iron and steel components":
    "Chi tiết sắt và thép thiêu kết gần đúng hình dạng cuối",
  "Density and dimensional control": "Kiểm soát mật độ và kích thước",
  "Sintered PM Components Programme": "Chương trình chi tiết PM thiêu kết",
  "Near-net-shape metal casting with full post-process machining support.":
    "Đúc kim loại gần đúng hình dạng cuối kèm hỗ trợ gia công sau đúc.",
  "Complex geometries in stainless & carbon steel":
    "Hình học phức tạp với thép không gỉ và thép carbon",
  "Cast Metal Components Programme": "Chương trình chi tiết đúc kim loại",
  "Thermoplastic and engineering-polymer injection moulding.":
    "Ép phun nhựa nhiệt dẻo và polymer kỹ thuật.",
  "Thermoplastic engineering polymers": "Polymer kỹ thuật nhiệt dẻo",
  "Multi-cavity tooling for high-volume production":
    "Khuôn nhiều lòng cho sản xuất sản lượng cao",
  "Injection Moulded Parts Programme": "Chương trình chi tiết ép phun",
  "<200 PPM defect rate*": "<200 PPM tỷ lệ lỗi*",
  "100% CMM verified*": "100% xác minh CMM*",

  // quality KPI labels
  "Defect Rate": "Tỷ lệ lỗi",
  "On-Time Delivery": "Giao hàng đúng hạn",
  "First Pass Yield": "Hiệu suất lần đầu",
  "Audit Score": "Điểm đánh giá",
  "Customer Satisfaction": "Sự hài lòng khách hàng",
  "Improving": "Đang cải thiện",
  "Stable": "Ổn định",
  "Verified": "Đã xác minh",

  // preservation notes
  "recognisable brand colours": "màu sắc thương hiệu dễ nhận biết",
  "credible product or factory imagery":
    "hình ảnh sản phẩm hoặc nhà máy đáng tin cậy",
  "overall supplier identity": "nhận diện tổng thể của nhà cung cấp",
  "existing navigation intent where sensible":
    "ý đồ điều hướng hiện tại khi phù hợp",
};

// Fields whose string values should NOT be translated (identifiers, slugs, codes, etc.)
const SKIP_KEYS = new Set([
  "url",
  "logoUrl",
  "imageUrl",
  "sourcePdfUrl",
  "sourcePdfFilename",
  "primaryColor",
  "provenance",
  "supplierType",
  "category",
  "source",
  "id",
  "alt",
  "email",
  "phone",
  "address",
  "name", // company name; cert names; logo file-hash names — leave alone (industry codes / proper nouns)
  "kind",
  "value", // numeric stats expressed as strings
  "step", // "01" etc
  "sourcePageType",
  "inferredUsageType",
]);

function translateValue(value) {
  if (typeof value !== "string") return value;
  if (!value) return value;
  return TRANSLATE[value] ?? value;
}

function walk(node, parentKey) {
  if (Array.isArray(node)) {
    return node.map((item) => walk(item, parentKey));
  }
  if (node && typeof node === "object") {
    const out = {};
    for (const [k, v] of Object.entries(node)) {
      out[k] = walk(v, k);
    }
    return out;
  }
  if (typeof node === "string") {
    if (SKIP_KEYS.has(parentKey)) return node;
    return translateValue(node);
  }
  return node;
}

const translated = walk(src, null);

// Industry & material names live under .name and .family — these we DO want translated.
// Override SKIP for selected paths by post-walking.
const reTranslateList = (arr, field) => {
  if (!Array.isArray(arr)) return;
  for (const item of arr) {
    if (item && typeof item === "object" && typeof item[field] === "string") {
      item[field] = translateValue(item[field]);
    }
  }
};

// industries[].name (translate Automotive/Defence/Marine)
reTranslateList(translated.industries, "name");
reTranslateList(translated.templateSlots?.industries, "name");
// materials[].family
reTranslateList(translated.materials, "family");
reTranslateList(translated.templateSlots?.materials, "family");
// productionScale[].stage
reTranslateList(translated.productionScale, "stage");
reTranslateList(translated.templateSlots?.productionScale, "stage");
// qualityMethods[].method
reTranslateList(translated.qualityMethods, "method");
reTranslateList(translated.templateSlots?.qualityMethods, "method");
// qualityKpis[].label and .status
const reTranslatePair = (arr, ...fields) => {
  if (!Array.isArray(arr)) return;
  for (const item of arr) {
    for (const f of fields) {
      if (item && typeof item[f] === "string") {
        item[f] = translateValue(item[f]);
      }
    }
  }
};
reTranslatePair(translated.templateSlots?.qualityKpis, "label", "status");
// processHighlights[].processName, .programmeTitle, .summary, bullets, .kpiProof
const fixHighlights = (arr) => {
  if (!Array.isArray(arr)) return;
  for (const h of arr) {
    if (typeof h.processName === "string") h.processName = translateValue(h.processName);
    if (typeof h.programmeTitle === "string") h.programmeTitle = translateValue(h.programmeTitle);
    if (typeof h.summary === "string") h.summary = translateValue(h.summary);
    if (typeof h.kpiProof === "string") h.kpiProof = translateValue(h.kpiProof);
    if (Array.isArray(h.bullets)) h.bullets = h.bullets.map(translateValue);
  }
};
fixHighlights(translated.templateSlots?.processHighlights);

// navLinks, recommendedPages, navLabels, topTrustBadges, additionalCapabilities,
// allCapabilitiesCanonical, primary/secondaryCapabilitiesCanonical,
// preservationNotes — these are bare string arrays where the walker only saw
// scalar strings but parentKey was already the array key (which IS in SKIP set as 'name' etc).
// Actually the walker handles arrays via .map with parentKey of the array — but the array's parentKey
// is the array's own key. For e.g. navLinks: ["What We Do"], walker walks the array, then each string
// element has parentKey = "navLinks". navLinks is not in SKIP so translation happens. Good.
// But "alt" IS in SKIP — let me double check heroImages alt strings stay EN.

// Sanity: ensure customer-logo .name (hex) stays EN — covered by SKIP_KEYS.has("name").

// company.name should stay "Vcuinternational"
if (translated.company?.name) translated.company.name = src.company.name;

fs.writeFileSync(
  "content/blueprint.vi.json",
  JSON.stringify(translated, null, 2) + "\n",
);
console.log("Wrote content/blueprint.vi.json");
console.log("Sample hero headline:", translated.heroHeadline);
console.log("Sample about:", translated.company.about);
console.log("Sample lead-time:", translated.leadTimes?.[0]);
