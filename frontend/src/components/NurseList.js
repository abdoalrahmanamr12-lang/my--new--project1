import React from 'react';
import { createRequest } from '../api';

export default function NurseList({ results = [], summary = '', patientLoc }) {
  async function requestNurse(nurse) {
    const payload = {
      patientName: 'Anonymous',
      patientAge: 0,
      patientAddress: '',
      patientCoordinates: patientLoc,
      requestedWhen: nurse.nurse.availability ? nurse.nurse.availability[0] : new Date().toISOString(),
      nurseId: nurse.nurse._id
    };
    try {
      const res = await createRequest(payload);
      alert('Request created (demo). Server response: ' + (res.ok ? 'ok' : JSON.stringify(res)));
    } catch (e) {
      console.error(e);
      alert('Request failed');
    }
  }

  return (
    <section style={{ background:'#fff', padding:18, borderRadius:10 }}>
      <h3>Available nurses</h3>
      <p style={{color:'#666'}}>{summary}</p>
      {results.length === 0 && <p style={{color:'#666'}}>No nurses yet — perform a search above.</p>}
      <ul style={{listStyle:'none', padding:0, margin:0, display:'grid', gap:10}}>
        {results.map(r => (
          <li key={r.nurse._id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:10, border:'1px solid #eef2ff', borderRadius:8}}>
            <div>
              <div style={{fontWeight:700}}>{r.nurse.name}</div>
              <div style={{color:'#666'}}>{(r.nurse.specialties || []).join(', ')} • {r.distanceKm?.toFixed(1)} km</div>
            </div>
            <div>
              <button onClick={() => requestNurse(r)}>Request nurse</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
