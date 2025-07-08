export async function uploadMenuImage(file) {
  const formData = new FormData();
  formData.append('menuImage', file);
  const response = await fetch('http://localhost:5000/api/menu/upload', {
    method: 'POST',
    body: formData
  });
  if (!response.ok) {
    throw new Error('Failed to upload image');
  }
  return response.json();
}