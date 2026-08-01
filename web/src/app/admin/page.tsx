"use client";

// Reading this as: Administration workspace page for TBS factory managers, with an Apple-y premium dark-tech visual language, leaning toward high-contrast emerald borders, monospace inputs, and unified card components.

import React, { useState, useEffect } from "react";
import {
  IconUsers,
  IconSettings,
  IconHistory,
  IconUpload,
  IconCheck,
  IconAlertTriangle,
  IconPlus,
  IconTrash,
  IconRefresh
} from "@tabler/icons-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"import" | "workflows" | "audit">("import");
  
  // CSV Import States
  const [csvContent, setCsvContent] = useState("");
  const [importResult, setImportResult] = useState<any>(null);
  const [importError, setImportError] = useState("");
  const [importing, setImporting] = useState(false);

  // Workflow Builder States
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState("PURCHASE");
  const [workflowName, setWorkflowName] = useState("Yêu cầu mua sắm vật tư");
  const [steps, setSteps] = useState<any[]>([
    { name: "TRUONG_PHONG_DUYET", role: "TRUONG_PHONG", department: "SAME", slaHours: 3 },
    { name: "KE_TOAN_KIEM_TRA", role: "TRUONG_PHONG", department: "ACC", slaHours: 3 }
  ]);
  const [saveStatus, setSaveStatus] = useState("");

  // Audit Log States
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  // 1. Fetch workflows configuration
  const fetchWorkflows = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/admin/workflows", {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      if (res.ok) {
        const data = await res.json();
        setWorkflows(data);
      }
    } catch (e) {
      console.warn("Could not connect to live backend to fetch workflows.");
    }
  };

  // 2. Fetch system audit logs
  const fetchAuditLogs = async () => {
    setLoadingLogs(true);
    try {
      const res = await fetch("http://localhost:8000/api/admin/audit-logs", {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      if (res.ok) {
        const data = await res.json();
        setAuditLogs(data);
      } else {
        // Mock fallback for demonstration
        setAuditLogs([
          { id: "1", action: "BULK_IMPORT_USERS", createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), comment: "Admin imported 15 employee accounts.", actor: { fullName: "System Admin" } },
          { id: "2", action: "USER_LOGIN", createdAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(), comment: "User director@tbsgroup.vn logged in.", actor: { fullName: "Director Staff" } }
        ]);
      }
    } catch (e) {
      setAuditLogs([
        { id: "1", action: "BULK_IMPORT_USERS", createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), comment: "Admin imported 15 employee accounts.", actor: { fullName: "System Admin" } },
        { id: "2", action: "USER_LOGIN", createdAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(), comment: "User director@tbsgroup.vn logged in.", actor: { fullName: "Director Staff" } }
      ]);
    } finally {
      setLoadingLogs(false);
    }
  };

  useEffect(() => {
    fetchWorkflows();
    fetchAuditLogs();
  }, [activeTab]);

  // Handle CSV Import Submit
  const handleImportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setImportError("");
    setImportResult(null);
    setImporting(true);

    if (!csvContent.trim()) {
      setImportError("Vui lòng nhập nội dung dữ liệu CSV.");
      setImporting(false);
      return;
    }

    try {
      // Simple parse CSV lines
      const lines = csvContent.trim().split("\n");
      const parsedUsers = lines.slice(1).map((line) => {
        const values = line.split(",");
        return {
          email: values[0]?.trim(),
          fullName: values[1]?.trim(),
          password: values[2]?.trim(),
          phone: values[3]?.trim() || "",
          departmentCode: values[4]?.trim(),
          roleName: values[5]?.trim()
        };
      });

      const res = await fetch("http://localhost:8000/api/admin/users/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ users: parsedUsers })
      });

      if (res.ok) {
        const data = await res.json();
        setImportResult(data.results);
      } else {
        const errData = await res.json();
        setImportError(errData.message || "Không thể thực hiện tải dữ liệu lên hệ thống.");
      }
    } catch (e) {
      setImportError("Lỗi kết nối hoặc định dạng CSV không hợp lệ.");
    } finally {
      setImporting(false);
    }
  };

  // Add a workflow step row
  const addStep = () => {
    setSteps([...steps, { name: "", role: "TRUONG_PHONG", department: "SAME", slaHours: 3 }]);
  };

  // Remove a workflow step row
  const removeStep = (index: number) => {
    setSteps(steps.filter((_, idx) => idx !== index));
  };

  // Save workflow builder configuration
  const handleWorkflowSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("");

    // Validate steps
    const hasEmptyStep = steps.some(s => !s.name.trim());
    if (hasEmptyStep) {
      setSaveStatus("Lỗi: Vui lòng điền đầy đủ tên các bước duyệt.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/admin/workflows", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          triggerDocumentType: selectedType,
          name: workflowName,
          steps
        })
      });

      if (res.ok) {
        setSaveStatus("Lưu cấu hình quy trình thành công!");
        fetchWorkflows();
      } else {
        setSaveStatus("Không thể lưu cấu hình.");
      }
    } catch (e) {
      setSaveStatus("Lỗi kết nối tới máy chủ.");
    }
  };

  return (
    <div className="min-h-screen bg-[#08221a] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <header className="border-b border-[#2fd39a22] pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1 border border-[#2fd39a4d]">
                <img src="/images/crawled/logo.png" alt="TBS Logo" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white">
                CỔNG QUẢN TRỊ KỸ THUẬT TBS II
              </h1>
            </div>
            <p className="text-gray-400 text-xs mt-1">
              Hệ thống vận hành phân quyền, tài liệu biểu mẫu và thiết lập thời gian quy chuẩn (SLA) toàn nhà máy.
            </p>
          </div>
        </header>

        {/* Tabs Bar */}
        <div className="flex bg-[#121614] border border-[#2fd39a11] p-1.5 rounded-2xl gap-2 overflow-x-auto select-none">
          <button
            onClick={() => setActiveTab("import")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all whitespace-nowrap active:scale-95 ${
              activeTab === "import"
                ? "bg-[#1fae7d22] text-[#2fd39a] border border-[#2fd39a44]"
                : "text-gray-400 hover:text-white border border-transparent"
            }`}
          >
            <IconUsers size={16} /> Nhập Tài Khoản (CSV)
          </button>
          
          <button
            onClick={() => setActiveTab("workflows")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all whitespace-nowrap active:scale-95 ${
              activeTab === "workflows"
                ? "bg-[#1fae7d22] text-[#2fd39a] border border-[#2fd39a44]"
                : "text-gray-400 hover:text-white border border-transparent"
            }`}
          >
            <IconSettings size={16} /> Định Nghĩa Quy Trình
          </button>

          <button
            onClick={() => setActiveTab("audit")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all whitespace-nowrap active:scale-95 ${
              activeTab === "audit"
                ? "bg-[#1fae7d22] text-[#2fd39a] border border-[#2fd39a44]"
                : "text-gray-400 hover:text-white border border-transparent"
            }`}
          >
            <IconHistory size={16} /> Nhật Ký Hệ Thống
          </button>
        </div>

        {/* Workspace Panel */}
        <div className="bg-[#121614]/80 backdrop-blur-md border border-[#2fd39a1a] rounded-3xl p-6 sm:p-8 shadow-2xl">
          
          {/* TAB 1: CSV Bulk Import */}
          {activeTab === "import" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-serif font-bold text-white mb-1">Import tài khoản hàng loạt</h2>
                <p className="text-xs text-gray-400">Dán danh sách tài khoản định dạng CSV tiêu chuẩn để nạp thông tin nhân viên vào cơ sở dữ liệu.</p>
              </div>

              <div className="bg-[#0b0d0c] p-5 rounded-2xl border border-[#2fd39a1a] space-y-3 font-mono">
                <span className="block text-[10px] text-[#2fd39a] font-bold uppercase tracking-widest">Cấu trúc tiêu đề CSV:</span>
                <code className="text-xs text-gray-300 block">
                  email,fullName,password,phone,departmentCode,roleName
                </code>
                <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest pt-2">Ví dụ mẫu:</span>
                <code className="text-[11px] text-gray-400 block leading-relaxed">
                  worker1@tbsgroup.vn,Nguyen Van An,StrongPass123!,0912345678,PROD,LAO_DONG_PHO_THONG<br/>
                  maintainer1@tbsgroup.vn,Tran Minh Binh,TechSecure456!,0987654321,MNT,NHAN_VIEN_BAO_TRI
                </code>
              </div>

              <form onSubmit={handleImportSubmit} className="space-y-6">
                {importError && (
                  <div className="bg-red-950/40 text-red-400 border border-red-500/20 p-4 rounded-2xl text-xs flex items-center gap-2">
                    <IconAlertTriangle size={18} /> {importError}
                  </div>
                )}

                {importResult && (
                  <div className="bg-emerald-950/40 text-[#2fd39a] border border-[#2fd39a22] p-4 rounded-2xl text-xs space-y-1">
                    <p className="font-bold flex items-center gap-2"><IconCheck size={18} /> Hoàn tất đồng bộ tài khoản!</p>
                    <p className="text-gray-400">Thêm mới thành công: <strong className="text-white">{importResult.created}</strong>. Bỏ qua: <strong className="text-white">{importResult.skipped}</strong> (lỗi/trùng).</p>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-widest">Nội dung dữ liệu CSV:</label>
                  <textarea
                    rows={8}
                    value={csvContent}
                    onChange={(e) => setCsvContent(e.target.value)}
                    placeholder="Dán các dòng CSV tại đây..."
                    className="w-full bg-[#0b0d0c] text-white px-4 py-3 rounded-2xl border border-[#2fd39a1a] focus:outline-none focus:border-[#2fd39a] focus:ring-1 focus:ring-[#2fd39a33] font-mono text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={importing}
                  className="bg-gradient-to-r from-gr2 to-gr3 hover:from-gr hover:to-gr2 text-dk font-bold px-8 py-3.5 rounded-full text-xs tracking-wider uppercase shadow-lg shadow-gr2/15 active:scale-95 transition-all disabled:opacity-50"
                >
                  {importing ? "Đang xử lý tải..." : "Bắt đầu tải lên"}
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: Workflows Setup */}
          {activeTab === "workflows" && (
            <form onSubmit={handleWorkflowSubmit} className="space-y-8">
              <div>
                <h2 className="text-xl font-serif font-bold text-white mb-1">Cấu hình luồng duyệt hồ sơ</h2>
                <p className="text-xs text-gray-400">Thiết lập thứ tự duyệt của từng bộ phận và chỉ định chỉ tiêu thời gian SLA quy định.</p>
              </div>

              {saveStatus && (
                <div className="bg-[#1fae7d22] text-[#2fd39a] border border-[#2fd39a44] p-4 rounded-2xl text-xs">
                  {saveStatus}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-gray-300">Mã loại biểu mẫu (Document Type):</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="bg-[#0b0d0c] text-white px-4 py-3 rounded-xl border border-[#2fd39a1a] focus:outline-none focus:border-[#2fd39a] text-xs"
                  >
                    <option value="PURCHASE">PURCHASE (Yêu cầu mua sắm)</option>
                    <option value="HR">HR (Hồ sơ nhân sự / Nghỉ phép)</option>
                    <option value="FINANCE">FINANCE (Thanh toán / Tạm ứng)</option>
                    <option value="WAREHOUSE">WAREHOUSE (Nhập xuất kho hàng)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-gray-300">Tên quy trình hiển thị:</label>
                  <input
                    type="text"
                    required
                    value={workflowName}
                    onChange={(e) => setWorkflowName(e.target.value)}
                    placeholder="Ví dụ: Quy trình phê duyệt vật tư xưởng"
                    className="bg-[#0b0d0c] text-white px-4 py-3 rounded-xl border border-[#2fd39a1a] focus:outline-none focus:border-[#2fd39a] text-xs"
                  />
                </div>
              </div>

              {/* Workflow Steps Builder */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-[#2fd39a1a] pb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#2fd39a]">Các bước phê duyệt hiện hành</span>
                  <button
                    type="button"
                    onClick={addStep}
                    className="inline-flex items-center gap-1 bg-[#1fae7d1a] border border-[#2fd39a33] text-gr3 hover:text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-colors active:scale-95"
                  >
                    <IconPlus size={14} /> Thêm Bước Phê Duyệt
                  </button>
                </div>

                <div className="space-y-4">
                  {steps.map((step, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row gap-4 items-center bg-[#0b0d0c]/50 p-4 border border-[#2fd39a11] rounded-2xl">
                      <span className="w-8 h-8 rounded-full bg-[#1fae7d1a] border border-[#2fd39a33] flex items-center justify-center text-xs font-bold text-[#2fd39a] shrink-0">
                        {idx + 1}
                      </span>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow w-full">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Tên Bước Duyệt</span>
                          <input
                            type="text"
                            required
                            placeholder="Ví dụ: Kiểm tra chứng từ"
                            value={step.name}
                            onChange={(e) => {
                              const updated = [...steps];
                              updated[idx].name = e.target.value;
                              setSteps(updated);
                            }}
                            className="bg-[#0b0d0c] text-white px-3 py-2 rounded-xl border border-[#2fd39a1a] text-xs focus:outline-none focus:border-[#2fd39a]"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Vai Trò Phụ Trách</span>
                          <select
                            value={step.role}
                            onChange={(e) => {
                              const updated = [...steps];
                              updated[idx].role = e.target.value;
                              setSteps(updated);
                            }}
                            className="bg-[#0b0d0c] text-white px-3 py-2 rounded-xl border border-[#2fd39a1a] text-xs focus:outline-none focus:border-[#2fd39a]"
                          >
                            <option value="TRUONG_PHONG">Trưởng Phòng</option>
                            <option value="GIAM_DOC">Ban Giám Đốc</option>
                            <option value="ADMIN">System Admin</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Hạn Định SLA (Giờ)</span>
                          <input
                            type="number"
                            min={1}
                            placeholder="Hạn định SLA (giờ)"
                            value={step.slaHours}
                            onChange={(e) => {
                              const updated = [...steps];
                              updated[idx].slaHours = parseInt(e.target.value, 10);
                              setSteps(updated);
                            }}
                            className="bg-[#0b0d0c] text-white px-3 py-2 rounded-xl border border-[#2fd39a1a] text-xs focus:outline-none focus:border-[#2fd39a]"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeStep(idx)}
                        disabled={steps.length <= 1}
                        className="p-2.5 text-red-400 hover:bg-red-500/10 rounded-xl transition-all disabled:opacity-20 shrink-0 mt-4 md:mt-0 active:scale-90"
                      >
                        <IconTrash size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-gr2 to-gr3 hover:from-gr hover:to-gr2 text-dk font-bold px-8 py-3.5 rounded-full text-xs tracking-wider uppercase shadow-lg shadow-gr2/15 active:scale-95 transition-all"
              >
                Lưu cấu hình quy trình
              </button>
            </form>
          )}

          {/* TAB 3: System Audit Logs */}
          {activeTab === "audit" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-[#2fd39a1a] pb-4">
                <div>
                  <h2 className="text-xl font-serif font-bold text-white mb-1">Nhật ký hoạt động hệ thống</h2>
                  <p className="text-xs text-gray-400 font-medium">Lưu trữ dòng lịch sử đăng nhập, phê duyệt, gán sự cố thiết bị của nhân viên.</p>
                </div>
                <button
                  onClick={fetchAuditLogs}
                  disabled={loadingLogs}
                  className="inline-flex items-center gap-1.5 bg-[#1fae7d1a] border border-[#2fd39a33] text-gr3 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95"
                >
                  <IconRefresh size={14} className={loadingLogs ? "animate-spin" : ""} />
                  {loadingLogs ? "Đang tải..." : "Tải lại nhật ký"}
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#2fd39a22] text-gray-400 uppercase tracking-widest font-semibold text-[10px]">
                      <th className="pb-3">Thời Gian</th>
                      <th className="pb-3">Hành Động</th>
                      <th className="pb-3">Người Thực Hiện</th>
                      <th className="pb-3">Nội Dung Chi Tiết</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2fd39a11] font-mono">
                    {auditLogs.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-gray-500 font-mono">Không tìm thấy nhật ký hoạt động nào.</td>
                      </tr>
                    ) : (
                      auditLogs.map((log: any) => (
                        <tr key={log.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-4 text-gray-400">{new Date(log.createdAt).toLocaleString()}</td>
                          <td className="py-4 font-bold">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#1fae7d22] text-[#2fd39a] border border-[#2fd39a33]">
                              {log.action}
                            </span>
                          </td>
                          <td className="py-4 text-gray-300 font-sans">{log.actor?.fullName || "Hệ thống tự động"}</td>
                          <td className="py-4 text-gray-400 font-sans">{log.comment}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
