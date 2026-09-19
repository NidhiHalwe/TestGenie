import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  const [sourceCode, setSourceCode] = useState('');
  const [generatedTests, setGeneratedTests] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateTests = async (event) => {
    event.preventDefault();

    if (!sourceCode.trim()) {
      setError('Paste some JavaScript code before generating tests.');
      setGeneratedTests('');
      return;
    }

    setIsLoading(true);
    setError('');
    setGeneratedTests('');

    try {
      const response = await fetch(`${API_URL}/api/generate-tests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: sourceCode }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'The server could not generate tests.');
      }

      setGeneratedTests(data.tests || 'No tests were returned.');
    } catch (requestError) {
      setError(requestError.message || 'Unable to reach the TestGenie backend.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="TestGenie home">
          <span className="brand-mark" aria-hidden="true">TG</span>
          <span>TestGenie</span>
        </a>
        <span className="status-pill"><span className="status-dot" /> Gemini-powered testing</span>
      </header>

      <section className="hero">
        <p className="eyebrow">AI test generation studio</p>
        <h1>Turn code into confidence.</h1>
        <p className="hero-copy">Drop in a JavaScript function and TestGenie will compose a thorough Jest suite for the edge cases hiding between the lines.</p>
      </section>

      <form className="workspace" onSubmit={handleGenerateTests}>
        <section className="panel input-panel" aria-labelledby="source-heading">
          <div className="panel-heading">
            <div>
              <p className="panel-kicker">01 / Source</p>
              <h2 id="source-heading">Your JavaScript</h2>
            </div>
            <span className="language-label">JS</span>
          </div>
          <textarea
            value={sourceCode}
            onChange={(event) => setSourceCode(event.target.value)}
            placeholder={'function calculateTotal(items) {\n  return items.reduce((sum, item) => sum + item.price, 0);\n}'}
            spellCheck="false"
            aria-label="JavaScript source code"
          />
          <div className="panel-footer">
            <span>{sourceCode.length} characters</span>
            <button className="generate-button" type="submit" disabled={isLoading}>
              {isLoading ? 'Evaluating code...' : 'Generate Unit Tests'}
              <span aria-hidden="true">{isLoading ? '...' : '->'}</span>
            </button>
          </div>
        </section>

        <section className="panel output-panel" aria-labelledby="output-heading">
          <div className="panel-heading">
            <div>
              <p className="panel-kicker">02 / Result</p>
              <h2 id="output-heading">Jest test suite</h2>
            </div>
            {generatedTests && <span className="ready-label">Ready</span>}
          </div>
          <div className={`code-output${generatedTests ? ' has-content' : ''}`}>
            {generatedTests ? (
              <pre><code>{generatedTests}</code></pre>
            ) : (
              <div className="empty-state">
                <span className="empty-icon" aria-hidden="true">{isLoading ? '...' : '{ }'}</span>
                <p>{isLoading ? 'Reading your code and mapping edge cases...' : 'Your generated suite will appear here.'}</p>
                <span>Raw Jest code, ready to use.</span>
              </div>
            )}
          </div>
          {error && <p className="error-message" role="alert">{error}</p>}
        </section>
      </form>

      <footer className="footer-note">Built for careful code. Review generated tests before shipping.</footer>
    </main>
  );
}

export default App;
