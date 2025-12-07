import React, { useState } from 'react';
import { findNurses } from '../api';

export default function RequestForm({ onResults }) {
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [when, setWhen] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [status, setStatus] = useState('');

  async function geolocate() {
    if (!navigator.geolocation) { setStatus('Geolocation not supported'); return; }
    setStatus('Getting location...');
    navigator.geolocation.getCurrentPosition((p) => {
      setLat(p.coords.latitude.toFixed(6));
      setLon(p.coords.longitude.toFixed(6));
      setStatus('Location set');
    }, (e) => { setStatus('Permission denied or unavailable'); }, { enableHighAccuracy: true });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!when) { setStatus('Pick a visit time'); return; }
    if (!lat || !lon) { setStatus('Set patient coordinates (geolocate or enter manually)'); return; }
    setStatus('Finding nurses...');
    try {
      const data = await findNurses({ lat, lon, when });
      const list = data.data || [];
      setStatus(`${list.length} nurse(s) found`);
      onResults(list, `${list.length} nurse(s) available for ${when}`, { lat: parseFloat(lat), lon: parseFloat(lon) });
    } catch (err) {
      console.error(err);
      setStatus('Search failed');
    }
  }

  return (
    <section style={{ background:'#fff', padding:18, borderRadius:10, marginBottom:18 }}>
      <h2>Request a nurse to patient's home</h2>
      <p style={{color:'#666'}}>Enter patient info, pick a time, set location, and search for available nurses nearby.</p>
      <form onSubmit={handleSubmit}>
        <div style={{display:'grid', gap:8, marginBottom:8}}>
          <input placeholder="Patient name" value={patientName} onChange={e=>setPatientName(e.target.value)} required />
          <input type="number" placeholder="Age" value={age} onChange={e=>setAge(e.target.value)} required />
          <input placeholder="Residence (address)" value={address} onChange={e=>setAddress(e.target.value)} />
          <label>Requested visit time</label>
          <input type="datetime-local" value={when} onChange={e=>setWhen(e.target.value)} required />
          <div style={{display:'flex', gap:8}}>
            <button type="button" onClick={geolocate}>Use device location</button>
            <div style={{flex:1}}>
              <input placeholder="Latitude" value={lat} onChange={e=>setLat(e.target.value)} />
              <input placeholder="Longitude" value={lon} onChange={e=>setLon(e.target.value)} />
            </div>
          </div>
          <div>
            <button type="submit">Find available nurses</button>
          </div>
          <div style={{color:'#444'}}>{status}</div>
        </div>
      </form>
    </section>
  );
}
