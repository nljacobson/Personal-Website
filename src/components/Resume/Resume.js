import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import './Resume.css';

export function Resume(){
  const resumeDocument = './HeaderlessResume.pdf';
  return(
    <div>
      <object type="application/pdf" data={resumeDocument}
      style={{height: '100vh', width: '100vw'}}>
      <p>Failed to Load PDF!</p>
      </object>
    </div>      
  )
}