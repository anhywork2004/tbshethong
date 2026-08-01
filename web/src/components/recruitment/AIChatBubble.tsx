"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { IconRobot, IconX, IconSend, IconRefresh, IconLoader2 } from "@tabler/icons-react";
import { sendChatMessage, type ChatMessage } from "@/lib/api";

const STORAGE_KEY = "tbs_recruitment_chat_history";
const MAX_HISTORY = 50; // Keep last 50 messages in localStorage

function loadMessages(): ChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function saveMessages(msgs: ChatMessage[]) {
  try {
    const toSave = msgs.slice(-MAX_HISTORY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch {}
}

const SUGGESTED_QUESTIONS = [
  "Các vị trí đang tuyển dụng?",
  "Quy trình ứng tuyển thế nào?",
  "Thông tin về TBS Group?",
  "Chế độ đãi ngộ ra sao?",
];

const INITIAL_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Chào bạn! 👋 Tôi là trợ lý tuyển dụng AI của **TBS Group**. Tôi có thể giúp bạn:\n\n✅ Tìm hiểu về các vị trí đang tuyển\n✅ Giải đáp về quy trình ứng tuyển\n✅ Thông tin về TBS Group và môi trường làm việc\n\nHãy đặt câu hỏi hoặc chọn một gợi ý bên dưới nhé!",
};

export default function AIChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = loadMessages();
    return saved.length > 0 ? saved : [INITIAL_MESSAGE];
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Save to localStorage
  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  const send = useCallback(
    async (text: string) => {
      if (!text.trim() || isTyping) return;

      const userMsg: ChatMessage = { role: "user", content: text };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setInput("");
      setIsTyping(true);

      try {
        // Only send last 20 messages for context
        const context = newMessages.slice(-20);
        const result = await sendChatMessage(context);
        setMessages([...newMessages, { role: "assistant", content: result.reply }]);
      } catch {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content:
              "Xin lỗi, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau hoặc liên hệ Phòng Nhân sự qua email **tuyendungdaotaovp2@tbsgroup.vn** để được hỗ trợ.",
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [messages, isTyping]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const resetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full bg-gradient-to-br from-[#158a63] to-[#2fd39a] text-white shadow-2xl shadow-emerald-500/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 animate-pulse-subtle"
          aria-label="Mở trợ lý AI tuyển dụng"
        >
          <IconRobot size={28} />
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-[90] w-[380px] h-[540px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#08221a] to-[#0f4133] text-white shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <IconRobot size={20} className="text-[#2fd39a]" />
              </div>
              <div>
                <h3 className="text-sm font-bold">TBS Tuyển Dụng AI</h3>
                <p className="text-[10px] text-emerald-300">Trợ lý ảo • Luôn sẵn sàng</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                title="Xóa lịch sử chat"
              >
                <IconRefresh size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Đóng"
              >
                <IconX size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-[#f9fdfb]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-[#158a63] text-white rounded-br-md"
                      : "bg-white text-gray-700 rounded-bl-md border border-gray-100 shadow-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            {/* Suggested questions — only show when empty */}
            {messages.length <= 1 && (
              <div className="space-y-2 pt-2">
                <p className="text-[10px] text-gray-400 text-center mb-2">💡 Gợi ý câu hỏi</p>
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => send(q)}
                    className="w-full text-left px-3 py-2 rounded-xl border border-emerald-100 bg-white hover:bg-emerald-50 text-xs text-[#158a63] transition-colors hover:border-[#158a63]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-gray-100 bg-white shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
                placeholder="Nhập câu hỏi của bạn..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#158a63] disabled:bg-gray-50 transition-all"
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || isTyping}
                className="p-2.5 rounded-xl bg-[#158a63] text-white hover:bg-[#1fae7d] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                aria-label="Gửi"
              >
                {isTyping ? <IconLoader2 size={18} className="animate-spin" /> : <IconSend size={18} />}
              </button>
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-1.5">
              Trợ lý AI • Có thể có sai sót •{" "}
              <a href="mailto:tuyendungdaotaovp2@tbsgroup.vn" className="text-[#158a63] hover:underline">
                Liên hệ HR
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
