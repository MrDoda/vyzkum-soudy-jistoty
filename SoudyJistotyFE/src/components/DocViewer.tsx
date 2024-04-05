import { useState } from 'react'
import { DocViewer, DocViewerRenderers } from 'react-doc-viewer'

function DocumentWithAcceptance() {
  const [accepted, setAccepted] = useState(false)
  const docs = [{ uri: 'path/to/your/document.docx' }] // Update with your document's path

  const handleAccept = () => {
    setAccepted(true)
    // Perform additional actions here, such as updating a database or state
    console.log('Document accepted')
  }

  return (
    <div>
      <DocViewer
        pluginRenderers={DocViewerRenderers}
        documents={docs}
        config={{
          header: {
            disableHeader: false,
            disableFileName: false,
            retainURLParams: false,
          },
        }}
      />
      {!accepted && <button onClick={handleAccept}>Accept</button>}
      {accepted && <p>Thank you for accepting!</p>}
    </div>
  )
}
