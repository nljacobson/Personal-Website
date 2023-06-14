import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import './Resume.css';
import resume from './HeaderlessResume.pdf';

//Define worker for pdf reader package
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

export function Resume() {
  console.log(resume)
  return (
    <Document height='1000px' className='resume-doc' file={resume}>
      <Page pageNumber={1} />
    </Document>
  )
}