import { useEffect, useState } from 'react';

export default function Noise() {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    (async ()=>{
      const sid = new URL(location.href).searchParams.get('session_id');
      if (!sid) return setStatus('free');
      const r = await fetch('/api/verify?session_id='+sid);
      const data = await r.json();
      const isPro = typeof data.active === 'boolean' ? data.active : (data.status === 'pro');
      setStatus(isPro ? 'pro' : 'free');
    })();
  }, []);

  if (status === 'checking') return ui('验证中…');
  if (status === 'free')     return ui('🚀 请订阅才能解锁功能', <a className="btn" href="/">返回订阅</a>);

  // ✅ Pro 页面（可放
