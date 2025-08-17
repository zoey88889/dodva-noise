// pages/noise.js
import { useEffect, useState } from "react";

export default function Noise() {
  const [status, setStatus] = useState("checking"); // checking | free | pro
  const [err, setErr] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        const sid =
          typeof window !== "undefined"
            ? new URL(window.location.href).searchParams.get("session_id")
            : null;

        if (!sid) {
          setStatus("free"); // 没有 session_id，当作未订阅
          return;
        }

        const res = await fetch(`/api/verify?session_id=${encodeURIComponent(sid)}`);
        const data = await res.json();
        const isPro =
          typeof data.active === "boolean"
            ? data.active
            : data.status === "pro";

        setStatus(isPro ? "pro" : "free");
      } catch (e) {
        console.error(e);
        setErr(e?.message || "Unknown error");
        setStatus("free");
      }
    };
    run();
  }, []);

  if (status === "checking") {
    return (
      <main style={wrap}>
        <h1>验证中…</h1>
        <p>正在确认你的订阅状态。</p>
      </main>
    );
  }

  if (status === "free") {
    return (
      <main style={wrap}>
        <h1>Dodva Noise</h1>
        <p>🚀 请订阅以解锁 Pro 功能。</p>
        {err && <p style={{ color: "#e11d48" }}>Error: {err}</p>}
        <p>
          <a href="/" style={btn}>返回订阅页</a>
        </p>
      </main>
    );
  }

  // ✅ Pro 页面（这里放你的白噪音 MVP / 控件）
  return (
    <main style={wrap}>
      <h1>Dodva Noise · Pro</h1>
      <p>🎉 已解锁！祝你今晚安眠～</p>

      {/* 示例：一个简单的播放器占位（你可替换成现有白噪音组件） */}
      <section style={card}>
        <p><strong>白噪音示例：</strong></p>
        <audio controls loop preload="none" style={{ width: "100%" }}>
          <source src="/audio/rain-1.mp3" type="audio/mpeg" />
        </audio>
        <p style={{ fontSize: 12, opacity: 0.7 }}>你可以把此处替换为你已有的火苗/海浪/雨声混合控件。</p>
      </section>

      <p>
        <a href="/" style={ghostBtn}>回到主页</a>
      </p>
    </main>
  );
}

// —— 简单内联样式（避免引入额外 CSS 出错）——
const wrap = {
  maxWidth: 720,
  margin: "40px auto",
  padding: "0 16px",
  fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif"
};
const btn = {
  display: "inline-block",
  padding: "10px 16px",
  background: "linear-gradient(135deg,#22d3ee,#0ea5e9,#6366f1)",
  color: "#00131f",
  fontWeight: 800,
  borderRadius: 10,
  textDecoration: "none",
  boxShadow: "0 8px 24px rgba(14,165,233,.35)"
};
const ghostBtn = {
  display: "inline-block",
  padding: "10px 16px",
  border: "1px solid #94a3b8",
  color: "#0f172a",
  borderRadius: 10,
  textDecoration: "none"
};
const card = {
  border: "1px solid #e2e8f0",
  borderRadius: 12,
  padding: 16,
  marginTop: 12,
};
