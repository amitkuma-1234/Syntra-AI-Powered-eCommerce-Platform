'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';

export default function LoginPage() {
  const { dispatch } = useStore();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');

  const login = () => {
    if (!email || !pw) { setError('Please fill all fields'); return; }
    const users = JSON.parse(localStorage.getItem('ark_users') || '[]');
    const user = users.find(u => u.email === email && u.password === pw);
    if (!user) { setError('Invalid email or password'); return; }
    dispatch({ type: 'SET_USER', payload: user });
    window.location.href = '/account';
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to your Arknetch account</p>
        <div className="form-group"><label>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" /></div>
        <div className="form-group"><label>Password</label><input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === 'Enter' && login()} /></div>
        {error && <div style={{ color: 'var(--error)', fontSize: '.85rem', marginBottom: 12 }}>{error}</div>}
        <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={login}>Sign In</button>
        <p style={{ textAlign: 'center', marginTop: 16, color: 'var(--text-muted)' }}>Don&apos;t have an account? <Link href="/register">Sign Up</Link></p>
      </div>
    </div>
  );
}
