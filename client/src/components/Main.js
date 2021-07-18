 
  import { useState } from "react";
import AlbumPhotos from "./AlbumPhotos";
import Form from "./Form";
import Header from "./Header";

const Main = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);

  const fetchData = async(id) =>{
    setIsLoading(!isLoading);
     await fetch("/api/albums/" + id + "/photos")
     .then((resp) => {return resp.json()})
     .then((data) => { 
      setIsLoading(!isLoading);
          setData(data)
     })
     .catch((error) => {console.log(error)})
    }


 
   return (
   <>
   <Header />
    <Form onSubmitForm={fetchData} id={setId} /> 
    <AlbumPhotos data = {data} loading={isLoading}  id={id} />
   </>
    )


}

export default Main; 