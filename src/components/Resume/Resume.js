import './Resume.css';
export function Resume(){
  return(
    <object data={"./%PUBLIC_URL%/HeaderlessResume.pdf"} type="application/pdf" width="1000vh" height="1000vh">
      <p>Unable to display PDF file. <a href={"./%PUBLIC_URL%/HeaderlessResume.pdf"}>Download</a> instead.</p>
    </object>  
  )
}