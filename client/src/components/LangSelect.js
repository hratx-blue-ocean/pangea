import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const LangSelect = props => {
  const [langs] = useState(['English', 'Spanish', 'Mandarin', 'Hindi', 'German', 'French']);
  const [selected, setSelected] = useState('Select Language');

  return (
    <Dropdown>
      <Dropdown.Toggle variant='success' >{selected}</Dropdown.Toggle>
      <Dropdown.Menu>
        {langs.map((lang, i) => {
          return (
            <Dropdown.Item 
              key={i} 
              onClick={() => {
                props.select(props.reason, lang);
                setSelected(lang);
              }}
            >
            {lang}
            </Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default LangSelect;

