import React, { useState } from 'react';
import RequestForm from './components/RequestForm';
import NurseList from './components/NurseList';

export default function App() {
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState('');
  const [patientLoc, setPatientLoc] = useState(null);

  return (
    <div style={{maxWidth:920, margin:'0 auto'}}>
      <header style={{padding:'12px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1 style={{margin:0}}>NurseOnCall</h1>
        <nav>
          <a href="#" style={{marginRight:12}}>Request</a>
          <a href="#">Nurses</a>
        </nav>
      </header>

      <main>
        <RequestForm onResults={(r, s, loc) => { setResults(r); setSummary(s); setPatientLoc(loc); }} />
        <NurseList results={results} summary={summary} patientLoc={patientLoc} />
      </main>
    </div>
  );
}
