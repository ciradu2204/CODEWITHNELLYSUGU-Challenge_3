import { useEffect, useState } from "react";

const Form = props => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(''); 

   console.log(inputValue);
    const handleChange = (event) =>{
            setInputValue(event.target.value)
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
         if(inputValue >=1 && inputValue<=100){
            setInputValue(inputValue);
            props.id(inputValue);
            props.onSubmitForm(inputValue);
            setError('');
         }else{
            setError("Enter an id between 1 and 100"); 
         }
       
    }

    useEffect(() =>{
         
    }, [inputValue])


    return(
        <form onSubmit={handleSubmit}>
            {(error)? <p className="error">{error}</p>: null}
              <input type="Number" value ={inputValue} onChange={handleChange} placeholder="Enter the album id" />
             <input type="submit" value="Get Album"/>
        </form>
    )

}

export default Form; 