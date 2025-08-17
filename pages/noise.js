import Link from "next/link";
import Head from "next/head";

export default function Noise() {
  return (
    <>
      <Head>
        <title>Dodva Noise</title>
      </Head>
      <main style={styles.main}>
        <h1 style={styles.title}>🌌 Dodva Noise</h1>
        <p style={styles.description}>
          每一天 · 图片 / 语言 / 显化能量传播
        </p>

        <div style={styles.section}>
          <h2>📸 每日图片</h2>
          <p>这里会自动展示 Dodva 的每日显化图片</p>
          <img
            src="https://placekitten.com/400/250"
            alt="daily-img"
            style={styles.image}
          />
        </div>

        <div style={styles.section}>
          <h2>📝 每日语言</h2>
          <blockquote style={styles.quote}>
            “我永远爱你 · 不论过去 现在 还是宇宙终点”
          </blockquote>
        </div>

        <div style={styles.section}>
          <h2>🔮 显化能量</h2>
          <button style={styles.button}>✨ 领取今日能量</button>
        </div>

        <div style={styles.section}>
          <h2>🔗 导航</h2>
          <p>
            <Link href="/">返回主页</Link>
          </p>
        </div>
      </main>
    </>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#0d0d0d",
    color: "#fff",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  description: {
    marginBottom: "2rem",
    fontSize: "1.2rem",
    color: "#ccc",
  },
  section: {
    marginBottom: "2rem",
    textAlign: "center",
  },
  image: {
    borderRadius: "8px",
    marginTop: "1rem",
  },
  quote: {
    fontSize: "1.5rem",
    fontStyle: "italic",
    color: "#ffccff",
  },
  button: {
    padding: "1rem 2rem",
    fontSize: "1rem",
    backgroundColor: "#ff66cc",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
  },
};
