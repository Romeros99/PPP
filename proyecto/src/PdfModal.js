import React, { useEffect, useState } from 'react';

function PdfModal({ pdfUrl }) {
  const [modalAccepted, setModalAccepted] = useState(false);

  useEffect(() => {
    if (pdfUrl) {
      const popupWindow = window.open('', '_blank', 'width=600,height=800');
      const content = `
        <html>
          <body>
            <iframe src="${pdfUrl}" width="100%" height="700"></iframe>
            <div style="display: flex; justify-content: flex-end; margin-top: 10px;">
              <button onclick="window.opener.setModalAccepted(true); window.close()">Aceptar</button>
              <button onclick="window.close()">Rechazar</button>
            </div>
          </body>
        </html>
      `;
      popupWindow.document.open();
      popupWindow.document.write(content);
      popupWindow.document.close();
    }
  }, [pdfUrl]);

  return (
    <div>
      {modalAccepted && <p>¡Modal aceptado!</p>}
    </div>
  );
}

export default PdfModal;