
const cloudName = "dtf9cnbzr";
const uploadPreset = "unsigned_preset"; // Use an unsigned upload preset

document.getElementById("uploadForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    const url = data.secure_url;

    document.getElementById("shareLink").value = url;
    document.getElementById("result").classList.remove("hidden");
  } catch (error) {
    alert("Upload failed!");
    console.error(error);
  }
});

function copyLink() {
  const link = document.getElementById("shareLink");
  link.select();
  document.execCommand("copy");
  alert("Link copied!");
}
