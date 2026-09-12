import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Zap, Download, Eye, FileBadge, Image as ImageIcon, CheckCircle2, X } from 'lucide-react';
import templates from '../templates';
import { buildStudentData } from '../utils/generators';
import { generateStudentQR } from '../utils/qrGenerator';
import { downloadElementAsImage } from '../utils/exportImage';
import ScheduleTemplate from '../templates/ScheduleTemplate';
import IdCardTemplate from '../templates/IdCardTemplate';

/**
 * Generator Page — Form + hidden renders + download actions.
 */
export default function GeneratorPage() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const config = templates[templateId];

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [useCustomEmail, setUseCustomEmail] = useState(false);
  const [customEmail, setCustomEmail] = useState('');
  const [majorKey, setMajorKey] = useState('');
  const [photoUrl, setPhotoUrl] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadingSchedule, setDownloadingSchedule] = useState(false);
  const [downloadingCard, setDownloadingCard] = useState(false);

  const scheduleRef = useRef(null);
  const idCardRef = useRef(null);

  // Set default major when config loads
  useEffect(() => {
    if (config && !majorKey) {
      setMajorKey(Object.keys(config.majors)[0]);
    }
  }, [config, majorKey]);

  if (!config) {
    return (
      <div className="generator-page">
        <div className="gen-error">
          <h2>Template not found</h2>
          <p>The template "{templateId}" doesn't exist.</p>
          <button onClick={() => navigate('/')} className="gen-btn gen-btn-primary">
            ← Back to Templates
          </button>
        </div>
      </div>
    );
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPhotoUrl(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    if (!firstName.trim() || !lastName.trim()) return;
    setIsGenerating(true);

    setTimeout(async () => {
      const email = useCustomEmail ? customEmail : null;
      const data = buildStudentData(firstName.trim(), lastName.trim(), email, photoUrl, config, majorKey);
      
      const qrDataUrl = await generateStudentQR(data, config);
      data.qrDataUrl = qrDataUrl;

      setStudentData(data);
      setIsGenerating(false);
    }, 600);
  };

  const handleDownloadSchedule = async () => {
    if (!scheduleRef.current) return;
    setDownloadingSchedule(true);
    try {
      const filename = `${firstName}_${lastName}_${config.shortName}_Schedule`.replace(/\s+/g, '_');
      await downloadElementAsImage(scheduleRef.current, filename);
    } catch (err) {
      console.error('Download failed:', err);
    }
    setDownloadingSchedule(false);
  };

  const handleDownloadCard = async () => {
    if (!idCardRef.current) return;
    setDownloadingCard(true);
    try {
      const filename = `${firstName}_${lastName}_${config.shortName}_ID_Card`.replace(/\s+/g, '_');
      await downloadElementAsImage(idCardRef.current, filename);
    } catch (err) {
      console.error('Download failed:', err);
    }
    setDownloadingCard(false);
  };

  const handleViewFullPage = () => {
    // Open the schedule in a new window for manual screenshots
    const win = window.open('', '_blank');
    if (!win || !scheduleRef.current) return;
    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${studentData.fullName} - ${config.name} Schedule</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@500;600;700;800;900&display=swap" rel="stylesheet">
        <style>
          body { margin: 0; padding: 20px; background: #eef1f4; display: flex; justify-content: center; font-family: 'Inter', sans-serif; }
        </style>
      </head>
      <body>${scheduleRef.current.outerHTML}</body>
      </html>
    `);
    win.document.close();
  };

  const majorOptions = Object.entries(config.majors);
  const generatedEmail = firstName && lastName
    ? `${firstName.toLowerCase().replace(/[^a-z]/g, '')}.${lastName.toLowerCase().replace(/[^a-z]/g, '')}@${config.emailDomain}`
    : '';

  return (
    <div className="generator-page">
      {/* Top Bar */}
      <div className="gen-topbar" style={{ '--tmpl-primary': config.colors.primary, '--tmpl-accent': config.colors.accent }}>
        <button onClick={() => navigate('/')} className="gen-back-btn">
          <ArrowLeft size={14} /> Templates
        </button>
        <div className="gen-topbar-info">
          <span className="gen-topbar-badge" style={{ background: config.colors.primary }}>
            {config.shortName}
          </span>
          <span className="gen-topbar-name">{config.name}</span>
        </div>
      </div>

      <div className="gen-layout">
        {/* Form Panel */}
        <div className="gen-form-panel">
          <div className="gen-form-card">
            <h2 className="gen-form-title">
              <span className="gen-form-icon" style={{ background: config.colors.primary }}>
                {config.shortName.charAt(0)}
              </span>
              Generate Your Schedule
            </h2>
            <p className="gen-form-desc">
              Fill in your details below. Everything else will be auto-generated to create a realistic-looking academic record.
            </p>

            {/* Name Fields */}
            <div className="gen-field-row">
              <div className="gen-field">
                <label>First Name *</label>
                <input
                  type="text"
                  placeholder="e.g. John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="gen-input"
                />
              </div>
              <div className="gen-field">
                <label>Last Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Smith"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="gen-input"
                />
              </div>
            </div>

            {/* Email */}
            <div className="gen-field">
              <label>Student Email</label>
              <div className="gen-email-toggle">
                <button
                  className={`gen-toggle-btn ${!useCustomEmail ? 'active' : ''}`}
                  onClick={() => setUseCustomEmail(false)}
                  style={!useCustomEmail ? { background: config.colors.primary } : {}}
                >
                  Auto-generate
                </button>
                <button
                  className={`gen-toggle-btn ${useCustomEmail ? 'active' : ''}`}
                  onClick={() => setUseCustomEmail(true)}
                  style={useCustomEmail ? { background: config.colors.primary } : {}}
                >
                  Custom email
                </button>
              </div>
              {useCustomEmail ? (
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="gen-input"
                />
              ) : (
                <div className="gen-auto-preview">
                  {generatedEmail || 'firstname.lastname@' + config.emailDomain}
                </div>
              )}
            </div>

            {/* Major */}
            <div className="gen-field">
              <label>Major / Degree Program</label>
              <select
                value={majorKey}
                onChange={(e) => setMajorKey(e.target.value)}
                className="gen-select"
              >
                {majorOptions.map(([key, major]) => (
                  <option key={key} value={key}>
                    {major.name} ({major.college})
                  </option>
                ))}
              </select>
            </div>

            {/* Photo Upload */}
            <div className="gen-field">
              <label>Profile Photo (Optional — for ID Card)</label>
              <div className="gen-photo-upload">
                {photoUrl ? (
                  <div className="gen-photo-preview">
                    <img src={photoUrl} alt="Preview" />
                    <button onClick={() => setPhotoUrl(null)} className="gen-photo-remove"><X size={12} /></button>
                  </div>
                ) : (
                  <label className="gen-photo-dropzone">
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} hidden />
                    <ImageIcon size={24} className="gen-photo-icon" />
                    <span>Click to upload photo</span>
                    <span className="gen-photo-hint">Optional — a placeholder will be used if empty</span>
                  </label>
                )}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!firstName.trim() || !lastName.trim() || isGenerating}
              className="gen-btn gen-btn-primary gen-btn-generate"
              style={{ '--btn-color': config.colors.primary }}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="gen-spinner" size={16} /> Generating...
                </>
              ) : (
                <><Zap size={16} /> Generate Schedule & ID Card</>
              )}
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="gen-results-panel">
          {!studentData ? (
            <div className="gen-placeholder">
              <FileBadge size={48} className="gen-placeholder-icon" strokeWidth={1.5} />
              <h3>Your schedule preview will appear here</h3>
              <p>Fill in the form on the left and click "Generate" to create your fake academic schedule and ID card.</p>
            </div>
          ) : (
            <div className="gen-results">
              <h3 className="gen-results-title">
                <CheckCircle2 size={20} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px', marginTop: '-2px' }} />
                Generated Successfully
              </h3>
              <p className="gen-results-desc">
                Your {config.shortName} schedule and ID card are ready. Download them as high-resolution PNG images.
              </p>

              {/* Download Buttons */}
              <div className="gen-download-row">
                <button
                  onClick={handleDownloadSchedule}
                  disabled={downloadingSchedule}
                  className="gen-btn gen-btn-download"
                  style={{ '--btn-color': config.colors.primary }}
                >
                  {downloadingSchedule ? (
                    <><Loader2 className="gen-spinner" size={14} /> Rendering...</>
                  ) : (
                    <><Download size={14} /> Download Schedule Image</>
                  )}
                </button>
                <button
                  onClick={handleDownloadCard}
                  disabled={downloadingCard}
                  className="gen-btn gen-btn-download"
                  style={{ '--btn-color': '#1e293b' }}
                >
                  {downloadingCard ? (
                    <><Loader2 className="gen-spinner" size={14} /> Rendering...</>
                  ) : (
                    <><Download size={14} /> Download ID Card Image</>
                  )}
                </button>
              </div>
              <button onClick={handleViewFullPage} className="gen-btn gen-btn-secondary">
                <Eye size={14} /> Open Full Page View (for screenshots)
              </button>

              {/* Auto-generated Data Summary */}
              <div className="gen-data-summary">
                <h4>Auto-Generated Data</h4>
                <div className="gen-data-grid">
                  <div className="gen-data-item">
                    <span className="gen-data-label">{config.idLabel}</span>
                    <span className="gen-data-value">{studentData.studentId}</span>
                  </div>
                  <div className="gen-data-item">
                    <span className="gen-data-label">{config.secondaryIdLabel}</span>
                    <span className="gen-data-value">{studentData.techId}</span>
                  </div>
                  <div className="gen-data-item">
                    <span className="gen-data-label">Email</span>
                    <span className="gen-data-value">{studentData.email}</span>
                  </div>
                  <div className="gen-data-item">
                    <span className="gen-data-label">Enrollment ID</span>
                    <span className="gen-data-value">{studentData.enrollmentId}</span>
                  </div>
                  <div className="gen-data-item">
                    <span className="gen-data-label">Total Credits</span>
                    <span className="gen-data-value">{studentData.totalCredits}</span>
                  </div>
                  <div className="gen-data-item">
                    <span className="gen-data-label">Tuition</span>
                    <span className="gen-data-value">{config.tuitionFlat || studentData.tuition}</span>
                  </div>
                </div>
              </div>

              {/* Inline Preview (small scale) */}
              <div className="gen-preview-section">
                <h4>Schedule Preview</h4>
                <div className="gen-preview-wrapper">
                  <div className="gen-preview-frame" style={{ width: '495px', height: '275px' }}>
                    <div style={{ transform: 'scale(0.45)', transformOrigin: 'top left', width: '1100px' }}>
                      <ScheduleTemplate config={config} studentData={studentData} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="gen-preview-section">
                <h4>ID Card Preview</h4>
                <div className="gen-preview-wrapper">
                  <div className="gen-preview-frame" style={{ height: '385px', width: '312px', padding: '16px', background: '#f8fafc' }}>
                    <div style={{ transform: 'scale(0.7)', transformOrigin: 'top left', width: '400px' }}>
                      <IdCardTemplate config={config} studentData={studentData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden Render Containers (off-screen, used by html2canvas) */}
      <div
        style={{
          position: 'fixed',
          left: '-9999px',
          top: 0,
          zIndex: -1,
          pointerEvents: 'none',
        }}
      >
        {studentData && (
          <>
            <div ref={scheduleRef} style={{ display: 'inline-block' }}>
              <ScheduleTemplate config={config} studentData={studentData} />
            </div>
            <div ref={idCardRef} style={{ display: 'inline-block' }}>
              <IdCardTemplate config={config} studentData={studentData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
