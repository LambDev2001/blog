
export const checkImage = (file) => {
  const types = ['image/png', 'image/jpeg'];
  let err =''
  if(!file) return err = "File does not exist"

  if(file.size > 1024 * 1024)
      err = "The largest image size is imb"

  if(!types.includes(file.type))
      err = 'The image type is png / jpeg';

  return err;
}

export const imageUpload = async(file) => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", "mq0jvhgj")
  formData.append("cloud_name", "dfuaq9ggj")

  const res = await fetch("https://api.cloudinary.com/v1_1/dfuaq9ggj/upload", {
      method: "POST",
      body: formData
  })
  const data = await res.json();
  return {public_id: data.public_id,  url: data.secure_url}

}