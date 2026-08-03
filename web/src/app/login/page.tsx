"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function getBaseUrl(): string {
  if (typeof window === "undefined") return "";
  const host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1") {
    return "http://localhost:8000";
  }
  return `https://${host}`;
}

export default function LoginPage() {
  const router = useRouter();
  const [empCode, setEmpCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const baseUrl = getBaseUrl();
      const isLocalDev =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

      let res: Response;

      if (isLocalDev) {
        res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ empCode, password }),
        });

        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          res = await fetch(`${baseUrl}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: empCode, password }),
          });
        }
      } else {
        res = await fetch(`${baseUrl}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: empCode, password }),
        });
      }

      const text = await res.text();
      let data: Record<string, unknown> = {};
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          text
            ? `Phản hồi không hợp lệ từ máy chủ: ${text.slice(0, 100)}`
            : "Máy chủ không phản hồi — kiểm tra backend đang chạy trên cổng 8000"
        );
      }

      if (!res.ok) {
        throw new Error(
          (data.message as string) ||
          (data.error as string) ||
          "Sai mã nhân viên hoặc mật khẩu"
        );
      }

      document.cookie = `tbs_token=${data.token}; path=/; max-age=86400`;

      const redirectUrl =
        (data.redirectUrl as string) ||
        ((data.user as Record<string, unknown>)?.role === "SUPER_ADMIN"
          ? "/admin/users"
          : "/dashboard");

      router.push(redirectUrl);
    } catch (err: unknown) {
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        setError("Không thể kết nối đến máy chủ.");
      } else {
        const message =
          err instanceof Error ? err.message : "Có lỗi xảy ra khi đăng nhập";
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

        .login-root {
          min-height: 100dvh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-family: 'Inter', system-ui, sans-serif;
          background: #0b1e16;
        }

        /* ── Left panel ── */
        .login-left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px 56px;
          border-right: 1px solid rgba(255,255,255,0.06);
          position: relative;
          overflow: hidden;
        }

        .login-left::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 30% 20%, rgba(47,211,154,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 80% 80%, rgba(47,211,154,0.04) 0%, transparent 70%);
          pointer-events: none;
        }

        .left-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .left-brand img {
          height: 32px;
          width: auto;
          filter: brightness(0) invert(1);
          opacity: 0.9;
        }

        .left-brand-divider {
          width: 1px;
          height: 18px;
          background: rgba(255,255,255,0.2);
        }

        .left-brand-label {
          font-size: 11px;
          font-weight: 600;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .left-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px 0;
        }

        .left-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 500;
          color: #2fd39a;
          letter-spacing: 0.04em;
          margin-bottom: 24px;
        }

        .left-tag-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #2fd39a;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }

        .left-heading {
          font-size: 38px;
          font-weight: 600;
          color: #fff;
          line-height: 1.15;
          letter-spacing: -0.025em;
          margin: 0 0 16px 0;
          text-wrap: balance;
        }

        .left-heading span {
          color: #2fd39a;
        }

        .left-desc {
          font-size: 14px;
          color: rgba(255,255,255,0.45);
          line-height: 1.65;
          max-width: 340px;
          margin: 0;
        }

        .left-stats {
          display: flex;
          gap: 32px;
          margin-top: 48px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-value {
          font-size: 22px;
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.02em;
        }

        .stat-label {
          font-size: 11px;
          color: rgba(255,255,255,0.35);
          font-weight: 500;
        }

        .left-footer {
          font-size: 12px;
          color: rgba(255,255,255,0.25);
        }

        /* ── Right panel ── */
        .login-right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 56px;
          background: #0d2419;
        }

        .login-form-wrap {
          width: 100%;
          max-width: 360px;
        }

        .form-header {
          margin-bottom: 36px;
        }

        .form-title {
          font-size: 20px;
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.015em;
          margin: 0 0 6px 0;
        }

        .form-subtitle {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          margin: 0;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-label {
          display: block;
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.55);
          margin-bottom: 7px;
          letter-spacing: 0.01em;
        }

        .form-input {
          width: 100%;
          padding: 10px 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          color: #fff;
          font-size: 14px;
          font-family: inherit;
          transition: border-color 0.15s, background 0.15s;
          box-sizing: border-box;
          outline: none;
        }

        .form-input::placeholder {
          color: rgba(255,255,255,0.2);
        }

        .form-input:focus {
          border-color: rgba(47,211,154,0.5);
          background: rgba(47,211,154,0.04);
        }

        .password-wrap {
          position: relative;
        }

        .password-wrap .form-input {
          padding-right: 42px;
        }

        .toggle-pw {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(255,255,255,0.3);
          padding: 0;
          display: flex;
          align-items: center;
          transition: color 0.15s;
        }

        .toggle-pw:hover {
          color: rgba(255,255,255,0.6);
        }

        .error-bar {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 10px 12px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 13px;
          color: #fca5a5;
          line-height: 1.5;
        }

        .error-bar svg {
          flex-shrink: 0;
          margin-top: 1px;
        }

        .submit-btn {
          width: 100%;
          padding: 11px 20px;
          background: #2fd39a;
          border: none;
          border-radius: 8px;
          color: #0b1e16;
          font-size: 14px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          margin-top: 8px;
          transition: background 0.15s, transform 0.1s, opacity 0.15s;
          letter-spacing: -0.01em;
        }

        .submit-btn:hover:not(:disabled) {
          background: #26bc88;
        }

        .submit-btn:active:not(:disabled) {
          transform: scale(0.99);
        }

        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .form-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .form-footer-note {
          font-size: 12px;
          color: rgba(255,255,255,0.25);
        }

        .form-footer-link {
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          transition: color 0.15s;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .form-footer-link:hover {
          color: rgba(255,255,255,0.7);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .login-root {
            grid-template-columns: 1fr;
          }
          .login-left {
            display: none;
          }
          .login-right {
            padding: 40px 24px;
          }
        }
      `}</style>

      <div className="login-root">
        {/* Left panel */}
        <aside className="login-left">
          <div className="left-brand">
            <img src="/images/tbs-logo.png" alt="TBS Group" />
            <div className="left-brand-divider" />
            <span className="left-brand-label">Hệ thống nội bộ</span>
          </div>

          <div className="left-content">
            <div className="left-tag">
              <span className="left-tag-dot" />
              Hệ thống đang hoạt động
            </div>

            <h1 className="left-heading">
              Vận hành nhà máy<br />
              <span>không giấy tờ</span>
            </h1>

            <p className="left-desc">
              Số hóa biểu mẫu, quản lý bảo trì máy móc và theo dõi vận hành sản xuất theo thời gian thực cho toàn bộ hệ thống nhà máy TBS Group.
            </p>

            <div className="left-stats">
              <div className="stat-item">
                <span className="stat-value">14+</span>
                <span className="stat-label">Nhà máy</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">24/7</span>
                <span className="stat-label">Giám sát</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">3</span>
                <span className="stat-label">Ngành trụ cột</span>
              </div>
            </div>
          </div>

          <div className="left-footer">
            © 2026 TBS Group. Dành riêng cho nội bộ.
          </div>
        </aside>

        {/* Right panel */}
        <main className="login-right">
          <div className="login-form-wrap">
            <div className="form-header">
              <h2 className="form-title">Đăng nhập</h2>
              <p className="form-subtitle">Nhập thông tin tài khoản được cấp bởi HR</p>
            </div>

            {error && (
              <div className="error-bar">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M7.5 1.5L13.5 13.5H1.5L7.5 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                  <path d="M7.5 6V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  <circle cx="7.5" cy="11" r="0.6" fill="currentColor"/>
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="empCode" className="form-label">
                  Mã nhân viên
                </label>
                <input
                  id="empCode"
                  type="text"
                  required
                  autoComplete="username"
                  value={empCode}
                  onChange={(e) => setEmpCode(e.target.value)}
                  placeholder="EMP-001"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Mật khẩu
                </label>
                <div className="password-wrap">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="form-input"
                  />
                  <button
                    type="button"
                    className="toggle-pw"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 2L14 14M6.5 6.56A2 2 0 0 0 9.44 9.5M8 3C4.5 3 1.5 6 1.5 8c.5 1 1.5 2.5 3 3.5M14.5 8C14 6.5 11.5 3 8 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3C4.5 3 1.5 6 1.5 8S4.5 13 8 13s6.5-3 6.5-5-3-5-6.5-5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="submit-btn"
              >
                {loading ? "Đang xác thực..." : "Đăng nhập"}
              </button>
            </form>

            <div className="form-footer">
              <span className="form-footer-note">CBCNV TBS Group</span>
              <Link href="/" className="form-footer-link">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M8 2L4 6.5L8 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Về trang chủ
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
