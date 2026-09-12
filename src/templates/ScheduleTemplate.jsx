import React from 'react';

/**
 * Universal Schedule Template Component
 * Renders a full academic schedule + student record sidebar for any university.
 * All styling is driven by the template config colors.
 */
export default function ScheduleTemplate({ config, studentData }) {
  if (!config || !studentData) return null;

  const { colors } = config;
  const courses = studentData.courses || [];

  return (
    <div
      style={{
        fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
        background: '#ffffff',
        color: '#172033',
        width: '1100px',
        padding: '0',
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          background: colors.primaryDeep,
          color: '#ffffff',
          fontSize: '11px',
          padding: '8px 20px',
          borderBottom: `3px solid ${colors.accent}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              background: colors.accent,
              color: colors.primaryDeep,
              fontWeight: 900,
              padding: '2px 8px',
              borderRadius: '3px',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            {config.shortName}
          </span>
          <span style={{ color: '#cbd5e1' }}>
            {config.name} • {config.portalName}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#cbd5e1' }}>
          <span>
            Term: <strong style={{ color: '#fff' }}>{config.term}</strong>
          </span>
          <span style={{ color: '#64748b' }}>|</span>
          <span>
            {config.idLabel}:{' '}
            <strong style={{ fontFamily: 'monospace', color: colors.accent === '#1E1E1E' ? '#fff' : colors.accentLight }}>
              {studentData.studentId}
            </strong>
          </span>
        </div>
      </div>

      {/* Header */}
      <div
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '14px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {config.logoUrl ? (
            <img src={config.logoUrl} alt={config.name} style={{ height: '40px', objectFit: 'contain' }} />
          ) : (
            <h1
              style={{
                margin: 0,
                fontSize: '16px',
                fontWeight: 900,
                color: colors.primary,
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                fontFamily: "'Outfit', 'Inter', sans-serif",
              }}
            >
              {config.name}
            </h1>
          )}
          <div style={{ borderLeft: '2px solid #e2e8f0', paddingLeft: '16px' }}>
            <p style={{ margin: '0', fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
              {config.registrarOffice}
            </p>
            <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#64748b' }}>
              Student Course Registration
            </p>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: '12px', color: '#0f172a', textTransform: 'uppercase' }}>
            {studentData.fullName}
          </p>
          <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>
            {config.idLabel}: <span style={{ fontWeight: 700, color: colors.primary }}>{studentData.studentId}</span> •{' '}
            {config.secondaryIdLabel}: <span style={{ fontWeight: 700, color: '#1e293b' }}>{studentData.techId}</span>
          </p>
        </div>
      </div>

      {/* Navigation Bar */}
      <div
        style={{
          background: '#1e293b',
          padding: '0 20px',
          display: 'flex',
          gap: '2px',
          fontSize: '11px',
          fontWeight: 600,
        }}
      >
        {['Dashboard', 'Courses & Registration', 'View Schedule (Active)', 'Grades & Transcripts', 'Financial Aid'].map(
          (tab, i) => (
            <span
              key={i}
              style={{
                padding: '8px 14px',
                color: i === 2 ? colors.accent === '#1E1E1E' ? '#fff' : colors.accent : '#94a3b8',
                background: i === 2 ? colors.primary : 'transparent',
                fontWeight: i === 2 ? 800 : 600,
                borderBottom: i === 2 ? `2px solid ${colors.accent === '#1E1E1E' ? '#fff' : colors.accent}` : 'none',
              }}
            >
              {tab}
            </span>
          )
        )}
      </div>

      {/* Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '16px', padding: '16px 20px' }}>
        {/* Main Schedule Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Schedule Header */}
          <div
            style={{
              borderBottom: `2px solid ${colors.primary}`,
              paddingBottom: '8px',
            }}
          >
            <p style={{ fontSize: '12px', fontWeight: 900, color: colors.primary, textTransform: 'uppercase', margin: 0 }}>
              STUDENT: {studentData.fullName}
            </p>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#1e293b', margin: '2px 0 0' }}>
              ENROLLMENT VERIFICATION AND CLASS SCHEDULE{' '}
              <span style={{ fontWeight: 400, color: '#64748b' }}>• {studentData.collegeName}</span>
            </p>
          </div>

          {/* Course Table */}
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px',
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#1e293b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                ✦ Registered Courses • Registration Details
              </h3>
              <span
                style={{
                  background: '#dcfce7',
                  color: '#166534',
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '20px',
                }}
              >
                Registered courses confirmed for {config.term}
              </span>
            </div>

            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '10px',
                border: '1px solid #e2e8f0',
              }}
            >
              <thead>
                <tr>
                  {['COURSE', 'CRN', 'TITLE', 'CR.', 'DAYS & TIMES', 'BUILDING & ROOM', 'INSTRUCTOR', 'STATUS'].map(
                    (h) => (
                      <th
                        key={h}
                        style={{
                          background: '#1e293b',
                          color: '#fff',
                          padding: '8px 6px',
                          textAlign: 'left',
                          fontSize: '9px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          borderRight: '1px solid #334155',
                        }}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {courses.map((course, idx) => (
                  <tr key={idx} style={{ background: idx % 2 === 0 ? '#fff' : '#f8fafc' }}>
                    <td
                      style={{
                        padding: '8px 6px',
                        fontWeight: 700,
                        fontFamily: 'monospace',
                        color: colors.primary,
                        borderRight: '1px solid #e2e8f0',
                        borderBottom: '1px solid #e2e8f0',
                      }}
                    >
                      {course.code}
                    </td>
                    <td
                      style={{
                        padding: '8px 6px',
                        fontFamily: 'monospace',
                        color: '#64748b',
                        textAlign: 'center',
                        borderRight: '1px solid #e2e8f0',
                        borderBottom: '1px solid #e2e8f0',
                      }}
                    >
                      {course.crn}
                    </td>
                    <td style={{ padding: '8px 6px', borderRight: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{course.title}</span>
                      <br />
                      <span style={{ fontSize: '9px', color: '#94a3b8' }}>
                        Grading: Regular Letter (A-F) • {config.term}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: '8px 6px',
                        textAlign: 'center',
                        fontWeight: 700,
                        borderRight: '1px solid #e2e8f0',
                        borderBottom: '1px solid #e2e8f0',
                      }}
                    >
                      {course.cr}
                    </td>
                    <td
                      style={{
                        padding: '8px 6px',
                        fontWeight: 500,
                        borderRight: '1px solid #e2e8f0',
                        borderBottom: '1px solid #e2e8f0',
                      }}
                    >
                      {course.times}
                    </td>
                    <td style={{ padding: '8px 6px', borderRight: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
                      <span style={{ fontWeight: 600, color: '#1e293b' }}>{course.loc}</span>
                      <br />
                      <span style={{ fontSize: '9px', color: '#94a3b8' }}>{course.room}</span>
                    </td>
                    <td
                      style={{
                        padding: '8px 6px',
                        color: '#1e293b',
                        borderRight: '1px solid #e2e8f0',
                        borderBottom: '1px solid #e2e8f0',
                      }}
                    >
                      {course.inst}
                    </td>
                    <td style={{ padding: '8px 6px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>
                      <span
                        style={{
                          background: '#dcfce7',
                          color: '#166534',
                          fontWeight: 700,
                          fontSize: '9px',
                          padding: '2px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        Enrolled
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div
            style={{
              borderTop: '2px solid #e2e8f0',
              paddingTop: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '10px',
              color: '#64748b',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#22c55e',
                  display: 'inline-block',
                }}
              />
              <strong style={{ color: '#1e293b' }}>Student record reference</strong>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <span>Information shown for student record review</span>
            </div>
            <div style={{ textAlign: 'right', fontFamily: 'monospace' }}>
              <div>
                Generated on: <strong style={{ color: '#0f172a' }}>{studentData.recordDate}</strong>
              </div>
              <div style={{ fontSize: '9px', color: '#94a3b8' }}>
                Confirm with the {config.registrarOffice} for official certification
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar — Student Record */}
        <aside
          style={{
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderTop: `3px solid ${colors.primary}`,
            padding: '14px',
            fontSize: '11px',
            color: '#334155',
            lineHeight: 1.6,
          }}
        >
          <div
            style={{
              borderBottom: `2px solid ${colors.primary}`,
              paddingBottom: '8px',
              marginBottom: '10px',
              fontSize: '13px',
              fontWeight: 900,
              textTransform: 'uppercase',
              color: colors.primary,
            }}
          >
            Student Record
          </div>
          <p style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', margin: '0 0 6px' }}>
            {studentData.fullName}
          </p>
          <p>
            {config.idLabel}: <strong style={{ fontFamily: 'monospace', color: colors.primary }}>{studentData.studentId}</strong>
          </p>
          <p>
            {config.secondaryIdLabel}: <strong style={{ fontFamily: 'monospace', color: '#0f172a' }}>{studentData.techId}</strong>
          </p>
          <p style={{ wordBreak: 'break-all' }}>
            Student Email: <strong style={{ color: '#0f172a' }}>{studentData.email}</strong>
          </p>
          <p>
            Enrollment ID: <strong style={{ fontFamily: 'monospace', color: '#0f172a' }}>{studentData.enrollmentId}</strong>
          </p>
          <p>
            Major: <strong style={{ color: '#0f172a' }}>{studentData.majorName}</strong>
          </p>
          <p>
            Academic Term: <strong style={{ color: colors.primary }}>{studentData.term}</strong>
          </p>
          <p>
            Enrollment Date: <strong style={{ color: '#0f172a' }}>{studentData.enrollmentDate}</strong>
          </p>
          <p>
            Record Date: <strong style={{ color: '#0f172a' }}>{studentData.recordDate}</strong>
          </p>
          <p>
            Status:{' '}
            <span
              style={{
                background: '#dcfce7',
                color: '#166534',
                fontWeight: 700,
                fontSize: '10px',
                padding: '2px 6px',
                borderRadius: '4px',
              }}
            >
              {studentData.status}
            </span>
          </p>
          <p>
            Payment: <strong style={{ color: '#166534' }}>{studentData.paymentStatus}</strong>
          </p>
          <p>
            Total Paid:{' '}
            <strong style={{ color: '#0f172a' }}>
              {config.tuitionFlat || studentData.tuition}
            </strong>
          </p>
        </aside>
      </div>
    </div>
  );
}
