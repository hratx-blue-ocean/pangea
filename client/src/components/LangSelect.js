import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

const LangSelect = props => {
  const [langs] = useState(['English', 'Spanish', 'Mandarin', 'Hindi', 'German', 'French']);
  const [selected, setSelected] = useState('Select Language');

  return (
    <div>
    </div>
    // {langs.map(lang => {return lang})}
  )
}

export default LangSelect;

