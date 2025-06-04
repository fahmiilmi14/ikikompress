let originalImage = null;

const imageInput = document.getElementById("imageInput");
const qualitySlider = document.getElementById("quality");
const qualityValue = document.getElementById("qualityValue");
const preview = document.getElementById("preview");
const downloadLink = document.getElementById("downloadLink");
const compressBtn = document.getElementById("compressBtn");

imageInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function (e) {
      originalImage = new Image();
      originalImage.src = e.target.result;
      originalImage.onload = function () {
        preview.innerHTML = `<p><strong>Preview Asli:</strong></p><img src="${originalImage.src}" alt="Original Image">`;
        downloadLink.style.display = "none";
      };
    };
    reader.readAsDataURL(file);
  }
});

qualitySlider.addEventListener("input", () => {
  qualityValue.textContent = qualitySlider.value;
});

compressBtn.addEventListener("click", () => {
  const quality = parseFloat(qualitySlider.value);
  if (!originalImage) {
    alert("Pilih gambar terlebih dahulu!");
    return;
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = originalImage.width;
  canvas.height = originalImage.height;
  ctx.drawImage(originalImage, 0, 0);

  const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);

  preview.innerHTML += `<p><strong>Hasil Kompres:</strong></p><img src="${compressedDataUrl}" alt="Compressed Image">`;

  downloadLink.href = compressedDataUrl;
  downloadLink.style.display = "inline-block";
});
