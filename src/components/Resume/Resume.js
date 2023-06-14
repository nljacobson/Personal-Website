import { Document, Page, pdfjs } from 'react-pdf';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import './Resume.css';
import resume from './HeaderlessResume.pdf';


export function Resume(){
    return(
            <Document height='1000px' className='resume-doc' file={resume}>
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
                      <Viewer fileUrl={resume} />
                    </Worker>
                <Page pageNumber={1}/>
            </Document>           
    )
}