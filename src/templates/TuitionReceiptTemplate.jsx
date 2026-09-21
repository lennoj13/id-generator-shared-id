import React from 'react';

/**
 * Official University Tuition Receipt & Enrollment Billing Statement
 * (Comprobante / Recibo Oficial de Matrícula y Aranceles)
 *
 * Designed with authentic institutional paper document styling for official printing:
 * - Formal university letterhead with campus code and Bursar / Registrar division
 * - Tabular accounting ledger with double-ruled accounting lines
 * - Itemized registered courses, credits, and tuition charges
 * - Authentic Bursar Cashier validation stamp (replacing web-style cards)
 * - Explicit Zero Balance ($0.00 USD) and Paid in Full accounting summary
 * - FERPA legal certification paragraph, official registrar signature line, and QR code
 */
export default function TuitionReceiptTemplate({ config, studentData }) {
  if (!config || !studentData) return null;

  const courses = studentData.courses || [];
  const primaryColor = config.colors?.primary || '#0f172a';

  return (
    <div
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        width: '820px',
        minHeight: '1060px',
        background: '#ffffff',
        color: '#0f172a',
        padding: '36px 40px',
        boxSizing: 'border-box',
        position: 'relative',
        fontSize: '10.5px',
        lineHeight: 1.45,
        boxShadow: '0 4px 25px rgba(0, 0, 0, 0.12)',
        border: '1px solid #94a3b8'
      }}
    >
      {/* Top University Letterhead */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottom: '2px solid #0f172a',
          paddingBottom: '14px',
          marginBottom: '2px'
        }}
      >
        {/* Left: Crest & Institutional Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', maxWidth: '65%' }}>
          {config.logoUrl && (
            <img
              src={config.logoUrl}
              alt={config.name}
              style={{ height: '56px', width: 'auto', objectFit: 'contain' }}
            />
          )}
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: 800,
                color: '#0f172a',
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                fontFamily: "'Times New Roman', 'Georgia', serif",
                lineHeight: 1.15
              }}
            >
              {config.name}
            </h1>
            <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '3px' }}>
              Office of the University Bursar &bull; Student Accounts &amp; Billing
            </div>
            <div style={{ fontSize: '9px', color: '#64748b', marginTop: '2px' }}>
              {config.location} &bull; Official Student Portal: portal.{config.emailDomain} &bull; Bursar Support: {config.registrarPhone || '(507) 389-6266'}
            </div>
          </div>
        </div>

        {/* Right: Formal Receipt Header Stamp */}
        <div
          style={{
            border: '1.5px solid #0f172a',
            padding: '8px 12px',
            borderRadius: '2px',
            textAlign: 'right',
            background: '#f8fafc',
            minWidth: '190px'
          }}
        >
          <div style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#0f172a' }}>
            Official Tuition Receipt
          </div>
          <div style={{ fontSize: '9px', color: '#475569', marginTop: '4px' }}>
            Receipt #: <strong style={{ fontFamily: 'monospace', color: '#0f172a', fontSize: '10.5px' }}>{studentData.receiptNumber}</strong>
          </div>
          <div style={{ fontSize: '9px', color: '#475569', marginTop: '2px' }}>
            Issue Date: <strong style={{ color: '#0f172a' }}>{studentData.recordDate || studentData.statementDate}</strong>
          </div>
          <div style={{ fontSize: '9px', color: '#475569', marginTop: '2px' }}>
            Account Status: <strong style={{ color: '#0f172a' }}>PAID IN FULL</strong>
          </div>
        </div>
      </div>

      {/* Secondary hairline letterhead rule */}
      <div style={{ borderBottom: '1px solid #64748b', marginBottom: '14px' }} />

      {/* Document Heading */}
      <div style={{ textAlign: 'center', marginBottom: '14px' }}>
        <h2
          style={{
            margin: 0,
            fontSize: '13.5px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontFamily: "'Times New Roman', 'Georgia', serif",
            color: '#0f172a'
          }}
        >
          Tuition Billing Statement &amp; Official Enrollment Receipt
        </h2>
        <div style={{ fontSize: '10px', color: '#475569', marginTop: '2px' }}>
          Official Academic Record for <strong>{studentData.term}</strong> &bull; Office of the Registrar &amp; Bursar
        </div>
      </div>

      {/* Student Profile & Registration Demographics (Formal Tabular Box) */}
      <div
        style={{
          border: '1.5px solid #0f172a',
          marginBottom: '16px',
          background: '#ffffff'
        }}
      >
        <div
          style={{
            background: '#f1f5f9',
            borderBottom: '1px solid #0f172a',
            padding: '4px 10px',
            fontSize: '9px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#0f172a'
          }}
        >
          Section I: Student &amp; Academic Enrollment Demographics
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px' }}>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '6px 10px', width: '20%', fontWeight: 700, color: '#475569', background: '#f8fafc' }}>
                STUDENT NAME:
              </td>
              <td style={{ padding: '6px 10px', width: '30%', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase' }}>
                {studentData.fullName}
              </td>
              <td style={{ padding: '6px 10px', width: '20%', fontWeight: 700, color: '#475569', background: '#f8fafc' }}>
                DEGREE PROGRAM:
              </td>
              <td style={{ padding: '6px 10px', width: '30%', fontWeight: 700, color: '#0f172a' }}>
                {studentData.majorName}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '6px 10px', fontWeight: 700, color: '#475569', background: '#f8fafc' }}>
                {config.idLabel.toUpperCase()}:
              </td>
              <td style={{ padding: '6px 10px', fontFamily: 'monospace', fontWeight: 800, color: '#0f172a', fontSize: '11px' }}>
                {studentData.studentId}
              </td>
              <td style={{ padding: '6px 10px', fontWeight: 700, color: '#475569', background: '#f8fafc' }}>
                COLLEGE / DIVISION:
              </td>
              <td style={{ padding: '6px 10px', fontWeight: 600, color: '#0f172a' }}>
                {studentData.collegeName}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '6px 10px', fontWeight: 700, color: '#475569', background: '#f8fafc' }}>
                {config.secondaryIdLabel.toUpperCase()}:
              </td>
              <td style={{ padding: '6px 10px', fontFamily: 'monospace', fontWeight: 700, color: '#0f172a' }}>
                {studentData.techId}
              </td>
              <td style={{ padding: '6px 10px', fontWeight: 700, color: '#475569', background: '#f8fafc' }}>
                ACADEMIC TERM:
              </td>
              <td style={{ padding: '6px 10px', fontWeight: 700, color: '#0f172a' }}>
                {studentData.term}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '6px 10px', fontWeight: 700, color: '#475569', background: '#f8fafc' }}>
                DATE OF BIRTH (DOB):
              </td>
              <td style={{ padding: '6px 10px', fontWeight: 700, color: '#0f172a' }}>
                {studentData.dob} <span style={{ fontFamily: 'monospace', color: '#64748b' }}>({studentData.dobShort})</span>
              </td>
              <td style={{ padding: '6px 10px', fontWeight: 700, color: '#475569', background: '#f8fafc' }}>
                TERM DATES:
              </td>
              <td style={{ padding: '6px 10px', fontWeight: 600, color: '#0f172a' }}>
                {studentData.termDates}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '6px 10px', fontWeight: 700, color: '#475569', background: '#f8fafc' }}>
                STUDENT EMAIL:
              </td>
              <td style={{ padding: '6px 10px', color: '#0f172a' }}>
                {studentData.email}
              </td>
              <td style={{ padding: '6px 10px', fontWeight: 700, color: '#475569', background: '#f8fafc' }}>
                ENROLLMENT STATUS:
              </td>
              <td style={{ padding: '6px 10px', fontWeight: 700, color: '#0f172a' }}>
                {studentData.status}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Itemized Course Registration & Tuition Assessment Table */}
      <div style={{ marginBottom: '16px' }}>
        <div
          style={{
            background: '#f1f5f9',
            border: '1px solid #0f172a',
            borderBottom: 'none',
            padding: '4px 10px',
            fontSize: '9px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#0f172a'
          }}
        >
          Section II: Registered Courses &amp; Tuition Assessment Ledger
        </div>

        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '9.5px',
            border: '1px solid #0f172a'
          }}
        >
          <thead>
            <tr
              style={{
                background: '#1e293b',
                color: '#ffffff',
                textAlign: 'left',
                fontWeight: 800,
                fontSize: '8.5px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              <th style={{ padding: '6px 8px', width: '15%', borderRight: '1px solid #334155' }}>COURSE CODE</th>
              <th style={{ padding: '6px 8px', width: '40%', borderRight: '1px solid #334155' }}>COURSE TITLE &amp; DESCRIPTION</th>
              <th style={{ padding: '6px 8px', width: '13%', borderRight: '1px solid #334155' }}>INSTRUCTION</th>
              <th style={{ padding: '6px 8px', width: '10%', textAlign: 'center', borderRight: '1px solid #334155' }}>CREDITS</th>
              <th style={{ padding: '6px 8px', width: '10%', textAlign: 'right', borderRight: '1px solid #334155' }}>RATE/CR</th>
              <th style={{ padding: '6px 8px', width: '12%', textAlign: 'right' }}>CHARGES</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c, i) => {
              const crNum = parseFloat(c.cr || 0);
              const courseTotal = (crNum * studentData.costPerCredit).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              });
              return (
                <tr
                  key={c.code}
                  style={{
                    background: i % 2 === 0 ? '#ffffff' : '#f8fafc',
                    borderBottom: '1px solid #cbd5e1'
                  }}
                >
                  <td style={{ padding: '5px 8px', fontFamily: 'monospace', fontWeight: 800, color: '#0f172a', borderRight: '1px solid #e2e8f0' }}>
                    {c.code}
                  </td>
                  <td style={{ padding: '5px 8px', fontWeight: 600, color: '#0f172a', borderRight: '1px solid #e2e8f0' }}>
                    {c.title}
                  </td>
                  <td style={{ padding: '5px 8px', color: '#475569', borderRight: '1px solid #e2e8f0' }}>
                    {c.type || 'Lecture / Lab'}
                  </td>
                  <td style={{ padding: '5px 8px', textAlign: 'center', fontWeight: 700, borderRight: '1px solid #e2e8f0' }}>
                    {c.cr}
                  </td>
                  <td style={{ padding: '5px 8px', textAlign: 'right', fontFamily: 'monospace', color: '#475569', borderRight: '1px solid #e2e8f0' }}>
                    ${studentData.costPerCredit.toFixed(2)}
                  </td>
                  <td style={{ padding: '5px 8px', textAlign: 'right', fontFamily: 'monospace', fontWeight: 700, color: '#0f172a' }}>
                    {courseTotal}
                  </td>
                </tr>
              );
            })}

            {/* Mandatory Fees Row */}
            <tr style={{ background: '#ffffff', borderBottom: '1px solid #cbd5e1', fontSize: '9px' }}>
              <td style={{ padding: '5px 8px', fontFamily: 'monospace', fontWeight: 700, color: '#475569', borderRight: '1px solid #e2e8f0' }}>
                FEE-MAND
              </td>
              <td style={{ padding: '5px 8px', color: '#475569', borderRight: '1px solid #e2e8f0' }}>
                Comprehensive Institutional Fees (Technology, Campus Health, Student Activities)
              </td>
              <td style={{ padding: '5px 8px', color: '#475569', borderRight: '1px solid #e2e8f0' }}>
                Institutional
              </td>
              <td style={{ padding: '5px 8px', textAlign: 'center', color: '#64748b', borderRight: '1px solid #e2e8f0' }}>
                --
              </td>
              <td style={{ padding: '5px 8px', textAlign: 'right', color: '#64748b', borderRight: '1px solid #e2e8f0' }}>
                Included
              </td>
              <td style={{ padding: '5px 8px', textAlign: 'right', fontFamily: 'monospace', fontWeight: 600, color: '#475569' }}>
                $0.00
              </td>
            </tr>

            {/* Subtotal Row with double accounting rule */}
            <tr style={{ background: '#f8fafc', fontWeight: 800, borderTop: '2px solid #0f172a' }}>
              <td colSpan={3} style={{ padding: '7px 8px', textTransform: 'uppercase', color: '#0f172a', letterSpacing: '0.03em' }}>
                Total Assessed Tuition &amp; Mandatory Institutional Fees
              </td>
              <td style={{ padding: '7px 8px', textAlign: 'center', color: '#0f172a' }}>
                {studentData.totalCredits} Cr
              </td>
              <td style={{ padding: '7px 8px' }} />
              <td style={{ padding: '7px 8px', textAlign: 'right', fontFamily: 'monospace', fontSize: '11px', color: '#0f172a', borderBottom: '3px double #0f172a' }}>
                {studentData.tuition}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Applied Payments Table */}
      <div style={{ marginBottom: '16px' }}>
        <div
          style={{
            background: '#f1f5f9',
            border: '1px solid #0f172a',
            borderBottom: 'none',
            padding: '4px 10px',
            fontSize: '9px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#0f172a'
          }}
        >
          Section III: Payments Received &amp; Bursar Clearances
        </div>

        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '9.5px',
            border: '1px solid #0f172a'
          }}
        >
          <thead>
            <tr
              style={{
                background: '#1e293b',
                color: '#ffffff',
                textAlign: 'left',
                fontWeight: 800,
                fontSize: '8.5px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              <th style={{ padding: '6px 8px', width: '16%', borderRight: '1px solid #334155' }}>POSTING DATE</th>
              <th style={{ padding: '6px 8px', width: '42%', borderRight: '1px solid #334155' }}>PAYMENT METHOD &amp; DESCRIPTION</th>
              <th style={{ padding: '6px 8px', width: '24%', borderRight: '1px solid #334155' }}>CONFIRMATION / REFERENCE #</th>
              <th style={{ padding: '6px 8px', width: '18%', textAlign: 'right' }}>AMOUNT APPLIED</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ background: '#ffffff', borderBottom: '2px solid #0f172a' }}>
              <td style={{ padding: '7px 8px', color: '#0f172a', fontWeight: 600, borderRight: '1px solid #e2e8f0' }}>
                {studentData.enrollmentDate}
              </td>
              <td style={{ padding: '7px 8px', borderRight: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{studentData.paymentMethod}</div>
                <div style={{ fontSize: '8.5px', color: '#64748b' }}>Direct Bursar Student Accounts Electronic Clearing</div>
              </td>
              <td style={{ padding: '7px 8px', fontFamily: 'monospace', fontSize: '9px', borderRight: '1px solid #e2e8f0' }}>
                <div style={{ color: '#0f172a', fontWeight: 700 }}>{studentData.paymentRef}</div>
                <div style={{ color: '#475569' }}>{studentData.paymentConfirmation}</div>
              </td>
              <td style={{ padding: '7px 8px', textAlign: 'right', fontFamily: 'monospace', fontWeight: 800, color: '#0f172a', borderBottom: '3px double #0f172a' }}>
                -{studentData.tuition}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Account Statement Summary & Official Cashier Stamp Box (Institutional Replacement for Web Alert) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '16px',
          marginBottom: '18px',
          alignItems: 'stretch'
        }}
      >
        {/* Left: Accounting Balance Summary Ledger Box */}
        <div
          style={{
            border: '1.5px solid #0f172a',
            padding: '12px 14px',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '9.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', marginBottom: '8px' }}>
              Account Balance Ledger Summary
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px', color: '#334155' }}>
              <span>Total Assessed Institutional Charges:</span>
              <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#0f172a' }}>{studentData.tuition}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '6px', color: '#334155' }}>
              <span>Less Total Payments &amp; Credits Applied:</span>
              <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#0f172a' }}>-{studentData.tuition}</span>
            </div>
          </div>

          <div
            style={{
              borderTop: '2px solid #0f172a',
              paddingTop: '6px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline'
            }}
          >
            <div>
              <div style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', color: '#0f172a' }}>
                Remaining Account Balance Due
              </div>
              <div style={{ fontSize: '8.5px', color: '#475569' }}>
                Account in good financial standing &bull; No holds
              </div>
            </div>
            <div
              style={{
                fontSize: '18px',
                fontWeight: 900,
                fontFamily: 'monospace',
                color: '#0f172a',
                borderBottom: '3px double #0f172a',
                paddingBottom: '1px'
              }}
            >
              $0.00 USD
            </div>
          </div>
        </div>

        {/* Right: Authentic Bursar Official Rubber Ink Stamp */}
        <div
          style={{
            border: '2.5px solid #991b1b',
            borderRadius: '4px',
            padding: '10px',
            textAlign: 'center',
            background: 'rgba(153, 27, 27, 0.02)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            transform: 'rotate(-1deg)'
          }}
        >
          <div style={{ fontSize: '9px', fontWeight: 900, color: '#991b1b', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            &bull; {config.shortName} OFFICE OF THE BURSAR &bull;
          </div>
          <div
            style={{
              fontSize: '16px',
              fontWeight: 900,
              color: '#991b1b',
              letterSpacing: '0.06em',
              margin: '3px 0',
              textTransform: 'uppercase',
              fontFamily: "'Times New Roman', serif",
              borderTop: '1px solid #991b1b',
              borderBottom: '1px solid #991b1b',
              padding: '2px 0',
              width: '90%'
            }}
          >
            PAID IN FULL
          </div>
          <div style={{ fontSize: '8px', fontWeight: 800, color: '#991b1b', letterSpacing: '0.05em' }}>
            OFFICIAL CASHIER VALIDATION
          </div>
          <div style={{ fontSize: '8px', fontFamily: 'monospace', color: '#991b1b', marginTop: '3px' }}>
            DATE: {studentData.recordDate} &bull; REF: {studentData.paymentRef}
          </div>
        </div>
      </div>

      {/* Institutional Legal Certification & Signature Footer */}
      <div
        style={{
          borderTop: '1.5px solid #0f172a',
          paddingTop: '12px',
          display: 'grid',
          gridTemplateColumns: '100px 1fr 180px',
          gap: '14px',
          alignItems: 'center'
        }}
      >
        {/* Verification QR Code */}
        <div style={{ textAlign: 'center' }}>
          {studentData.qrDataUrl ? (
            <img
              src={studentData.qrDataUrl}
              alt="Verification QR Code"
              style={{ width: '84px', height: '84px', border: '1px solid #0f172a', padding: '2px' }}
            />
          ) : (
            <div style={{ width: '84px', height: '84px', border: '1px dashed #94a3b8' }} />
          )}
          <div style={{ fontSize: '7.5px', color: '#475569', fontWeight: 800, marginTop: '3px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Scan to Verify
          </div>
        </div>

        {/* FERPA Legal Statement */}
        <div>
          <div style={{ fontSize: '9px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Office of the Registrar &amp; Bursar Institutional Certification
          </div>
          <p style={{ margin: '3px 0 0', fontSize: '8.5px', color: '#475569', lineHeight: 1.35 }}>
            This official document certifies that the individual named herein is officially enrolled and in good academic standing at {config.name} for the {studentData.term}. All tuition and mandatory university fees have been settled in full. Record maintained under the Family Educational Rights and Privacy Act (FERPA, 20 U.S.C. &sect; 1232g).
          </p>
          <div style={{ fontSize: '8px', color: '#64748b', marginTop: '3px', fontFamily: 'monospace' }}>
            SYSTEM AUDIT TIMESTAMP: {studentData.recordDate} 08:30:00 CST &bull; DOC ID: {studentData.enrollmentId}
          </div>
        </div>

        {/* Registrar Signature & Institutional Seal */}
        <div
          style={{
            borderLeft: '1px solid #cbd5e1',
            paddingLeft: '12px',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              fontFamily: "'Times New Roman', 'Brush Script MT', cursive, serif",
              fontSize: '15px',
              fontWeight: 700,
              color: '#1e293b',
              borderBottom: '1px solid #0f172a',
              paddingBottom: '2px',
              fontStyle: 'italic'
            }}
          >
            Office of the Registrar
          </div>
          <div style={{ fontSize: '8px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', marginTop: '3px' }}>
            Authorized University Registrar
          </div>
          <div style={{ fontSize: '7.5px', color: '#64748b', marginTop: '1px' }}>
            Student Financial Records Division
          </div>
          <div style={{ fontSize: '7.5px', color: primaryColor, fontWeight: 700, marginTop: '2px' }}>
            &bull; OFFICIAL ENROLLMENT SEAL &bull;
          </div>
        </div>
      </div>
    </div>
  );
}

