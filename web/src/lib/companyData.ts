export interface CompanyStat {
  value: string;
  label: string;
  description: string;
  color: string;
}

export interface CompanySector {
  id: string;
  title: string;
  description: string;
  highlight: string;
  icon: string;
  image: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export const COMPANY_INFO = {
  name: "TBS Group — Tập Đoàn Sản Xuất & Đầu Tư Đa Ngành",
  shortName: "TBS Group",
  subTitle: "Tổ Hợp Giày Thoại Sơn & Hệ Thống Nhà Máy Thông Minh",
  slogan: "Thế giới làm được, ắt ta sẽ làm được",
  intro: "Sau 30 năm sáng tạo và phát triển, TBS Group khẳng định vị thế dẫn đầu với 6 lĩnh vực kinh doanh trụ cột, tiên phong chuyển đổi số quy trình vận hành và quản lý sản xuất nhà máy công nghệ cao.",
  contact: {
    address: "Ấp Thanh niên, TT. Phú Hòa, Huyện Thoại Sơn, Tỉnh An Giang, Việt Nam",
    headquarter: "Số 5, Đường ĐT 743, Phường An Bình, TP. Dĩ An, Bình Dương",
    phone: "0296 3878 099",
    email: "info@tbsgroup.vn",
    website: "https://www.tbsgroup.vn"
  }
};

export const COMPANY_STATS: CompanyStat[] = [
  {
    value: "30+",
    label: "Năm Phát Triển",
    description: "Hành trình 30 năm sáng tạo & khẳng định thương hiệu Việt trên thương trường quốc tế.",
    color: "from-amber-400 to-yellow-500"
  },
  {
    value: "6",
    label: "Ngành Trụ Cột",
    description: "Da giày, Túi xách, BĐS & Hạ tầng, Logistics, Du lịch khách sạn và Thương mại dịch vụ.",
    color: "from-emerald-400 to-teal-500"
  },
  {
    value: "25M",
    label: "Đôi Giày / Năm",
    description: "Năng lực sản xuất da giày tập đoàn với 33 chuyền công nghệ cao.",
    color: "from-emerald-400 to-cyan-500"
  },
  {
    value: "10M",
    label: "Sản Phẩm / Năm",
    description: "Sản lượng Tổ hợp Giày Thoại Sơn cung ứng cho đối tác chiến lược Decathlon.",
    color: "from-yellow-400 to-amber-500"
  },
  {
    value: "50,000+",
    label: "Nhân Sự",
    description: "Đội ngũ nhân sự chuyên nghiệp toàn hệ thống (5.000 nhân sự tại Tổ hợp Thoại Sơn).",
    color: "from-teal-400 to-emerald-500"
  },
  {
    value: "220,000 m²",
    label: "Kho Logistics",
    description: "Trung tâm ICD TBS Tân Vạn sức chứa 60.000 container tại tứ giác kinh tế phía Nam.",
    color: "from-emerald-300 to-emerald-500"
  }
];

export const COMPANY_SECTORS: CompanySector[] = [
  {
    id: "da-giay",
    title: "Sản Xuất Công Nghiệp Da Giày",
    description: "Duy trì vị thế dẫn đầu bằng những sản phẩm đạt tiêu chuẩn chất lượng cao. Sở hữu 33 chuyền sản xuất hiện đại và đội ngũ 17.000 công nhân tay nghề cao.",
    highlight: "25 triệu đôi/năm • 33 chuyền sản xuất",
    icon: "👞",
    image: "https://www.tbsgroup.vn/wp-content/uploads/2014/12/Da-giay1.jpg"
  },
  {
    id: "tui-xach",
    title: "Sản Xuất Công Nghiệp Túi Xách",
    description: "Cung cấp túi xách cao cấp đạt chuẩn quốc tế cho các thương hiệu hàng đầu thế giới. Đạt mốc 10 triệu sản phẩm với tốc độ tăng trưởng 20%/năm.",
    highlight: "10 triệu sản phẩm • Tăng trưởng 20%/năm",
    icon: "💼",
    image: "https://www.tbsgroup.vn/wp-content/uploads/2014/12/Tui-xach1.jpg"
  },
  {
    id: "logistics",
    title: "Cảng & Dịch Vụ Logistics (ICD Tân Vạn)",
    description: "Tọa lạc tại vị trí chiến lược trung tâm tứ giác kinh tế TP.HCM - Bình Dương - Đồng Nai - Vũng Tàu. Cung cấp hạ tầng kho bãi hiện đại bậc nhất.",
    highlight: "220.000m² kho • 60.000 container",
    icon: "🚢",
    image: "https://www.tbsgroup.vn/wp-content/uploads/2014/12/04_LOGISTICS.jpg"
  },
  {
    id: "bds",
    title: "Đầu Tư BĐS & Hạ Tầng Công Nghiệp",
    description: "Chuyên đầu tư, phát triển, quản lý và vận hành các khu công nghiệp, dự án bất động sản công nghiệp và khu đô thị dân dụng quy mô lớn.",
    highlight: "Khu công nghiệp & Khu đô thị cao cấp",
    icon: "🏢",
    image: "https://www.tbsgroup.vn/wp-content/uploads/2014/12/03_INVESTMENT_ASSET_MANAGEMENT.jpg"
  },
  {
    id: "hospitality",
    title: "Du Lịch, Khách Sạn & Sân Golf (Hospitality)",
    description: "Đầu tư và quản lý vận hành chuỗi khách sạn 5 sao thương hiệu Mai House, khu nghỉ dưỡng cao cấp và hệ thống sân golf tiêu chuẩn quốc tế.",
    highlight: "Chuỗi Khách sạn Mai House 5★ & Sân Golf",
    icon: "🏖️",
    image: "https://www.tbsgroup.vn/wp-content/uploads/2014/12/05_HOSPITALITY.jpg"
  },
  {
    id: "retail",
    title: "Thương Mại & Phân Phối Dịch Vụ (Retail)",
    description: "Phân phối độc quyền thương hiệu thời trang ECCO và các thương hiệu quốc tế uy tín, mang lại sản phẩm phong cách đột phá cho người tiêu dùng.",
    highlight: "Phân phối độc quyền thương hiệu ECCO",
    icon: "🛍️",
    image: "https://www.tbsgroup.vn/wp-content/uploads/2014/12/06_RETAIL.jpg"
  }
];

export const COMPANY_TIMELINE: TimelineEvent[] = [
  {
    year: "2017",
    title: "Khởi Nguồn Hành Trình Thoại Sơn",
    subtitle: "Đặt Nền Móng Cơ Sở Hạ Tầng & Đào Tạo Nhân Lực",
    description: "TBS Group chính thức triển khai dự án tại Thoại Sơn (An Giang). Đón đoàn đánh giá của đối tác chiến lược quốc tế Decathlon và khởi công Block 1 nhà máy.",
    image: "https://tbs-thoaisonshoes.com/images/slides/05.webp"
  },
  {
    year: "2018",
    title: "Dấu Ấn Sản Phẩm Xuất Khẩu Đầu Tiên",
    subtitle: "Sản Xuất Thành Công Đôi Giày Decathlon Đầu Tiên",
    description: "Khởi công trạm xử lý nước thải hiện đại. Tháng 11/2018 ghi dấu mốc lịch sử khi đôi giày Decathlon đầu tiên xuất xưởng đạt chuẩn chất lượng quốc tế.",
    image: "https://tbs-thoaisonshoes.com/images/slides/56.webp"
  },
  {
    year: "2019",
    title: "Vận Hành Ổn Định & Mở Rộng Chuyền",
    subtitle: "Hoàn Thiện Quy Trình & Chuẩn Hóa Năng Suất",
    description: "Dây chuyền sản xuất đi vào hoạt động ổn định với 33 chuyền, đáp ứng xuất sắc các tiêu chí về sản lượng và tiêu chuẩn an toàn lao động.",
    image: "https://tbs-thoaisonshoes.com/images/slides/60.webp"
  },
  {
    year: "2020",
    title: "Thích Ứng Linh Hoạt Vượt Đại Dịch",
    subtitle: "Số Hóa Báo Cáo & Giám Sát Từ Xa",
    description: "Ứng dụng các giải pháp quản lý linh hoạt, số hóa quy trình báo cáo và duy trì hoạt động sản xuất an toàn thông suốt trong giai đoạn dịch bệnh.",
    image: "https://tbs-thoaisonshoes.com/images/slides/58.webp"
  },
  {
    year: "2021",
    title: "Phát Triển Bền Vững & Môi Trường",
    subtitle: "Tối Ưu Hóa Năng Lượng & An Toàn Lao Động",
    description: "Đẩy mạnh các chương trình cải tiến môi trường làm việc, đầu tư hệ thống năng lượng xanh và đào tạo nâng cao tay nghề cho đội ngũ nhân sự.",
    image: "https://tbs-thoaisonshoes.com/images/slides/04.webp"
  },
  {
    year: "2022 - 2023",
    title: "Mở Rộng Quy Mô & Nâng Cao Chất Lượng",
    subtitle: "Đạt Mốc 10 Triệu Sản Phẩm / Năm",
    description: "Nâng cấp trang thiết bị hiện đại, mở rộng công suất sản xuất chạm mốc 10 triệu đôi giày/năm cho Tổ hợp Giày Thoại Sơn.",
    image: "https://tbs-thoaisonshoes.com/images/slides/005.webp"
  },
  {
    year: "2024 - 2025",
    title: "Chuyển Đổi Số Toàn Diện TBS II",
    subtitle: "Xây Dựng Mô Hình Nhà Máy Thông Minh Industry 4.0",
    description: "Triển khai hệ thống TBS II: Số hóa 100% giấy tờ biểu mẫu, tích hợp app mobile Native quét QR báo lỗi máy thời gian thực và BI Dashboard 24/7.",
    image: "https://www.tbsgroup.vn/wp-content/uploads/2014/12/TBS-GROUP_team_1836-x-765-2.jpg"
  }
];
