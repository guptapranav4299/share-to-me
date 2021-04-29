const dropZone = document.querySelector(".drop-zone")
const browseBtn = document.querySelector("#browseBtn")
const fileInput = document.querySelector("#fileinput")

const bgProgress = document.querySelector(".bg-progress")
const progressContainer = document.querySelector(".progress-container")
const progressPercent = document.querySelector("#progressPercent");
const percentDiv = document.querySelector("#percent")
const progressBar = document.querySelector(".progress-bar")


const emailForm = document.querySelector("#emailform") 
const copyBtn = document.querySelector("#copybtn")
const sharingContainer = document.querySelector(".sharing-container")
const fileUrlInput = document.querySelector("#fileUrl")
const host = "https://inshare.heroku.app.com/"
const uploadUrl = `${host}/api/files`;
const emailURL = `${host}/api/files/send`;



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

    const files = e.dataTransfer.files;
    console.log(files);
    if(files.length === 1){
        fileInput.files = files;
        uploadFile()
    }
    dropZone.classList.remove("dragged")
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

})

fileUrlInput.addEventListener("click", () => {
    fileUrlInput.select();
  });

  const uploadFile = () =>{
      console.log("file added uploading");


      files = fileInput.files;
      const formData = new FormData()
      formData.append("myFile",files[0])

      progressContainer.style.display = "block"

      const xhr = new XMLHttpRequest();

      xhr.onreadystatechange = () =>{
          if(xhr.readyState === XMLHttpRequest.DONE){
              console.log(xhr.response);
              onUploadSuccess(JSON.parse(xhr.response))
          }
      }
      xhr.upload.onprogress = updateProgress;
      xhr.open("POST", uploadUrl)
      xhr.send(formData)
  }

  const updateProgress = (e) => {
      const percent = Math.round((e.loaded/e.total) * 100);
    //   console.log(percent);
      percentDiv.innerText = percent
      const scaleX = `scaleX(${percent / 100})`;
    bgProgress.style.transform = scaleX;
    progressBar.style.transform = scaleX;
  }

  const onUploadSuccess = ({ file : url }) =>{
      console.log(file);
      fileInput.value = "";
      emailForm[2].removeAttribute("disabled");
      progressContainer.style.display= "none";
      sharingContainer.style.display= "block"
      fileUrlInput.value = url
  }

  emailForm.addEventListener("submit",(e) =>{
      e.preventDefault()
      console.log("submitted");
      const url = fileUrlInput.value
      const formData = {
          uuid: url.split("/").splice(-1,1)[0],
          emailTo : emailForm.elements["to-email"].value,
          emailFrom: emailForm.elements["from-email"].value,
      };
    
      emailForm[2].setAttribute("disabled","true")
    console.table(formData)

    fetch(emailURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            showToast("Email Sent");
            sharingContainer.style.display = "none"; // hide the box
          }
        });
  })