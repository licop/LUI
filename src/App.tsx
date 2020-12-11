import React, {ChangeEvent, useEffect, useState} from 'react';
import axios from 'axios';


const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const postData = {
    title: 'licop',
    body: 'hello man'
  }
  useEffect(() => {
    axios.post('https://jsonplaceholder.typicode.com/posts', postData)
      .then(resp => {
        setTitle(resp.data.title);
      })
  })
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if(files) {
      const uploadedFile = files[0];
      const formData = new FormData();
      
      formData.append(uploadedFile.name, uploadedFile);
      axios.post("https://jsonplaceholder.typicode.com/posts", formData, {
        headers: {
          "Content-Type": 'multipart/form-data'
        }
      }).then(res => {
        console.log(res);
      })
    }
  }

  return (
    <div className="App">
      {title}
      <input type="file" name="myfile" onChange={handleFileChange} />
      
      {/* <form method="post" encType="multipart/formdata" action="https://jsonplaceholder.typicode.com/posts">
        <input type="file" name="myfile" />
        <button type="submit">submit</button>
      </form> */}
    </div>
  );
}

export default App;
