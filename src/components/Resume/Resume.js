import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import './Resume.css';
import resume from './HeaderlessResume.pdf';


export function Resume(){
    return(
            <Document height='1000px' className='resume-doc' file={resume}>
                <Page pageNumber={1}/>
            </Document>           
    )
}