import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import './Resume.css';

export function Resume(){
  const resumeDocument = './HeaderlessResume.pdf';
  return(
      <p> Failed to load resume <a href={resumeDocument}></a>.</p>
  )
}