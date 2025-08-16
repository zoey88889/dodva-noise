import { useState } from 'react';

export default function Home() {
  const [plan, setPlan] = useState('monthly');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  async function subscribe(){
    try{
      setLoading(true); setMsg('');
      const r = await fetch('/api/checkout', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ plan })
      });
      const { url, error } = await r.json();
      if (error || !url){ setMsg(error || 'Checkout error'); return; }
      location.href = url; // 跳到 Stripe Checkout
    }catch(e){
      setMsg(e.message || 'Network error');
    }finally{
      setLoading(false);
    }
  }

  return (
    <main>
      <div className="card">
        <h1>Dodva Noise <span style={{opacity:.6}}>PRO</span></h1>
        <p className="sub">专利级白噪音引擎 · 自动场景 · 语音控制</p>

        <div className="toggle">
          <button
            className={`tab ${plan==='monthly'?'active':''}`}
            onClick={()=>setPlan('monthly')}
            disabled={loading}
          >
            $9.9 / 月
          </button>
          <button
            className={`tab ${plan==='yearly'?'active':''}`}
            onClick={()=>setPlan('yearly')}
            disabled={loading}
          >
            $79 / 年
          </button>
        </div>

        <button className="btn" onClick={subscribe} disabled={loading}>
          {loading ? 'Redirecting…' : (plan==='monthly' ? 'Subscribe $9.9/mo' : 'Subscribe $79/yr')}
        </button>

        {msg && <p className="err">{msg}</p>}
        <p className="note">成功后将回到 <code>/noise</code> 自动解锁 Pro 功能。</p>
      </div>
    </main>
  );
}
