import React, { useState } from 'react';

const loremIpsumText = 
 `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, 
  nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula.
  Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam.
  Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque.
  Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat.
`;

const generateWords = (num) => {
  const words = loremIpsumText.split(/\s+/);
  let result = [];
  for (let i = 0; i < num; i++) {
    result.push(words[i % words.length]);
  }
  return result.join(' ');
}

const generateCharacters = (num) => {
  let result = '';
  while (result.length < num) {
    result += loremIpsumText[result.length % loremIpsumText.length];
  }
  return result.substring(0, num);
}

const generateParagraphs = (num) => {
  const paragraphs = loremIpsumText;
  let result = [];
  for (let i = 0; i < num; i++) {
    result.push(paragraphs); 
  }
  return result;
}

const LoremIpsumText = () => {
  const [option, setOption] = useState('paragraphs');
  const [count, setCount] = useState(3);
  const [content, setContent] = useState(generateParagraphs(3));

  const handleChange = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      return;
    }
    const num = value === '' ? '' : parseInt(value, 10);
    setCount(num);
    if (value === '' || isNaN(num) || num <= 0) {
      setContent([]);
      return;
    }
    if (option === 'words') {
      setContent([generateWords(num)]);
    } else if (option === 'characters') {
      setContent([generateCharacters(num)]);
    } else if (option === 'paragraphs') {
      setContent(generateParagraphs(num));
    }
  }

  const handleOptionChange = (e) => {
    const newOption = e.target.value;
    setOption(newOption);
    const num = isNaN(count) || count <= 0 ? 0 : count;
    if (num <= 0) {
      setContent([]);
      return;
    }
    if (newOption === 'words') {
      setContent([generateWords(num)]);
    } else if (newOption === 'characters') {
      setContent([generateCharacters(num)]);
    } else if (newOption === 'paragraphs') {
      setContent(generateParagraphs(num));
    }
  }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(content.join('\n\n'));
    alert('Text copied');
  }

  return (
    <div className="lorem-container container mt-5 px-5">
      <h1 className="mb-4">Lorem Ipsum Generator</h1>
      <div className="lorem-controls form-group">
        <label className="mx-3">
          <input type="radio" value="words" checked={option === 'words'} onChange={handleOptionChange} />
          Words
        </label>
        <label className="mx-3">
          <input type="radio" value="characters" checked={option === 'characters'} onChange={handleOptionChange} />
          Characters
        </label>
        <label className="mx-3">
          <input type="radio" value="paragraphs" checked={option === 'paragraphs'} onChange={handleOptionChange} />
          Paragraphs
        </label>
        <input type="number" className="form-control" value={count}  onChange={handleChange}  min="1"   pattern="\d*" />
        <button className="btn btn-outline-secondary mx-3" onClick={handleCopyClick}>
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M18 3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1V9a4 4 0 0 0-4-4h-3a1.99 1.99 0 0 0-1 .267V5a2 2 0 0 1 2-2h7Z" clipRule="evenodd"/>
            <path fillRule="evenodd" d="M8 7.054V11H4.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 8 7.054ZM10 7v4a2 2 0 0 1-2 2H4v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z" clipRule="evenodd"/>
          </svg>
        </button>
      </div>
      <div className="lorem-content border p-2">
        {content.map((paragraph, index) => (
          <span key={index}>
            <p>
              {paragraph}
            </p>  
            <br></br>
          </span>
        ))}
      </div>
    </div>
  );
}

export default LoremIpsumText;

