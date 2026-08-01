'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function CareersPage() {
  const [submitted, setSubmitted] = useState(false);

  const sampleJobs = [
    { id: 1, title: 'Kỹ Sư Bảo Trì Máy Cơ Điện', dept: 'Bảo Trì - Kỹ Thuật', loc: 'Thoại Sơn, An Giang', type: 'Toàn thời gian' },
    { id: 2, title: 'Chuyên Viên Kiểm Soát Chất Lượng (QC)', dept: 'QC', loc: 'Thoại Sơn, An Giang', type: 'Toàn thời gian' },
    { id: 3, title: 'Lập Trình Viên Mobile Native (Kotlin/Swift)', dept: 'Công Nghệ Thông Tin (IT)', loc: 'TP. Hồ Chí Minh / Hybrid', type: 'Toàn thời gian' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f9fdfb]">
      <Header />
      <main className="flex-1 py-16 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#08221a]">Tuyển Dụng & Cơ Hội Nghề Nghiệp</h1>
          <p className="text-gray-600 mt-2 text-base">Gia nhập đội ngũ TBS Group — Cùng nhau phát triển và tạo dựng giá trị</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-[#08221a] mb-4">Vị Trí Đang Tuyển Dụng</h2>
            {sampleJobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-[#158a63] mb-2">
                    {job.dept}
                  </div>
                  <h3 className="text-lg font-bold text-[#08221a]">{job.title}</h3>
                  <div className="text-xs text-gray-500 mt-1 flex gap-4">
                    <span>📍 {job.loc}</span>
                    <span>⏰ {job.type}</span>
                  </div>
                </div>
                <a
                  href="#apply-form"
                  className="px-4 py-2 rounded-lg bg-[#158a63] text-white text-xs font-semibold hover:bg-[#1fae7d] transition text-center"
                >
                  Ứng Tuyện Ngay
                </a>
              </div>
            ))}
          </div>

          <div id="apply-form" className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl h-fit">
            <h2 className="text-lg font-bold text-[#08221a] mb-4">Nộp Hồ Sơ Ứng Tuyện</h2>
            {submitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl text-center">
                ✅ Đã nhận hồ sơ! Bộ phận Nhân sự TBS Group sẽ liên hệ với bạn trong thời gian sớm nhất.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Họ và Tên *</label>
                  <input required type="text" className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#158a63]" placeholder="Nguyễn Văn A" />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Email *</label>
                  <input required type="email" className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#158a63]" placeholder="nguyenvana@gmail.com" />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Số Điện Thoại *</label>
                  <input required type="tel" className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#158a63]" placeholder="0901234567" />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Vị Trí Ứng Tuyện</label>
                  <select className="w-full p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#158a63]">
                    {sampleJobs.map((j) => (
                      <option key={j.id} value={j.title}>{j.title}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#158a63] text-white font-bold hover:bg-[#1fae7d] transition"
                >
                  Gửi Hồ Sơ
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
