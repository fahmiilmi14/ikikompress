let originalImage = null;

document.getElementById('imageInput').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = function (e) {
      originalImage = new Image();
      originalImage.src = e.target.result;
      originalImage.onload = function () {
        document.getElementById('preview').innerHTML = `<p>Preview:</p><img src="${originalImage.src}" alt="Original Image">`;
      }
    };
    reader.readAsDataURL(file);
  }
});

function compressImage() {
  const quality = parseFloat(document.getElementById('quality').value);
  if (!originalImage) {
    alert('Pilih gambar terlebih dahulu!');
    return;
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = originalImage.width;
  canvas.height = originalImage.height;

  ctx.drawImage(originalImage, 0, 0);

  const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);

  document.getElementById('preview').innerHTML += `<p>Hasil Kompres:</p><img src="${compressedDataUrl}" alt="Compressed Image">`;

  const downloadLink = document.getElementById('downloadLink');
  downloadLink.href = compressedDataUrl;
  downloadLink.style.display = 'inline-block';
}