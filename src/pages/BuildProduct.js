import React, { useState, useCallback, useEffect } from 'react';
import Editor from "@monaco-editor/react";
import './BuildProduct.css';

const defaultCode = `<!DOCTYPE html>
<html>
<head>
  <title>Live Preview</title>
  <style>
    body { font-family: Arial; background: #f0f0f0; }
    h1 { color: #333; }
    .hover-container {
      transition: background-color 0.3s;
      cursor: pointer;
      padding: 8px;
      border-radius: 4px;
    }
    .hover-container:hover {
      background-color: #e0e0e0;
    }
  </style>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>Edit the code to see changes!</p>
  <div class="hover-container">
    <img src="https://via.placeholder.com/150" alt="Placeholder" />
  </div>
</body>
</html>`;

const BuildProduct = () => {
  const previewRef = React.useRef(null);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [images, setImages] = useState([]);
  const [editorContent, setEditorContent] = useState(defaultCode);

  // Debounced update function
  const debouncedUpdate = useCallback(
    (() => {
      let timer;
      return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          if (previewRef.current) {
            const scriptedContent = `
              ${value}
              <script>
                document.addEventListener('mouseover', (e) => {
                  const target = e.target;
                  if (target.classList.contains('hover-container')) {
                    window.parent.postMessage({
                      type: 'hover',
                      elementId: target.id,
                      elementClass: target.className
                    }, '*');
                  }
                });

                document.addEventListener('dragover', (e) => {
                  e.preventDefault();
                  const target = e.target;
                  if (target.classList.contains('hover-container')) {
                    target.style.backgroundColor = '#e0e0e0';
                  }
                });

                document.addEventListener('drop', (e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      const images = document.querySelectorAll('img');
                      images.forEach(img => {
                        img.src = e.target.result;
                      });
                    };
                    reader.readAsDataURL(file);
                  }
                });
              </script>
            `;
            previewRef.current.srcdoc = scriptedContent;
          }
        }, 1000); // Delay of 1 second
      };
    })(),
    []
  );

  // Handle editor changes
  function handleEditorChange(value) {
    setEditorContent(value);
    debouncedUpdate(value);
  }

  // Set up initial content and event listeners only once
  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.srcdoc = defaultCode;
      
      const messageHandler = (event) => {
        if (event.data.type === 'hover') {
          console.log('Hover event:', event.data);
        }
      };

      window.addEventListener('message', messageHandler);
      
      return () => {
        window.removeEventListener('message', messageHandler);
      };
    }
  }, []);

  // Add new function to handle image drops
  const handleImageDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImages(prev => [...prev, {
            id: Date.now(),
            url: e.target.result,
            name: file.name
          }]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  return (
    <div className="build-product-layout">
      <div 
        className={`top-nav ${isNavExpanded ? 'expanded' : ''}`}
        onMouseEnter={() => setIsNavExpanded(true)}
        onMouseLeave={() => setIsNavExpanded(false)}
      >
        <i className="fas fa-bars menu-toggle"></i>
        <div className="nav-content">
          {/* Add your navigation items here */}
          <div style={{ color: 'white' }}>
            {/* Your existing sidebar content goes here */}
          </div>
        </div>
      </div>

      <div className="editor-container">
        <div className="editor-pane">
          <Editor
            height="100%"
            defaultLanguage="html"
            defaultValue={defaultCode}
            theme="vs-dark"
            onChange={handleEditorChange}
            options={{ automaticLayout: true }}
          />
        </div>
        <div className="preview-pane">
          <iframe 
            ref={previewRef}
            className="preview-iframe"
            title="Live Preview"
            sandbox="allow-same-origin allow-scripts"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default BuildProduct
