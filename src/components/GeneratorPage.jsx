import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Loader2,
  Zap,
  Download,
  Eye,
  FileBadge,
  Image as ImageIcon,
  CheckCircle2,
  X,
  Calendar,
  CreditCard,
  Receipt
} from 'lucide-react';
import templates from '../templates';
import { buildStudentData } from '../utils/generators';
import { generateStudentQR } from '../utils/qrGenerator';
import { downloadElementAsImage, downloadElementAsPDF } from '../utils/exportImage';
import ScheduleTemplate from '../templates/ScheduleTemplate';
import IdCardTemplate from '../templates/IdCardTemplate';
import TuitionReceiptTemplate from '../templates/TuitionReceiptTemplate';

/**
 * Generator Page — Form + responsive preview with tabs + high-resolution download actions.
 */
export default function GeneratorPage() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const config = templates[templateId];

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [useCustomEmail, setUseCustomEmail] = useState(false);
  const [customEmail, setCustomEmail] = useState('');
  const [customStudentId, setCustomStudentId] = useState('');
  const [customTechId, setCustomTechId] = useState('');
  const [customDob, setCustomDob] = useState('');
  const [termOption, setTermOption] = useState('auto');
  const [majorKey, setMajorKey] = useState('');
  const [photoUrl, setPhotoUrl] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Tab selection: 'schedule' | 'receipt' | 'idcard'
  const [activeTab, setActiveTab] = useState('schedule');

  // Download states
  const [downloadingSheerId, setDownloadingSheerId] = useState(false);
  const [downloadingSheerIdHD, setDownloadingSheerIdHD] = useState(false);
  const [downloadingSchedule, setDownloadingSchedule] = useState(false);
  const [downloadingSchedulePDF, setDownloadingSchedulePDF] = useState(false);
  const [downloadingCard, setDownloadingCard] = useState(false);
  const [downloadingCardPDF, setDownloadingCardPDF] = useState(false);
  const [downloadingReceipt, setDownloadingReceipt] = useState(false);
  const [downloadingReceiptPDF, setDownloadingReceiptPDF] = useState(false);

  // Zoom control: 'fit', '50', '75', '100'
  const [scheduleZoom, setScheduleZoom] = useState('fit');
  const [fitScale, setFitScale] = useState(0.5);
  const [receiptZoom, setReceiptZoom] = useState('fit');
  const [receiptFitScale, setReceiptFitScale] = useState(0.65);

  const previewContainerRef = useRef(null);
  const receiptPreviewContainerRef = useRef(null);
  const scheduleSheerIdRef = useRef(null);
  const scheduleFullRef = useRef(null);
  const idCardRef = useRef(null);
  const tuitionReceiptRef = useRef(null);

  // Set default major when config loads
  useEffect(() => {
    if (config && !majorKey) {
      setMajorKey(Object.keys(config.majors)[0]);
    }
  }, [config, majorKey]);

  // Dynamically calculate scale factor to fit full 1024px schedule inside results panel
  useEffect(() => {
    if (!previewContainerRef.current) return;
    const updateScale = () => {
      if (previewContainerRef.current) {
        const w = previewContainerRef.current.clientWidth;
        if (w > 0) {
          setFitScale(Math.min(1, Math.max(0.25, (w - 20) / 1024)));
        }
      }
    };
    updateScale();
    const obs = new ResizeObserver(updateScale);
    obs.observe(previewContainerRef.current);
    return () => obs.disconnect();
  }, [studentData, activeTab]);

  // Dynamically calculate scale factor to fit full 840px tuition receipt inside results panel
  useEffect(() => {
    if (!receiptPreviewContainerRef.current) return;
    const updateScale = () => {
      if (receiptPreviewContainerRef.current) {
        const w = receiptPreviewContainerRef.current.clientWidth;
        if (w > 0) {
          setReceiptFitScale(Math.min(1, Math.max(0.25, (w - 32) / 820)));
        }
      }
    };
    updateScale();
    const obs = new ResizeObserver(updateScale);
    obs.observe(receiptPreviewContainerRef.current);
    return () => obs.disconnect();
  }, [studentData, activeTab]);

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
      const data = buildStudentData(
        firstName.trim(),
        lastName.trim(),
        email,
        photoUrl,
        config,
        majorKey,
        customStudentId,
        customTechId,
        customDob.trim() || null,
        termOption
      );
      
      const qrDataUrl = await generateStudentQR(data, config);
      data.qrDataUrl = qrDataUrl;

      setStudentData(data);
      setIsGenerating(false);
    }, 450);
  };

  const handleDownloadSheerIDSchedule = async () => {
    if (!scheduleSheerIdRef.current) return;
    setDownloadingSheerId(true);
    try {
      const filename = `${firstName}_${lastName}_${config.shortName}_Schedule_SheerID_1024x500`.replace(/\s+/g, '_');
      await downloadElementAsImage(scheduleSheerIdRef.current, filename, {
        scale: 1,
        backgroundColor: '#f0f3f7',
        width: 1024,
        height: 500,
        windowWidth: 1024,
        windowHeight: 500
      });
    } catch (err) {
      console.error('Download failed:', err);
    }
    setDownloadingSheerId(false);
  };

  const handleDownloadSheerIDScheduleHD = async () => {
    if (!scheduleSheerIdRef.current) return;
    setDownloadingSheerIdHD(true);
    try {
      const filename = `${firstName}_${lastName}_${config.shortName}_Schedule_HD_2048x1000`.replace(/\s+/g, '_');
      await downloadElementAsImage(scheduleSheerIdRef.current, filename, {
        scale: 2,
        backgroundColor: '#f0f3f7',
        width: 1024,
        height: 500,
        windowWidth: 1024,
        windowHeight: 500
      });
    } catch (err) {
      console.error('Download failed:', err);
    }
    setDownloadingSheerIdHD(false);
  };

  const handleDownloadSchedule = async () => {
    if (!scheduleFullRef.current) return;
    setDownloadingSchedule(true);
    try {
      const filename = `${firstName}_${lastName}_${config.shortName}_Full_Schedule`.replace(/\s+/g, '_');
      await downloadElementAsImage(scheduleFullRef.current, filename, { backgroundColor: '#f0f3f7', scale: 2 });
    } catch (err) {
      console.error('Download failed:', err);
    }
    setDownloadingSchedule(false);
  };

  const handleDownloadSchedulePDF = async () => {
    if (!scheduleFullRef.current) return;
    setDownloadingSchedulePDF(true);
    try {
      const filename = `${firstName}_${lastName}_${config.shortName}_Schedule`.replace(/\s+/g, '_');
      await downloadElementAsPDF(scheduleFullRef.current, filename, { backgroundColor: '#f0f3f7' });
    } catch (err) {
      console.error('Download failed:', err);
    }
    setDownloadingSchedulePDF(false);
  };

  const handleDownloadCard = async () => {
    if (!idCardRef.current) return;
    setDownloadingCard(true);
    try {
      const filename = `${firstName}_${lastName}_${config.shortName}_ID_Card`.replace(/\s+/g, '_');
      await downloadElementAsImage(idCardRef.current, filename, { backgroundColor: '#f8fafc', scale: 2 });
    } catch (err) {
      console.error('Download failed:', err);
    }
    setDownloadingCard(false);
  };

  const handleDownloadCardPDF = async () => {
    if (!idCardRef.current) return;
    setDownloadingCardPDF(true);
    try {
      const filename = `${firstName}_${lastName}_${config.shortName}_ID_Card`.replace(/\s+/g, '_');
      await downloadElementAsPDF(idCardRef.current, filename, { backgroundColor: '#f8fafc' });
    } catch (err) {
      console.error('Download failed:', err);
    }
    setDownloadingCardPDF(false);
  };

  const handleDownloadReceipt = async () => {
    if (!tuitionReceiptRef.current) return;
    setDownloadingReceipt(true);
    try {
      const filename = `${firstName}_${lastName}_${config.shortName}_Tuition_Receipt`.replace(/\s+/g, '_');
      await downloadElementAsImage(tuitionReceiptRef.current, filename, { backgroundColor: '#ffffff', scale: 2 });
    } catch (err) {
      console.error('Download failed:', err);
    }
    setDownloadingReceipt(false);
  };

  const handleDownloadReceiptPDF = async () => {
    if (!tuitionReceiptRef.current) return;
    setDownloadingReceiptPDF(true);
    try {
      const filename = `${firstName}_${lastName}_${config.shortName}_Tuition_Receipt`.replace(/\s+/g, '_');
      await downloadElementAsPDF(tuitionReceiptRef.current, filename, { backgroundColor: '#ffffff' });
    } catch (err) {
      console.error('Download failed:', err);
    }
    setDownloadingReceiptPDF(false);
  };

  const handleViewFullPage = () => {
    const win = window.open('', '_blank');
    if (!win || !scheduleSheerIdRef.current) return;
    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${studentData.fullName} - ${config.name} Schedule</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=1024, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@500;600;700;800;900&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            margin: 0;
            padding: 24px;
            background: #cbd5e1;
            display: flex;
            justify-content: center;
            font-family: 'Inter', sans-serif;
          }
          .schedule-container {
            width: 1024px;
            height: 500px;
            overflow: hidden;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
            background: #f0f3f7;
          }
        </style>
      </head>
      <body>
        <div class="schedule-container">${scheduleSheerIdRef.current.innerHTML}</div>
      </body>
      </html>
    `);
    win.document.close();
  };

  const handleViewReceiptInTab = () => {
    const win = window.open('', '_blank');
    if (!win || !tuitionReceiptRef.current) return;
    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${studentData.fullName} - ${config.name} Tuition Receipt</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@500;600;700;800;900&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            margin: 0;
            padding: 30px;
            background: #cbd5e1;
            display: flex;
            justify-content: center;
            font-family: 'Inter', sans-serif;
          }
        </style>
      </head>
      <body>
        <div>${tuitionReceiptRef.current.innerHTML}</div>
      </body>
      </html>
    `);
    win.document.close();
  };

  const majorOptions = Object.entries(config.majors);
  const generatedEmail = firstName && lastName
    ? `${firstName.toLowerCase().replace(/[^a-z]/g, '')}.${lastName.toLowerCase().replace(/[^a-z]/g, '')}@${config.emailDomain}`
    : '';

  const currentScale = scheduleZoom === 'fit' ? fitScale : parseInt(scheduleZoom, 10) / 100;
  const currentReceiptScale = receiptZoom === 'fit' ? receiptFitScale : parseInt(receiptZoom, 10) / 100;

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
              Fill in your details below. The schedule matrix, enrollment verification, and ID card will be created automatically.
            </p>

            {/* Name Fields */}
            <div className="gen-field-row">
              <div className="gen-field">
                <label>First Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Colin"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="gen-input"
                />
              </div>
              <div className="gen-field">
                <label>Last Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Roskos"
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

            {/* Academic Term & Date of Birth */}
            <div className="gen-field-row">
              <div className="gen-field">
                <label>Academic Term / Período</label>
                <select
                  value={termOption}
                  onChange={(e) => setTermOption(e.target.value)}
                  className="gen-select"
                >
                  <option value="auto">Auto (Current Semester)</option>
                  <option value="fall">Fall Semester (Otoño)</option>
                  <option value="spring">Spring Semester (Primavera)</option>
                  <option value="summer">Summer Term (Verano)</option>
                  {config.term && <option value="template">Template Default ({config.term})</option>}
                </select>
              </div>
              <div className="gen-field">
                <label>Date of Birth (Optional)</label>
                <input
                  type="date"
                  value={customDob}
                  onChange={(e) => setCustomDob(e.target.value)}
                  className="gen-input"
                  title="Leave empty to auto-generate age (20-22)"
                />
                <span className="gen-field-hint">Auto-generates age (20-22) if blank</span>
              </div>
            </div>

            {/* Custom IDs */}
            <div className="gen-field-row">
              <div className="gen-field">
                <label>{config.idLabel} (Optional)</label>
                <input
                  type="text"
                  placeholder={`Auto (e.g. ${config.idFormat === 'starId' ? 'cr4827rx' : '12345678'})`}
                  value={customStudentId}
                  onChange={(e) => setCustomStudentId(e.target.value)}
                  className="gen-input"
                />
              </div>
              <div className="gen-field">
                <label>{config.secondaryIdLabel} (Optional)</label>
                <input
                  type="text"
                  placeholder="Auto (e.g. 10384726)"
                  value={customTechId}
                  onChange={(e) => setCustomTechId(e.target.value)}
                  className="gen-input"
                />
              </div>
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
                <><Zap size={16} /> Generate All Student Documents</>
              )}
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="gen-results-panel">
          {!studentData ? (
            <div className="gen-placeholder">
              <FileBadge size={48} className="gen-placeholder-icon" strokeWidth={1.5} />
              <h3>Your documents preview will appear here</h3>
              <p>Fill in your name on the left and click "Generate All Student Documents" to create your schedule, receipt, and verified ID card.</p>
            </div>
          ) : (
            <div className="gen-results">
              <h3 className="gen-results-title">
                <CheckCircle2 size={20} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px', marginTop: '-2px' }} />
                Generated Successfully
              </h3>
              <p className="gen-results-desc">
                Your {config.shortName} schedule, tuition receipt, and verified student ID card are ready. Download high-resolution images or vector PDFs.
              </p>

              {/* Document Download Center (Organized by Document Type) */}
              <div className="gen-downloads-container">
                {/* 1. Comprobante de Matrícula */}
                <div className="gen-doc-card doc-receipt">
                  <div className="gen-doc-card-header">
                    <div className="gen-doc-card-icon" style={{ background: '#059669' }}>
                      <Receipt size={18} color="#ffffff" />
                    </div>
                    <div className="gen-doc-card-info">
                      <div className="gen-doc-card-title-row">
                        <h4 className="gen-doc-card-title">1. Comprobante de Matrícula (Tuition Receipt)</h4>
                        <span className="gen-doc-badge badge-official">Recomendado Verificación Manual</span>
                      </div>
                      <p className="gen-doc-card-desc">
                        Recibo oficial de inscripción y aranceles emitido por la tesorería universitaria, con balance $0.00 USD y sello institucional.
                      </p>
                    </div>
                  </div>
                  <div className="gen-doc-card-actions">
                    <button
                      onClick={handleDownloadReceipt}
                      disabled={downloadingReceipt}
                      className="gen-action-btn btn-receipt"
                    >
                      {downloadingReceipt ? <Loader2 className="gen-spinner" size={13} /> : <Download size={13} />}
                      <span>Descargar Recibo (JPG 2x)</span>
                    </button>
                    <button
                      onClick={handleDownloadReceiptPDF}
                      disabled={downloadingReceiptPDF}
                      className="gen-action-btn btn-secondary"
                    >
                      {downloadingReceiptPDF ? <Loader2 className="gen-spinner" size={13} /> : <Download size={13} />}
                      <span>Descargar PDF Oficial</span>
                    </button>
                  </div>
                </div>

                {/* 2. Horario de Clases */}
                <div className="gen-doc-card doc-schedule">
                  <div className="gen-doc-card-header">
                    <div className="gen-doc-card-icon" style={{ background: config.colors.primary }}>
                      <Calendar size={18} color="#ffffff" />
                    </div>
                    <div className="gen-doc-card-info">
                      <div className="gen-doc-card-title-row">
                        <h4 className="gen-doc-card-title">2. Horario de Clases (Schedule Portal)</h4>
                        <span className="gen-doc-badge badge-sheerid">Formato Exacto SheerID</span>
                      </div>
                      <p className="gen-doc-card-desc">
                        Captura del portal universitario con el cronograma semanal de clases (1024×500) preparado para aprobación automática SheerID.
                      </p>
                    </div>
                  </div>
                  <div className="gen-doc-card-actions">
                    <button
                      onClick={handleDownloadSheerIDSchedule}
                      disabled={downloadingSheerId}
                      className="gen-action-btn btn-sheerid"
                    >
                      {downloadingSheerId ? <Loader2 className="gen-spinner" size={13} /> : <Download size={13} />}
                      <span>SheerID 1024×500 (JPG)</span>
                    </button>
                    <button
                      onClick={handleDownloadSheerIDScheduleHD}
                      disabled={downloadingSheerIdHD}
                      className="gen-action-btn btn-secondary"
                    >
                      {downloadingSheerIdHD ? <Loader2 className="gen-spinner" size={13} /> : <Download size={13} />}
                      <span>Versión HD 2048×1000</span>
                    </button>
                    <button
                      onClick={handleDownloadSchedulePDF}
                      disabled={downloadingSchedulePDF}
                      className="gen-action-btn btn-secondary"
                    >
                      {downloadingSchedulePDF ? <Loader2 className="gen-spinner" size={13} /> : <Download size={13} />}
                      <span>Horario en PDF</span>
                    </button>
                    <button
                      onClick={handleDownloadSchedule}
                      disabled={downloadingSchedule}
                      className="gen-action-btn btn-secondary"
                    >
                      {downloadingSchedule ? <Loader2 className="gen-spinner" size={13} /> : <Download size={13} />}
                      <span>Horario Completo (JPG)</span>
                    </button>
                  </div>
                </div>

                {/* 3. Carné de Estudiante */}
                <div className="gen-doc-card doc-idcard">
                  <div className="gen-doc-card-header">
                    <div className="gen-doc-card-icon" style={{ background: '#1e293b' }}>
                      <CreditCard size={18} color="#ffffff" />
                    </div>
                    <div className="gen-doc-card-info">
                      <div className="gen-doc-card-title-row">
                        <h4 className="gen-doc-card-title">3. Carné de Estudiante (Student ID Card)</h4>
                        <span className="gen-doc-badge badge-id">Foto &amp; QR</span>
                      </div>
                      <p className="gen-doc-card-desc">
                        Credencial universitaria oficial con fotografía, fecha de nacimiento (DOB), vigencia académica y código de barras.
                      </p>
                    </div>
                  </div>
                  <div className="gen-doc-card-actions">
                    <button
                      onClick={handleDownloadCard}
                      disabled={downloadingCard}
                      className="gen-action-btn btn-primary"
                    >
                      {downloadingCard ? <Loader2 className="gen-spinner" size={13} /> : <Download size={13} />}
                      <span>Descargar Carné (JPG)</span>
                    </button>
                    <button
                      onClick={handleDownloadCardPDF}
                      disabled={downloadingCardPDF}
                      className="gen-action-btn btn-secondary"
                    >
                      {downloadingCardPDF ? <Loader2 className="gen-spinner" size={13} /> : <Download size={13} />}
                      <span>Descargar Carné (PDF)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Auto-generated Data Summary */}
              <div className="gen-data-summary">
                <h4>Auto-Generated Data & IDs</h4>
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
                    <span className="gen-data-label">Date of Birth</span>
                    <span className="gen-data-value">{studentData.dobShort}</span>
                  </div>
                  <div className="gen-data-item">
                    <span className="gen-data-label">Receipt #</span>
                    <span className="gen-data-value">{studentData.receiptNumber}</span>
                  </div>
                  <div className="gen-data-item">
                    <span className="gen-data-label">Academic Term</span>
                    <span className="gen-data-value">{studentData.term}</span>
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
                  <div className="gen-data-item">
                    <span className="gen-data-label">Account Balance</span>
                    <span className="gen-data-value" style={{ color: '#34d399' }}>{studentData.balanceDue}</span>
                  </div>
                </div>
              </div>

              {/* Preview Tabs Selector */}
              <div className="gen-preview-section">
                <div className="gen-preview-tabs">
                  <button
                    onClick={() => setActiveTab('schedule')}
                    className={`gen-preview-tab ${activeTab === 'schedule' ? 'active' : ''}`}
                    style={activeTab === 'schedule' ? { borderColor: config.colors.primary } : {}}
                  >
                    <Calendar size={15} />
                    <span>Horario (Schedule)</span>
                    <span className="gen-tab-pill">SheerID 1024x500</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('receipt')}
                    className={`gen-preview-tab ${activeTab === 'receipt' ? 'active' : ''}`}
                    style={activeTab === 'receipt' ? { borderColor: '#10b981' } : {}}
                  >
                    <Receipt size={15} />
                    <span>Comprobante Matrícula</span>
                    <span className="gen-tab-pill">Oficial $0.00</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('idcard')}
                    className={`gen-preview-tab ${activeTab === 'idcard' ? 'active' : ''}`}
                    style={activeTab === 'idcard' ? { borderColor: config.colors.accent || '#f59e0b' } : {}}
                  >
                    <CreditCard size={15} />
                    <span>Carné (ID Card)</span>
                    <span className="gen-tab-pill">Foto & QR</span>
                  </button>
                </div>

                {/* Tab Content: Schedule */}
                {activeTab === 'schedule' && (
                  <div ref={previewContainerRef}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <h4>Schedule Portal Preview (SheerID 1024x500 Format)</h4>
                      <div className="preview-zoom-bar">
                        {['fit', '50', '75', '100'].map((lvl) => (
                          <button
                            key={lvl}
                            onClick={() => setScheduleZoom(lvl)}
                            className={`zoom-btn ${scheduleZoom === lvl ? 'active' : ''}`}
                          >
                            {lvl === 'fit' ? 'Auto-Fit' : `${lvl}%`}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div
                      style={{
                        background: '#0f172a',
                        borderRadius: '10px',
                        border: '1px solid #334155',
                        overflow: 'hidden',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.25)'
                      }}
                    >
                      {/* Browser Mockup Chrome Header */}
                      <div
                        style={{
                          padding: '8px 14px',
                          background: '#1e293b',
                          borderBottom: '1px solid #334155',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}
                      >
                        <div style={{ display: 'flex', gap: '5px' }}>
                          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                        </div>
                        <div
                          style={{
                            flex: 1,
                            maxWidth: '380px',
                            margin: '0 auto',
                            background: '#0f172a',
                            borderRadius: '4px',
                            padding: '4px 12px',
                            fontSize: '11px',
                            color: '#94a3b8',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                          }}
                        >
                          <span style={{ color: '#10b981', fontSize: '10px' }}>🔒</span>
                          https://portal.{config.emailDomain}/student/view-schedule
                        </div>
                      </div>

                      {/* Scaled Schedule Viewport */}
                      <div
                        style={{
                          overflow: 'auto',
                          background: '#f0f3f7',
                          padding: '12px',
                          display: 'flex',
                          justifyContent: scheduleZoom === 'fit' ? 'center' : 'flex-start'
                        }}
                      >
                        <div
                          style={{
                            transform: `scale(${currentScale})`,
                            transformOrigin: 'top center',
                            width: '1024px',
                            height: '500px',
                            marginBottom: scheduleZoom === 'fit' ? `calc(-500px * (1 - ${currentScale}))` : '0px'
                          }}
                        >
                          <ScheduleTemplate config={config} studentData={studentData} mode="sheerid" />
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: '12px' }}>
                      <button onClick={handleViewFullPage} className="gen-btn gen-btn-secondary">
                        <Eye size={14} /> Open Exact 1024x500 View in New Tab
                      </button>
                    </div>
                  </div>
                )}

                {/* Tab Content: Tuition Receipt */}
                {activeTab === 'receipt' && (
                  <div ref={receiptPreviewContainerRef}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <h4>Tuition Billing Statement & Enrollment Verification</h4>
                      <div className="preview-zoom-bar">
                        {['fit', '50', '75', '100'].map((lvl) => (
                          <button
                            key={lvl}
                            onClick={() => setReceiptZoom(lvl)}
                            className={`zoom-btn ${receiptZoom === lvl ? 'active' : ''}`}
                          >
                            {lvl === 'fit' ? 'Auto-Fit' : `${lvl}%`}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div
                      style={{
                        background: '#1e293b',
                        borderRadius: '10px',
                        border: '1px solid #334155',
                        overflow: 'auto',
                        padding: '20px 14px',
                        display: 'flex',
                        justifyContent: receiptZoom === 'fit' ? 'center' : 'flex-start',
                        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)'
                      }}
                    >
                      <div
                        style={{
                          transform: `scale(${currentReceiptScale})`,
                          transformOrigin: 'top center',
                          width: '820px',
                          marginBottom: receiptZoom === 'fit' ? `calc(-1060px * (1 - ${currentReceiptScale}))` : '0px'
                        }}
                      >
                        <TuitionReceiptTemplate config={config} studentData={studentData} />
                      </div>
                    </div>

                    <div style={{ marginTop: '12px' }}>
                      <button onClick={handleViewReceiptInTab} className="gen-btn gen-btn-secondary">
                        <Eye size={14} /> Open Official Receipt in New Tab
                      </button>
                    </div>
                  </div>
                )}

                {/* Tab Content: Student ID Card */}
                {activeTab === 'idcard' && (
                  <div>
                    <h4 style={{ marginBottom: '10px' }}>Verified Student ID Card Preview</h4>
                    <div className="gen-preview-wrapper" style={{ display: 'flex', justifyContent: 'center' }}>
                      <div style={{ padding: '20px', background: '#0f172a', borderRadius: '12px', border: '1px solid #334155', boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}>
                        <IdCardTemplate config={config} studentData={studentData} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden Render Containers (off-screen, used by html2canvas for 100% full-resolution capture) */}
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
            <div
              ref={scheduleSheerIdRef}
              style={{
                width: '1024px',
                height: '500px',
                overflow: 'hidden',
                background: '#f0f3f7',
                boxSizing: 'border-box'
              }}
            >
              <ScheduleTemplate config={config} studentData={studentData} mode="sheerid" />
            </div>

            <div
              ref={scheduleFullRef}
              style={{
                width: '1024px',
                background: '#f0f3f7',
                boxSizing: 'border-box'
              }}
            >
              <ScheduleTemplate config={config} studentData={studentData} mode="full" />
            </div>

            <div
              ref={idCardRef}
              style={{
                display: 'inline-block',
                padding: '24px',
                background: '#f8fafc',
                boxSizing: 'border-box'
              }}
            >
              <IdCardTemplate config={config} studentData={studentData} />
            </div>

            <div
              ref={tuitionReceiptRef}
              style={{
                width: '820px',
                background: '#ffffff',
                boxSizing: 'border-box'
              }}
            >
              <TuitionReceiptTemplate config={config} studentData={studentData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
