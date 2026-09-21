import React from 'react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const COURSE_COLOR_MAP = {
  'CIS 420': { border: '#d97706', bg: 'rgba(245, 158, 11, 0.1)', text: '#78350f', badgeBg: '#fef3c7', badgeText: '#78350f', icon: '#d97706' },
  'CIS 455': { border: '#49306E', bg: 'rgba(73, 48, 110, 0.1)', text: '#49306E', badgeBg: '#ede9fe', badgeText: '#362154', icon: '#49306E' },
  'IT 440': { border: '#1d4ed8', bg: 'rgba(37, 99, 235, 0.1)', text: '#1e3a8a', badgeBg: '#dbeafe', badgeText: '#1e3a8a', icon: '#1d4ed8' },
  'CIS 485': { border: '#047857', bg: 'rgba(5, 150, 105, 0.1)', text: '#064e3b', badgeBg: '#a7f3d0', badgeText: '#064e3b', icon: '#047857' }
};

const DEFAULT_THEMES = [
  { border: '#d97706', bg: 'rgba(245, 158, 11, 0.1)', text: '#78350f', badgeBg: '#fef3c7', badgeText: '#78350f', icon: '#d97706' },
  { border: '#49306E', bg: 'rgba(73, 48, 110, 0.1)', text: '#49306E', badgeBg: '#ede9fe', badgeText: '#362154', icon: '#49306E' },
  { border: '#1d4ed8', bg: 'rgba(37, 99, 235, 0.1)', text: '#1e3a8a', badgeBg: '#dbeafe', badgeText: '#1e3a8a', icon: '#1d4ed8' },
  { border: '#047857', bg: 'rgba(5, 150, 105, 0.1)', text: '#064e3b', badgeBg: '#a7f3d0', badgeText: '#064e3b', icon: '#047857' },
  { border: '#7c3aed', bg: 'rgba(124, 58, 237, 0.1)', text: '#5b21b6', badgeBg: '#f3e8ff', badgeText: '#5b21b6', icon: '#7c3aed' }
];

function getCourseTheme(code, idx, primaryColor) {
  const baseCode = (code || '').split('-')[0].trim();
  if (COURSE_COLOR_MAP[baseCode]) return COURSE_COLOR_MAP[baseCode];
  const theme = DEFAULT_THEMES[idx % DEFAULT_THEMES.length];
  if (primaryColor && idx === 1) {
    return { ...theme, border: primaryColor, text: primaryColor, icon: primaryColor };
  }
  return theme;
}

function getShortTitle(title, code) {
  if (code && code.startsWith('CIS 420')) return 'Enterprise Application Arch';
  if (code && code.startsWith('CIS 455')) return 'Software Quality & Auditing';
  if (code && code.startsWith('IT 440')) return 'IT Project Management';
  if (code && code.startsWith('CIS 485')) return 'Senior Software Architecture';
  if (!title) return '';
  if (title.length > 28) return title.split('&')[0].trim();
  return title;
}

function parseCourseBlocks(courses) {
  const blocks = [];
  courses.forEach((c, cIdx) => {
    if (!c.times) return;
    const parts = c.times.split(' / ');
    parts.forEach((p, pIdx) => {
      const match = p.match(/([a-zA-Z\/]+)\s+(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/);
      if (match) {
        const daysStr = match[1];
        const startHour = parseInt(match[2], 10);
        let endHour = parseInt(match[4], 10);
        if (parseInt(match[5], 10) > 0) endHour += 1;
        
        const daysArr = daysStr.split('/');
        daysArr.forEach(d => {
          const dayIdx = DAYS.findIndex(x => x.toLowerCase().startsWith(d.toLowerCase()));
          if (dayIdx !== -1) {
            // Specific overrides for reference photo authenticity
            let overrideType = c.type || 'Online Sync';
            let overrideRoom = c.room || c.loc;
            if (c.code.startsWith('CIS 420')) {
              if (dayIdx === 0) { // Monday
                overrideType = 'In-Person';
                overrideRoom = 'Wissink Hall 210';
              } else { // Friday
                overrideType = 'Online Sync';
                overrideRoom = 'Zoom Live MNSU';
              }
            } else if (c.code.startsWith('CIS 455') || c.code.startsWith('IT 440') || c.code.startsWith('CIS 485')) {
              overrideType = 'Online Sync';
              overrideRoom = 'Zoom Live MNSU';
            }

            blocks.push({
              day: dayIdx,
              start: startHour,
              span: Math.max(1, endHour - startHour),
              timeStr: `${match[2].padStart(2, '0')}:${match[3]} - ${match[4].padStart(2, '0')}:${match[5]}`,
              course: c,
              courseIdx: cIdx,
              blockType: overrideType,
              blockRoom: overrideRoom
            });
          }
        });
      }
    });
  });
  return blocks;
}

/**
 * ScheduleTemplate — Faithful reproduction of Minnesota State University, Mankato Student Portal.
 * Default mode="sheerid" renders the EXACT 1024x500 desktop browser screenshot format that passes SheerID verification.
 */
export default function ScheduleTemplate({ config, studentData, mode = 'sheerid' }) {
  if (!config || !studentData) return null;
  const { colors } = config;
  const courses = studentData.courses || [];
  const blocks = parseCourseBlocks(courses);

  let minStart = 18;
  let maxEnd = 23;
  if (blocks.length > 0) {
    minStart = Math.min(...blocks.map(b => b.start));
    maxEnd = Math.max(...blocks.map(b => b.start + b.span));
  }
  const dynamicRows = [];
  for (let i = minStart; i < maxEnd; i++) dynamicRows.push(i);
  if (dynamicRows.length === 0) {
    for (let i = 18; i <= 22; i++) dynamicRows.push(i);
  }

  const primaryColor = colors.primary || '#49306E';
  const primaryDark = colors.primaryDark || '#362154';
  const accentGold = colors.accent || '#FEBD11';
  const isSheerId = mode === 'sheerid';

  // For SheerID 1024x500 mode, height of matrix row is exactly 33px for 5 rows
  const rowHeight = isSheerId
    ? (dynamicRows.length <= 5 ? 33 : Math.max(24, Math.floor(165 / dynamicRows.length)))
    : 44;

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        width: '1024px',
        height: isSheerId ? '500px' : 'auto',
        minHeight: isSheerId ? '500px' : 'auto',
        maxHeight: isSheerId ? '500px' : 'none',
        overflow: isSheerId ? 'hidden' : 'visible',
        background: '#F0F3F7',
        color: '#1e293b',
        boxSizing: 'border-box',
        position: 'relative',
        lineHeight: 1.3
      }}
    >
      {/* Institutional Web Header (White Bar) - Height: 50px */}
      <header
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          height: '50px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          {/* Logo & University Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
            {config.logoUrl && (
              <img
                src={config.logoUrl}
                alt={config.name}
                style={{ height: '35px', width: 'auto', objectFit: 'contain' }}
              />
            )}
            <div style={{ borderLeft: '2px solid #e2e8f0', paddingLeft: '12px', minWidth: 0 }}>
              <h1
                style={{
                  margin: 0,
                  fontSize: '15px',
                  fontWeight: 900,
                  color: primaryColor,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                  fontFamily: "'Outfit', 'Inter', sans-serif",
                  lineHeight: 1.15
                }}
              >
                {config.name}
              </h1>
              <p style={{ margin: '1px 0 0', fontSize: '11px', color: '#64748b' }}>
                {config.registrarOffice} • Student Course Registration
              </p>
            </div>
          </div>

          {/* Student Profile Badge */}
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <p
              style={{
                margin: 0,
                fontSize: '12px',
                fontWeight: 800,
                color: '#0f172a',
                textTransform: 'uppercase',
                lineHeight: 1.2
              }}
            >
              {studentData.fullName}
            </p>
            <p
              style={{
                margin: '1px 0 0',
                fontSize: '11px',
                fontFamily: 'monospace, sans-serif',
                color: '#64748b'
              }}
            >
              {config.idLabel}:{' '}
              <span style={{ fontWeight: 700, color: primaryColor }}>
                {studentData.studentId}
              </span>{' '}
              • {config.secondaryIdLabel}:{' '}
              <span style={{ fontWeight: 700, color: '#0f172a' }}>
                {studentData.techId}
              </span>
            </p>
          </div>
        </div>
      </header>

      {/* Portal Sub-Nav Tabs - Height: 28px */}
      <nav
        style={{
          background: '#1e293b',
          color: '#cbd5e1',
          fontSize: '11.5px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          borderTop: '1px solid #334155',
          height: '28px',
          boxSizing: 'border-box'
        }}
      >
        {['Dashboard', 'Courses & Registration', 'View Schedule (Active)', 'D2L Brightspace', 'Grades & Transcripts', 'Financial Aid & Billing'].map((tab, i) => {
          const isActive = i === 2;
          return (
            <span
              key={tab}
              style={{
                padding: '0 12px',
                height: '28px',
                display: 'inline-flex',
                alignItems: 'center',
                color: isActive ? accentGold : '#cbd5e1',
                background: isActive ? primaryColor : 'transparent',
                fontWeight: isActive ? 800 : 500,
                borderBottom: isActive ? `2px solid ${accentGold}` : 'none',
                whiteSpace: 'nowrap',
                cursor: 'default',
                boxSizing: 'border-box'
              }}
            >
              {tab}
            </span>
          );
        })}
      </nav>

      {/* Main Content Area: Left Schedule Card (737px) + Right Student Record Sidebar (236px) */}
      <main
        style={{
          padding: '8px 14px 8px 22px',
          display: 'grid',
          gridTemplateColumns: '737px 236px',
          gap: '15px',
          alignItems: 'start',
          boxSizing: 'border-box'
        }}
      >
        {/* Left Schedule Paper Card */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '2px solid #cbd5e1',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.04)',
            padding: '10px 12px',
            boxSizing: 'border-box'
          }}
        >
          {/* Institutional Heading */}
          <div
            style={{
              borderBottom: `2px solid ${primaryColor}`,
              paddingBottom: '4px',
              marginBottom: '8px'
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: '12px',
                fontWeight: 900,
                color: primaryColor,
                textTransform: 'uppercase',
                letterSpacing: '-0.01em'
              }}
            >
              STUDENT: {studentData.fullName}
            </p>
            <p
              style={{
                margin: '2px 0 0',
                fontSize: '11px',
                fontWeight: 700,
                color: '#1e293b'
              }}
            >
              ENROLLMENT VERIFICATION AND CLASS SCHEDULE{' '}
              <span style={{ fontWeight: 400, color: '#64748b' }}>
                • {studentData.collegeName}
              </span>
            </p>
          </div>

          {/* Section 1: Weekly Class Schedule Matrix */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '6px'
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: '#1e293b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.025em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={primaryColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                WEEKLY CLASS SCHEDULE MATRIX ({config.campusTimeLabel || `${config.shortName} CAMPUS TIME`})
              </h3>
              <span style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 500 }}>
                Term Dates: {studentData.termDates}
              </span>
            </div>

            {/* Matrix Table */}
            <div
              style={{
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                marginBottom: '10px'
              }}
            >
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  tableLayout: 'fixed'
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: primaryColor,
                      color: '#ffffff',
                      textAlign: 'center',
                      fontSize: '9.5px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      height: '20px'
                    }}
                  >
                    <th style={{ width: '12%', padding: '4px 2px', borderRight: `1px solid ${primaryDark}` }}>
                      TIME
                    </th>
                    {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'].map((d, i) => (
                      <th
                        key={d}
                        style={{
                          width: '17.6%',
                          padding: '4px 2px',
                          borderRight: i < 4 ? `1px solid ${primaryDark}` : 'none'
                        }}
                      >
                        {d}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dynamicRows.map((hour) => (
                    <tr key={hour} style={{ height: `${rowHeight}px` }}>
                      <td
                        style={{
                          borderBottom: '1px solid #e2e8f0',
                          borderRight: '1px solid #e2e8f0',
                          padding: '2px',
                          textAlign: 'center',
                          fontFamily: 'monospace, sans-serif',
                          fontWeight: 700,
                          fontSize: '9.5px',
                          color: '#334155',
                          background: '#f8fafc',
                          boxSizing: 'border-box'
                        }}
                      >
                        {String(hour).padStart(2, '0')}:00 - {String(hour + 1).padStart(2, '0')}:00
                      </td>
                      {DAYS.map((d, dayIdx) => {
                        const block = blocks.find(b => b.day === dayIdx && b.start === hour);
                        const spannedBlock = blocks.find(
                          b => b.day === dayIdx && b.start < hour && b.start + b.span > hour
                        );
                        if (spannedBlock) return null;

                        if (block) {
                          const theme = getCourseTheme(block.course.code, block.courseIdx, primaryColor);
                          const isInPerson = block.blockType === 'In-Person';
                          const shortTitle = getShortTitle(block.course.title, block.course.code);

                          return (
                            <td
                              key={dayIdx}
                              rowSpan={block.span}
                              style={{
                                borderBottom: '1px solid #e2e8f0',
                                borderRight: '1px solid #e2e8f0',
                                padding: '2px',
                                verticalAlign: 'top',
                                background: '#ffffff',
                                boxSizing: 'border-box'
                              }}
                            >
                              <div
                                style={{
                                  background: theme.bg,
                                  borderLeft: `4px solid ${theme.border}`,
                                  padding: '3px 5px',
                                  borderRadius: '0 3px 3px 0',
                                  height: '100%',
                                  boxSizing: 'border-box',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'space-between',
                                  overflow: 'hidden'
                                }}
                              >
                                <div>
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      gap: '2px'
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: '10.5px',
                                        fontWeight: 800,
                                        color: theme.text
                                      }}
                                    >
                                      {block.course.code}
                                    </span>
                                    <span
                                      style={{
                                        fontSize: '8px',
                                        fontWeight: 700,
                                        background: theme.badgeBg,
                                        color: theme.badgeText,
                                        padding: '1px 3px',
                                        borderRadius: '3px',
                                        whiteSpace: 'nowrap'
                                      }}
                                    >
                                      {block.blockType}
                                    </span>
                                  </div>
                                  <p
                                    style={{
                                      margin: '1px 0 0',
                                      fontSize: '9px',
                                      fontWeight: 700,
                                      color: '#0f172a',
                                      lineHeight: 1.15
                                    }}
                                  >
                                    {shortTitle}
                                  </p>
                                </div>
                                <div style={{ marginTop: '2px' }}>
                                  <p
                                    style={{
                                      margin: 0,
                                      fontSize: '8.5px',
                                      color: '#475569',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '3px'
                                    }}
                                  >
                                    {isInPerson ? (
                                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={theme.icon} strokeWidth="2.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                                    ) : (
                                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={theme.icon} strokeWidth="2.5"><rect x="3" y="4" width="18" height="12" rx="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
                                    )}
                                    <span>{block.blockRoom}</span>
                                  </p>
                                  <p style={{ margin: '1px 0 0', fontSize: '8px', color: '#64748b' }}>
                                    {block.timeStr} • {block.course.cr} Cr
                                  </p>
                                </div>
                              </div>
                            </td>
                          );
                        }
                        return (
                          <td
                            key={dayIdx}
                            style={{
                              borderBottom: '1px solid #e2e8f0',
                              borderRight: '1px solid #e2e8f0',
                              textAlign: 'center',
                              color: '#cbd5e1',
                              fontSize: '10px',
                              fontWeight: 600,
                              background: 'rgba(248, 250, 252, 0.4)',
                              boxSizing: 'border-box'
                            }}
                          >
                            --
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Registered Courses Header & Details */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '6px'
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: '#1e293b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.025em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={primaryColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
                REGISTERED COURSES • REGISTRATION DETAILS
              </h3>
              <span
                style={{
                  background: '#dcfce7',
                  color: '#166534',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  fontSize: '9.5px',
                  fontWeight: 700
                }}
              >
                Registered courses confirmed for {studentData.term}
              </span>
            </div>

            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                tableLayout: 'fixed',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                overflow: 'hidden'
              }}
            >
              <thead>
                <tr style={{ background: '#1e293b', color: '#ffffff', fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', height: '22px' }}>
                  <th style={{ width: '13%', padding: '5px 4px', textAlign: 'left', borderRight: '1px solid #334155' }}>COURSE</th>
                  <th style={{ width: '9%', padding: '5px 4px', textAlign: 'center', borderRight: '1px solid #334155' }}>CRN</th>
                  <th style={{ width: '27%', padding: '5px 4px', textAlign: 'left', borderRight: '1px solid #334155' }}>TITLE</th>
                  <th style={{ width: '5%', padding: '5px 4px', textAlign: 'center', borderRight: '1px solid #334155' }}>CR.</th>
                  <th style={{ width: '15%', padding: '5px 4px', textAlign: 'left', borderRight: '1px solid #334155' }}>DAYS &amp; TIMES</th>
                  <th style={{ width: '13%', padding: '5px 4px', textAlign: 'left', borderRight: '1px solid #334155' }}>BUILDING &amp; ROOM</th>
                  <th style={{ width: '10%', padding: '5px 4px', textAlign: 'left', borderRight: '1px solid #334155' }}>INSTRUCTOR</th>
                  <th style={{ width: '8%', padding: '5px 4px', textAlign: 'center' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {courses.slice(0, isSheerId ? 1 : courses.length).map((c, idx) => (
                  <tr
                    key={idx}
                    style={{
                      background: idx % 2 === 0 ? '#ffffff' : '#f8fafc',
                      borderBottom: '1px solid #e2e8f0'
                    }}
                  >
                    <td style={{ padding: '5px 4px', fontSize: '10px', fontWeight: 800, color: primaryColor, fontFamily: 'monospace', borderRight: '1px solid #e2e8f0' }}>
                      {c.code}
                    </td>
                    <td style={{ padding: '5px 4px', fontSize: '9.5px', color: '#64748b', textAlign: 'center', fontFamily: 'monospace', borderRight: '1px solid #e2e8f0' }}>
                      {c.crn}
                    </td>
                    <td style={{ padding: '5px 4px', borderRight: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>{c.title}</div>
                      <div style={{ fontSize: '8px', color: '#94a3b8', marginTop: '1px' }}>
                        Grading: Regular Letter (A-F) • Term: {studentData.term}
                      </div>
                    </td>
                    <td style={{ padding: '5px 4px', fontSize: '10px', fontWeight: 800, color: '#0f172a', textAlign: 'center', borderRight: '1px solid #e2e8f0' }}>
                      {c.cr}
                    </td>
                    <td style={{ padding: '5px 4px', fontSize: '9px', color: '#334155', fontWeight: 600, borderRight: '1px solid #e2e8f0', lineHeight: 1.25 }}>
                      {c.times ? c.times.split(' / ').map((t, ti) => <div key={ti}>{t}</div>) : '--'}
                    </td>
                    <td style={{ padding: '5px 4px', fontSize: '9px', color: '#334155', borderRight: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{c.loc}</div>
                      <div style={{ fontSize: '8px', color: '#94a3b8' }}>{c.room}</div>
                    </td>
                    <td style={{ padding: '5px 4px', fontSize: '9px', color: '#334155', fontWeight: 600, borderRight: '1px solid #e2e8f0' }}>
                      {c.inst}
                    </td>
                    <td style={{ padding: '5px 4px', textAlign: 'center' }}>
                      <span
                        style={{
                          background: '#dcfce7',
                          color: '#166534',
                          fontWeight: 700,
                          padding: '1px 5px',
                          borderRadius: '3px',
                          fontSize: '9px'
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

          {!isSheerId && (
            <div style={{ marginTop: '16px', borderTop: '2px solid #e2e8f0', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
              <div>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', marginRight: '6px' }} />
                Student record reference • Information shown for student record review
              </div>
              <div style={{ fontFamily: 'monospace' }}>
                Generated on: <strong style={{ color: '#0f172a' }}>{studentData.recordDate}</strong>
              </div>
            </div>
          )}
        </div>

        {/* Right Student Record Sidebar (Width: 236px) */}
        <aside
          style={{
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderTop: `3px solid ${primaryColor}`,
            boxShadow: '0 4px 12px rgba(23, 32, 51, 0.06)',
            padding: '12px 14px',
            boxSizing: 'border-box'
          }}
        >
          <div
            style={{
              borderBottom: `2px solid ${primaryColor}`,
              paddingBottom: '4px',
              marginBottom: '8px',
              fontSize: '13px',
              fontWeight: 900,
              textTransform: 'uppercase',
              color: primaryColor,
              letterSpacing: '0.02em'
            }}
          >
            STUDENT RECORD
          </div>

          <p
            style={{
              margin: '0 0 6px 0',
              fontSize: '13px',
              fontWeight: 900,
              color: '#0f172a',
              textTransform: 'uppercase',
              lineHeight: 1.2
            }}
          >
            {studentData.fullName}
          </p>

          <div
            style={{
              fontSize: '10.5px',
              color: '#334155',
              lineHeight: 1.42,
              display: 'flex',
              flexDirection: 'column',
              gap: '3px'
            }}
          >
            <div>
              {config.idLabel}:{' '}
              <strong style={{ fontFamily: 'monospace', color: primaryColor, fontWeight: 700 }}>
                {studentData.studentId}
              </strong>
            </div>
            <div>
              {config.secondaryIdLabel}:{' '}
              <strong style={{ fontFamily: 'monospace', color: '#0f172a', fontWeight: 700 }}>
                {studentData.techId}
              </strong>
            </div>
            <div style={{ wordBreak: 'break-all' }}>
              Student Email:{' '}
              <strong style={{ color: '#0f172a', fontWeight: 700 }}>{studentData.email}</strong>
            </div>
            <div>
              Enrollment ID:{' '}
              <strong style={{ fontFamily: 'monospace', color: '#0f172a', fontWeight: 700 }}>
                {studentData.enrollmentId}
              </strong>
            </div>
            <div>
              Major:{' '}
              <strong style={{ color: '#0f172a', fontWeight: 700 }}>{studentData.majorName}</strong>
            </div>
            <div>
              Academic Term:{' '}
              <strong style={{ color: primaryColor, fontWeight: 700 }}>{studentData.term}</strong>
            </div>
            <div>
              Enrollment Date:{' '}
              <strong style={{ color: '#0f172a', fontWeight: 700 }}>
                {studentData.enrollmentDate}
              </strong>
            </div>
            <div>
              Record Date:{' '}
              <strong style={{ color: '#0f172a', fontWeight: 700 }}>{studentData.recordDate}</strong>
            </div>
            <div style={{ margin: '1px 0' }}>
              Status:{' '}
              <span
                style={{
                  color: '#166534',
                  fontWeight: 700,
                  background: '#dcfce7',
                  padding: '1px 5px',
                  borderRadius: '3px',
                  fontSize: '9.5px',
                  display: 'inline-block'
                }}
              >
                {studentData.status}
              </span>
            </div>
            <div>
              Payment: <strong style={{ color: '#166534', fontWeight: 800 }}>PAID IN FULL</strong>
            </div>
            <div>
              Total Paid:{' '}
              <strong style={{ color: '#0f172a', fontWeight: 800 }}>
                {config.tuitionFlat || studentData.tuition}
              </strong>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
