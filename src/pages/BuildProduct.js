import React from 'react';
import Editor from "@monaco-editor/react";

const CodeEditorWithPreview = () => {
  const previewRef = React.useRef(null);

  const defaultCode = `<!DOCTYPE html>
<html>
<head>
  <title>Live Preview</title>
  <style>
    body { font-family: Arial; background: #f0f0f0; }
    h1 { color: #333; }
  </style>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>Edit the code to see changes!</p>
</body>
</html>`;

  function handleEditorChange(value) {
    previewRef.current.srcdoc = value;
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Editor
        height="100%"
        width="50%"
        defaultLanguage="html"
        defaultValue={defaultCode}
        theme="vs-dark"
        onChange={handleEditorChange}
        options={{ automaticLayout: true }}
      />
      <iframe 
        ref={previewRef} 
        style={{ width: '50%', height: '100%', border: 'none'}} 
        title="Live Preview"
      ></iframe>
    </div>
  );
};

export default CodeEditorWithPreview;
