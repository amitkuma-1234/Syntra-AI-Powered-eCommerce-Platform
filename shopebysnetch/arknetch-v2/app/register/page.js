'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';

export default function RegisterPage() {
  const { dispatch } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const register = () => {
    if (!name || !email || !pw) { setError('Please fill all fields'); return; }
    if (pw !== confirm) { setError('Passwords do not match'); return; }
    if (pw.length < 6) { setError('Password must be at least 6 characters'); return; }
    const users = JSON.parse(localStorage.getItem('ark_users') || '[]');
    if (users.find(u => u.email === email)) { setError('Email already registered'); return; }
    const user = { id: Date.now(), name, email, password: pw, phone: '', avatar: name.charAt(0).toUpperCase(), joinedAt: Date.now() };
    users.push(user);
    localStorage.setItem('ark_users', JSON.stringify(users));
    dispatch({ type: 'SET_USER', payload: user });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { title: 'Welcome!', message: `Account created. Welcome ${name}!`, type: 'success' } });
    window.location.href = '/account';
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="subtitle">Join Arknetch for the best shopping experience</p>
        <div className="form-group"><label>Full Name</label><input value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" /></div>
        <div className="form-group"><label>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" /></div>
        <div className="form-group"><label>Password</label><input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Min 6 characters" /></div>
        <div className="form-group"><label>Confirm Password</label><input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat password" onKeyDown={e => e.key === 'Enter' && register()} /></div>
        {error && <div style={{ color: 'var(--error)', fontSize: '.85rem', marginBottom: 12 }}>{error}</div>}
        <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={register}>Create Account</button>
        <p style={{ textAlign: 'center', marginTop: 16, color: 'var(--text-muted)' }}>Already have an account? <Link href="/login">Sign In</Link></p>
      </div>
    </div>
  );
}
