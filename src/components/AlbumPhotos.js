import StartingMessage from "./StartingMessage";

const AlbumPhotos = props =>{
   console.log(props.id)
   return (props.data.length<=0 && props.loading )? (
   <div className="loading">
     <div></div>
     <div></div>
     <div></div>
   </div>):
   ((props.data.length<=0 && !props.loading) || props.id.length === 0)?  
    (<StartingMessage/>) : (
        <div className="Album">   
          <h2>PHOTOS of ID: {props.id}</h2>
            <div className="photos">
            {props.data.map((element, index) =>(
             <div className="photo" key={index}>
                <p>{element.title}</p>
                <img src={element.thumbnailUrl} alt=""/>
              </div>
           
            ))}
        </div>
        </div>
    )

 };

export default AlbumPhotos