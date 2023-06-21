import './Resume.css';
export function Resume(){
  return(
    <object data={"https://personal-website-cloud-storage.s3.amazonaws.com/HeaderlessResume.pdf"} type="application/pdf" width="1000vh" height="1000vh">
      <p>Unable to display PDF file. <a href={"https://personal-website-cloud-storage.s3.amazonaws.com/HeaderlessResume.pdf"}>Download</a> instead.</p>
    </object>  
  )
}