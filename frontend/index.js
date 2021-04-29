const dropZone = document.querySelector(".drop-zone")
const browseBtn = document.querySelector("#browseBtn")
const fileInput = document.querySelector("#fileinput")

const bgProgress = document.querySelector(".bg-progress")
const progressContainer = document.querySelector(".progress-container")
const percentDiv = document.querySelector("#percent")
const progressBar = document.querySelector(".progress-bar")

const copyBtn = document.querySelector("#copybtn")
const sharingContainer = document.querySelector(".sharing-container")
const fileUrlInput = document.querySelector("#fileUrl")
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


fileInput.addEventListener("change", () =>{
    uploadFile()
})
browseBtn.addEventListener("click", () => {
    fileInput.click();
  });

copyBtn.addEventListener("click", () =>{
    fileUrlInput.select()
    document.execCommand("copy")
    
} )
  const uploadFile = () =>{
      progressContainer.style.display = "block"
      const file = fileInput.files[0];
      const formData = new FormData()
      formData.append("myFile",file)
      const xhr = new XMLHttpRequest();

      xhr.onreadystatechange = () =>{
          if(xhr.readyState === XMLHttpRequest){
              console.log(xhr.response);
              showLink(JSON.parse(xhr.response))
          }
      }
      xhr.upload.onprogress = updateProgress;
      xhr.open("POST", uploadUrl)
      xhr.send(formData)
  }

  const updateProgress = (e) => {
      const percent = Math.round((e.loaded/e.total) * 100);
    //   console.log(percent);
      bgProgress.style.width= `${percent}%`
      percentDiv.innerText = percent
      progressBar.style.transform = `scaleX(${percent})`
  }

  const showLink = ({ file : url }) =>{
      console.log(file);
      progressContainer.style.display= "none";
      sharingContainer.style.display= "block"
      fileUrlInput.value = url
  }