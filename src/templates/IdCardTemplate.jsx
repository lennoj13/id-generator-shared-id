import React from 'react';

/**
 * Universal Student ID Card Template
 * Renders a professional collegiate student ID card styled per university branding.
 */
export default function IdCardTemplate({ config, studentData }) {
  if (!config || !studentData) return null;

  const { colors } = config;
  const primaryColor = colors.primary || '#1e293b';
  const accentColor = colors.accent || '#3b82f6';

  return (
    <div
      style={{
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        width: '420px',
        display: 'flex',
        flexDirection: 'column',
        background: '#ffffff',
        border: `2px solid #cbd5e1`,
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
        boxSizing: 'border-box'
      }}
    >
      {/* Top University Brand Strip */}
      <div
        style={{
          background: primaryColor,
          color: '#ffffff',
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderBottom: `3px solid ${accentColor}`,
        }}
      >
        {config.logoUrl && (
          <div
            style={{
              background: '#ffffff',
              padding: '3px 6px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src={config.logoUrl}
              alt={config.shortName}
              style={{ height: '28px', maxWidth: '70px', objectFit: 'contain' }}
            />
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              lineHeight: 1.15,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {config.name}
          </div>
          <div
            style={{
              fontSize: '9px',
              color: accentColor,
              fontWeight: 700,
              letterSpacing: '0.08em',
              marginTop: '2px',
              textTransform: 'uppercase'
            }}
          >
            STUDENT IDENTIFICATION CARD
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        {/* Photo + Student Name */}
        <div
          style={{
            width: '180px',
            height: '220px',
            border: `2px solid ${accentColor}`,
            borderRadius: '8px',
            overflow: 'hidden',
            background: '#f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
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

        {/* Student Name */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '19px',
              fontWeight: 900,
              color: '#0f172a',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
            }}
          >
            {studentData.firstName} {studentData.lastName}
          </div>
          <div
            style={{
              fontSize: '10.5px',
              fontWeight: 800,
              color: primaryColor,
              textTransform: 'uppercase',
              marginTop: '4px',
              letterSpacing: '0.06em',
            }}
          >
            {studentData.status || 'Enrolled Student'}
          </div>
        </div>

        {/* Key Student Details */}
        <div
          style={{
            width: '100%',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            padding: '10px 14px',
            fontSize: '11px',
            color: '#334155',
            lineHeight: 1.6,
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b' }}>{config.idLabel}:</span>
            <strong style={{ color: primaryColor, fontFamily: 'monospace', fontWeight: 800 }}>
              {studentData.studentId}
            </strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b' }}>{config.secondaryIdLabel}:</span>
            <strong style={{ color: '#0f172a', fontFamily: 'monospace', fontWeight: 700 }}>
              {studentData.techId}
            </strong>
          </div>
          {studentData.dobShort && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Date of Birth:</span>
              <strong style={{ color: '#0f172a', fontFamily: 'monospace', fontWeight: 700 }}>
                {studentData.dobShort}
              </strong>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b' }}>Email:</span>
            <strong style={{ color: '#0f172a', fontWeight: 600 }}>{studentData.email}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b' }}>Program:</span>
            <strong style={{ color: '#0f172a', fontWeight: 700, textAlign: 'right', maxWidth: '65%' }}>
              {studentData.majorName}
            </strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b' }}>Term:</span>
            <strong style={{ color: primaryColor, fontWeight: 700 }}>{studentData.term}</strong>
          </div>
        </div>

        {/* Validity & Expiration Strip (Required for SheerID verification) */}
        <div
          style={{
            width: '100%',
            background: '#ffffff',
            border: `1px solid ${accentColor}`,
            borderRadius: '6px',
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '10px',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ color: '#475569' }}>
            ISSUED: <strong style={{ color: '#0f172a', fontFamily: 'monospace' }}>{studentData.idIssuedDate || '08/2026'}</strong>
          </div>
          <div style={{ color: '#166534', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }} />
            EXPIRES: <span style={{ fontFamily: 'monospace' }}>{studentData.idExpiryDate || '08/2027'}</span>
          </div>
        </div>

        {/* Verification QR Code */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '2px',
          }}
        >
          {studentData.qrDataUrl ? (
            <div
              style={{
                width: '135px',
                height: '135px',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                padding: '6px',
                background: '#ffffff',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={studentData.qrDataUrl}
                alt="Verification QR Code"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          ) : (
            <div
              style={{
                width: '135px',
                height: '135px',
                border: '1px dashed #cbd5e1',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94a3b8',
                fontSize: '10px',
              }}
            >
              QR Generating...
            </div>
          )}
          <div
            style={{
              fontSize: '8.5px',
              color: '#64748b',
              letterSpacing: '0.06em',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginTop: '5px',
            }}
          >
            Scan for Student Record Verification
          </div>
        </div>

        {/* Barcode Strip */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '4px'
          }}
        >
          <div
            style={{
              width: '260px',
              height: '32px',
              backgroundImage: 'repeating-linear-gradient(90deg, #1e293b 0px, #1e293b 2px, transparent 2px, transparent 4px, #1e293b 4px, #1e293b 5px, transparent 5px, transparent 8px, #1e293b 8px, #1e293b 11px, transparent 11px, transparent 13px)',
              borderRadius: '2px'
            }}
          />
          <div style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.15em', color: '#475569', marginTop: '2px' }}>
            *{studentData.techId}*
          </div>
        </div>
      </div>

      {/* Card Footer Warning / Reference */}
      <div
        style={{
          background: '#f1f5f9',
          borderTop: '1px solid #e2e8f0',
          padding: '8px 16px',
          textAlign: 'center',
          fontSize: '9px',
          color: '#64748b',
          lineHeight: 1.3,
        }}
      >
        Official student identification card • {config.registrarOffice} • Valid for academic year
      </div>
    </div>
  );
}
