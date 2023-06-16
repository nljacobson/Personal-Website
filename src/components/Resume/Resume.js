import './Resume.css';
export function Resume(){
  const resumeDocument = "./text/HeaderlessResume.pdf"
  return(
    <object data={resumeDocument} type="application/pdf" width="1000vh" height="1000vh">
      <p>Unable to display PDF file. <a href={resumeDocument}>Download</a> instead.</p>
    </object>  
  )
}