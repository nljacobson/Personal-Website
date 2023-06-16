import './Resume.css';
import resume from './HeaderlessResume.pdf'
export function Resume(){
  //const resumeDocument = process.env.PUBLIC_URL + "/HeaderlessResume.pdf";
  return(
    <object data={resume} type="application/pdf" width="1000vh" height="1000vh">
      <p>Unable to display PDF file. <a href={resume}>Download</a> instead.</p>
    </object>  
  )
}