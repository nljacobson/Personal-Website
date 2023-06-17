import './Resume.css';
import resumeDocument from "./HeaderlessResume.pdf"
export function Resume(){
  return(
    <object data={resumeDocument} type="application/pdf" width="1000vh" height="1000vh">
      <p>Unable to display PDF file. <a href={resumeDocument}>Download</a> instead.</p>
    </object>  
  )
}