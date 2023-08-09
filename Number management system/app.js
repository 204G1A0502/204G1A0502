import React, { useState, useEffect } from 'react';

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9', // Light gray background color
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333', // Dark text color
  },
  form: {
    marginBottom: '20px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '10px',
  },
  result: {
    padding: '10px',
    backgroundColor: '#fff', // White background color for results
    border: '1px solid #ccc',
    borderRadius: '5px',
    overflowWrap: 'break-word',
    lineHeight: '1.5',
  },
};

function NumberManagementService() {
  const [mergedNumbers, setMergedNumbers] = useState([]);
  const [inputUrls, setInputUrls] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const urls = inputUrls.split('\n').filter((url) => url.trim() !== '');
    fetchNumbers(urls);
  };

  async function fetchNumbers(urls) {
    try {
      const promises = urls.map(async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data.numbers;
      });

      const numbersArrays = await Promise.all(promises);
      const merged = numbersArrays
        .flat()
        .filter((num, index, arr) => arr.indexOf(num) === index)
        .sort((a, b) => a - b);
      setMergedNumbers(merged);
      setError('');
    } catch (error) {
      console.error('Error fetching numbers:', error);
      setError('An error occurred while fetching numbers.');
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Number Management</h1>
      <form style={styles.form} onSubmit={handleSubmit}>
        <textarea
          style={styles.textarea}
          value={inputUrls}
          onChange={(e) => setInputUrls(e.target.value)}
          placeholder="Enter URLs, one per line"
          rows={4}
        />
        <button
          style={styles.button}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = styles.button.backgroundColor)
          }
          type="submit"
        >
          Fetch Numbers
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      <p style={styles.result}>{JSON.stringify({ numbers: mergedNumbers })}</p>
    </div>
  );
}

export default NumberManagementService;
