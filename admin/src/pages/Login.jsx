import React, { useState } from 'react';
import { Lock, User, ShieldCheck, ArrowRight } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      onLogin();
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        width: '100%',
        maxWidth: '450px',
        padding: '40px',
        background: 'rgba(30, 41, 59, 0.7)',
        backdropFilter: 'blur(20px)',
        borderRadius: '32px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }} className="fade-in">

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.5)'
          }}>
            <ShieldCheck size={40} color="white" />
          </div>
          <h1 style={{ color: 'white', fontSize: '2.2rem', fontWeight: 900, marginBottom: '10px', letterSpacing: '-1px' }}>VITRADE ADMIN</h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', fontWeight: 500 }}>Secure Management Portal</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <User style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} size={20} />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                height: '60px',
                padding: '0 20px 0 52px',
                background: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 600,
                outline: 'none',
                transition: 'all 0.3s'
              }}
              className="login-input"
              required
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} size={20} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                height: '60px',
                padding: '0 20px 0 52px',
                background: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 600,
                outline: 'none',
                transition: 'all 0.3s'
              }}
              className="login-input"
              required
            />
          </div>

          {error && (
            <div style={{ color: '#ef4444', fontSize: '0.9rem', fontWeight: 600, textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              height: '60px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              fontSize: '1.1rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '10px',
              transition: 'all 0.3s',
              boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)'
            }}
            className="login-button"
          >
            Authenticate <ArrowRight size={20} />
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '30px', color: '#475569', fontSize: '0.85rem', fontWeight: 600 }}>
          Authorized Personnel Only • © 2026 Vitrade
        </p>
      </div>

      <style>{`
        .login-input:focus {
          border-color: #3b82f6 !important;
          background: rgba(15, 23, 42, 0.8) !important;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }
        .login-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 20px -5px rgba(59, 130, 246, 0.4);
        }
        .login-button:active {
          transform: translateY(0);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Login;
