/**
 * CARRY by OTZARI — Google Sheets backend
 *
 * Deploy:
 *   1. Open the sheet → Extensions → Apps Script
 *   2. Paste this entire file into Code.gs (replace existing)
 *   3. Deploy → New deployment → type "Web app"
 *      - Execute as: Me
 *      - Who has access: Anyone
 *   4. Copy the /exec URL and paste into src/lib/sheets.ts (SHEETS_API_URL)
 *
 * On first run the script auto-creates the tabs with the right headers.
 */

const SHEET_ID = '1ydRYMkotT9--QxEH-ns8-jkBQ9vDmvZokZna01iQ2lg';

const SCHEMAS = {
  Deliveries: ['id','createdAt','pickup','dropoff','itemType','urgency','weight','price','status','requesterName','carrierId','notes'],
  Routes:     ['id','createdAt','carrierName','carrierId','from','to','schedule','status','rating'],
  Users:      ['id','createdAt','name','phone','emiratesIdVerified','rating','trips'],
  Matches:    ['id','createdAt','deliveryId','routeId','score','status'],
};

function _ss() { return SpreadsheetApp.openById(SHEET_ID); }

function _sheet(name) {
  const ss = _ss();
  let sh = ss.getSheetByName(name);
  const headers = SCHEMAS[name];
  if (!headers) throw new Error('Unknown sheet: ' + name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.getRange(1,1,1,headers.length).setValues([headers]).setFontWeight('bold');
  } else if (sh.getLastRow() === 0) {
    sh.getRange(1,1,1,headers.length).setValues([headers]).setFontWeight('bold');
  }
  return sh;
}

function _rows(name) {
  const sh = _sheet(name);
  const headers = SCHEMAS[name];
  const last = sh.getLastRow();
  if (last < 2) return [];
  const values = sh.getRange(2,1,last-1,headers.length).getValues();
  return values.map(row => {
    const o = {};
    headers.forEach((h,i) => o[h] = row[i]);
    return o;
  }).filter(o => o.id);
}

function _append(name, obj) {
  const sh = _sheet(name);
  const headers = SCHEMAS[name];
  if (!obj.id) obj.id = Utilities.getUuid();
  if (!obj.createdAt) obj.createdAt = new Date().toISOString();
  const row = headers.map(h => obj[h] ?? '');
  sh.appendRow(row);
  return obj;
}

function _json(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  try {
    const p = e.parameter || {};
    const action = p.action || 'list';
    const sheet = p.sheet;
    if (action === 'list') {
      return _json({ ok: true, rows: _rows(sheet) });
    }
    if (action === 'search') {
      const q = (p.q || '').toString().toLowerCase();
      const from = (p.from || '').toString().toLowerCase();
      const to = (p.to || '').toString().toLowerCase();
      const rows = _rows(sheet).filter(r => {
        const blob = Object.values(r).join(' ').toLowerCase();
        if (q && blob.indexOf(q) === -1) return false;
        if (from && (r.from || '').toString().toLowerCase().indexOf(from) === -1) return false;
        if (to && (r.to || '').toString().toLowerCase().indexOf(to) === -1) return false;
        return true;
      });
      return _json({ ok: true, rows });
    }
    if (action === 'match') {
      // Match a delivery's pickup/dropoff against active Routes
      const pickup = (p.pickup || '').toString().toLowerCase();
      const dropoff = (p.dropoff || '').toString().toLowerCase();
      const routes = _rows('Routes');
      const scored = routes.map(r => {
        const f = (r.from||'').toString().toLowerCase();
        const t = (r.to||'').toString().toLowerCase();
        let score = 0;
        if (pickup && (f.indexOf(pickup) !== -1 || pickup.indexOf(f) !== -1)) score += 50;
        if (dropoff && (t.indexOf(dropoff) !== -1 || dropoff.indexOf(t) !== -1)) score += 50;
        return { ...r, score };
      }).filter(r => r.score > 0).sort((a,b) => b.score - a.score);
      return _json({ ok: true, rows: scored });
    }
    return _json({ ok: false, error: 'Unknown action: ' + action });
  } catch (err) {
    return _json({ ok: false, error: String(err) });
  }
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    const action = body.action || 'create';
    if (action === 'create') {
      const saved = _append(body.sheet, body.data || {});
      return _json({ ok: true, row: saved });
    }
    return _json({ ok: false, error: 'Unknown action: ' + action });
  } catch (err) {
    return _json({ ok: false, error: String(err) });
  }
}

// Run once manually to seed example rows.
function seed() {
  _append('Routes', { carrierName:'Sarah J.', carrierId:'u_sarah', from:'Abu Dhabi', to:'Dubai Internet City', schedule:'Weekdays 17:30', status:'active', rating:4.98 });
  _append('Routes', { carrierName:'Omar H.',  carrierId:'u_omar',  from:'Dubai Marina', to:'DIFC', schedule:'Daily 08:15', status:'active', rating:4.92 });
  _append('Routes', { carrierName:'Layla A.', carrierId:'u_layla', from:'Sharjah', to:'Business Bay', schedule:'Weekdays 09:00', status:'active', rating:4.88 });
  _append('Routes', { carrierName:'Ahmed K.', carrierId:'u_ahmed', from:'Ajman', to:'Dubai', schedule:'Mon/Wed/Fri 07:30', status:'active', rating:4.81 });
}