import { useEffect, useState } from 'react';

export default function Noise() {
  const [status, setStatus] = useState('checking'); // 'checking' | 'pro' | 'free'
  const [msg, setMsg] = useState('验证中…');

  useEffect(() => {
    (async ()=>{
      try{
        const url = new URL(location.href);
        const sid = url.searchParams.get('session_id');
        if (!sid) { setStatus('free'); setMsg(''); return; }

        const r
