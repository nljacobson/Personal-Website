import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import './Resume.css';
import resume from './HeaderlessResume.pdf';

export function Resume(){
  return(
    <div>
      <object type="application/pdf" data={resume} className='pdf-document'
      style={{height: '100vh', width: '100vw'}}>
      <p>Failed to Load PDF!</p>
      </object>
    </div>      
  )
}