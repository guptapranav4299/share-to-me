const dropZone = document.querySelector(".drop-zone")
const browseBtn = document.querySelector("#browseBtn")
const fileInput = document.querySelector("#fileinput")

const host = "https://inshare.heroku.app.com/"
const uploadUrl = `${host}/api/files`;

dropZone.addEventListener("dragover",(e) =>{
  e.preventDefault();
    dropZone.classList.add("dragged")  
  

})

dropZone.addEventListener("dragleave", (e) =>{
    dropZone.classList.remove("dragged")
    console.log("drag ended");
})

dropZone.addEventListener("drop", (e) =>{
    e.preventDefault()
    dropZone.classList.remove("dragged")
    const files = e.dataTransfer.files;
    console.log(files);
    if(files.length){
        fileInput.files = files;
        uploadFile()
    }

})

browseBtn.addEventListener("click", () => {
    fileInput.click();
  });


  const uploadFile = () =>{
      const file = fileInput.files[0];
      const formData = new FormData()
      formData.append("myFile",file)
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () =>{
          if(xhr.readyState === XMLHttpRequest){
              console.log(xhr.response);
          }
      }

      xhr.open("POST", uploadUrl)
      xhr.send(formData)
  }