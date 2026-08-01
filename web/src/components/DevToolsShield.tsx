"use client";

import { useEffect } from "react";

export default function DevToolsShield() {
  useEffect(() => {
    // Trigger security lock
    const triggerLock = () => {
      if (typeof window === "undefined") return;
      
      console.warn("Bảo mật TBS II: Đã phát hiện bảng điều khiển gỡ lỗi.");
      
      // Inject freeze overlay and blur content
      document.body.style.filter = "blur(12px)";
      document.body.style.pointerEvents = "none";
      
      // Check if alert container already exists
      if (document.getElementById("tbs-security-blocker")) return;

      const overlay = document.createElement("div");
      overlay.id = "tbs-security-blocker";
      overlay.style.position = "fixed";
      overlay.style.inset = "0";
      overlay.style.zIndex = "999999";
      overlay.style.background = "rgba(8, 34, 26, 0.96)";
      overlay.style.display = "flex";
      overlay.style.flexDirection = "column";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      overlay.style.color = "#f2dc9a";
      overlay.style.fontFamily = "sans-serif";
      overlay.style.padding = "20px";
      overlay.style.textAlign = "center";
      overlay.style.pointerEvents = "auto"; // Allow clicks inside blocker

      overlay.innerHTML = `
        <div style="border: 2px solid #2fd39a; border-radius: 20px; padding: 40px; background: #08221a; max-width: 450px; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
          <div style="font-size: 40px; margin-bottom: 20px;">🛡️</div>
          <h2 style="font-family: serif; font-size: 24px; margin-bottom: 12px; font-weight: bold; color: #fff;">BẢO MẬT HỆ THỐNG TBS II</h2>
          <p style="font-size: 14px; color: #b3bcb2; line-height: 1.6;">Để bảo mật thông tin nội bộ của nhà máy TBS Group, tính năng F12, sao chép dữ liệu và chụp chiếu màn hình đã bị hạn chế.</p>
          <p style="font-size: 12px; color: #7d8a83; margin-top: 15px;">Vui lòng tắt các công cụ Developer Tools và tải lại trang.</p>
        </div>
      `;

      document.body.appendChild(overlay);
    };

    // 1. Disable Right-Click Context Menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);

    // 2. Disable Copy, Cut & Selection events
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
    };
    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault();
    };
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
    };
    document.addEventListener("copy", handleCopy);
    document.addEventListener("cut", handleCut);
    document.addEventListener("selectstart", handleSelectStart);

    // 3. Disable keyboard inspector triggers
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
        triggerLock();
        return false;
      }
      // Ctrl+Shift+I / Cmd+Opt+I
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "I" || e.keyCode === 73)) {
        e.preventDefault();
        triggerLock();
        return false;
      }
      // Ctrl+Shift+C / Cmd+Opt+C
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "C" || e.keyCode === 67)) {
        e.preventDefault();
        triggerLock();
        return false;
      }
      // Ctrl+Shift+J / Cmd+Opt+J
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "J" || e.keyCode === 74)) {
        e.preventDefault();
        triggerLock();
        return false;
      }
      // Ctrl+U (View Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === "u" || e.key === "U" || e.keyCode === 85)) {
        e.preventDefault();
        triggerLock();
        return false;
      }
      // Ctrl+S (Save)
      if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "S" || e.keyCode === 83)) {
        e.preventDefault();
        triggerLock();
        return false;
      }
      // Copy & Select All
      if ((e.ctrlKey || e.metaKey) && (e.key === "c" || e.key === "C" || e.keyCode === 67)) {
        e.preventDefault();
        return false;
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "a" || e.key === "A" || e.keyCode === 65)) {
        e.preventDefault();
        return false;
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    // 4. Console log evaluation trap (traps DevTools opening)
    const element = new Image();
    Object.defineProperty(element, "id", {
      get: () => {
        triggerLock();
        throw new Error("DevTools security active.");
      }
    });

    const consoleTrap = setInterval(() => {
      // Evaluate element which runs getter when developer tools evaluates console
      console.log(element);
      console.clear();
    }, 1000);

    // 5. Size check detection (detect side-docked console)
    const checkSize = () => {
      const threshold = 160;
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;
      
      // If DevTools is open and docked to side or bottom
      if (widthDiff > threshold || heightDiff > threshold) {
        triggerLock();
      }
    };
    window.addEventListener("resize", checkSize);
    // Run initial check
    checkSize();

    // 6. Active background debugger trap
    const debuggerInterval = setInterval(() => {
      const startTime = performance.now();
      // eslint-disable-next-line no-debugger
      debugger;
      const endTime = performance.now();
      if (endTime - startTime > 100) {
        triggerLock();
      }
    }, 1000);

    // Cleanups
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", checkSize);
      clearInterval(consoleTrap);
      clearInterval(debuggerInterval);
    };
  }, []);

  return null;
}
