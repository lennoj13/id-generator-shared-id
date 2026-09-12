import React from 'react';

/**
 * Universal Student ID Card Template
 * Renders a professional student ID card styled per the university config colors.
 */
export default function IdCardTemplate({ config, studentData }) {
  if (!config || !studentData) return null;

  const { colors } = config;

  return (
    <div
      style={{
        fontFamily: "'Inter', Arial, sans-serif",
        width: '400px',
        background: '#ffffff',
        border: `3px solid ${colors.primary}`,
        borderTop: `9px solid ${colors.accent === '#1E1E1E' ? colors.primary : colors.accent}`,
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {/* Card Header */}
      <div
        style={{
          background: colors.primary,
          color: '#ffffff',
          padding: '10px 16px',
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          textAlign: 'center',
        }}
      >
        {config.name}
      </div>

      {/* Card Body */}
      <div
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px',
        }}
      >
        {/* Photo */}
        <div
          style={{
            width: '120px',
            height: '150px',
            border: `2px solid ${colors.accent === '#1E1E1E' ? colors.primary : colors.accent}`,
            borderRadius: '6px',
            overflow: 'hidden',
            background: '#f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {studentData.photoUrl ? (
            <img
              src={studentData.photoUrl}
              alt="Student"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M20 21c0-4.418-3.582-7-8-7s-8 2.582-8 7" />
            </svg>
          )}
        </div>

        {/* Name */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '16px',
              fontWeight: 800,
              color: '#0f172a',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
            }}
          >
            {studentData.firstName} {studentData.lastName}
          </div>
          <div
            style={{
              fontSize: '10px',
              fontWeight: 700,
              color: colors.primary,
              textTransform: 'uppercase',
              marginTop: '4px',
              letterSpacing: '0.08em',
            }}
          >
            Student Identification Card
          </div>
        </div>

        {/* Details */}
        <div
          style={{
            width: '100%',
            fontSize: '10px',
            color: '#334155',
            lineHeight: 1.8,
            textAlign: 'center',
          }}
        >
          <div>
            Student Email: <strong>{studentData.email}</strong>
          </div>
          <div>
            {config.idLabel}: <strong style={{ color: colors.primary }}>{studentData.studentId}</strong>
          </div>
          <div>
            {config.secondaryIdLabel}: <strong>{studentData.techId}</strong>
          </div>
          <div>
            Program: <strong>{studentData.majorName}</strong>
          </div>
          <div>
            Term: <strong>{studentData.term}</strong>
          </div>
        </div>

        {/* QR Code */}
        {studentData.qrDataUrl ? (
          <div
            style={{
              width: '90px',
              height: '90px',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#ffffff',
              marginTop: '4px',
              padding: '2px',
            }}
          >
            <img src={studentData.qrDataUrl} alt="QR Code" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        ) : (
          <div
            style={{
              width: '80px',
              height: '80px',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f8fafc',
              marginTop: '4px',
            }}
          >
            <svg width="50" height="50" viewBox="0 0 50 50">
              <rect x="0" y="0" width="20" height="20" fill={colors.primary} rx="2" />
              <rect x="30" y="0" width="20" height="20" fill={colors.primary} rx="2" />
              <rect x="0" y="30" width="20" height="20" fill={colors.primary} rx="2" />
              <rect x="5" y="5" width="10" height="10" fill="#fff" rx="1" />
              <rect x="35" y="5" width="10" height="10" fill="#fff" rx="1" />
              <rect x="5" y="35" width="10" height="10" fill="#fff" rx="1" />
              <rect x="7" y="7" width="6" height="6" fill={colors.primary} rx="0.5" />
              <rect x="37" y="7" width="6" height="6" fill={colors.primary} rx="0.5" />
              <rect x="7" y="37" width="6" height="6" fill={colors.primary} rx="0.5" />
              <rect x="24" y="24" width="6" height="6" fill={colors.primary} rx="1" />
              <rect x="32" y="32" width="6" height="6" fill={colors.primary} rx="1" />
              <rect x="40" y="32" width="6" height="6" fill={colors.primary} rx="1" />
              <rect x="32" y="40" width="6" height="6" fill={colors.primary} rx="1" />
              <rect x="40" y="40" width="6" height="6" fill={colors.primary} rx="1" />
              <rect x="24" y="32" width="6" height="6" fill={colors.primary} rx="1" />
              <rect x="24" y="40" width="6" height="6" fill={colors.primary} rx="1" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
