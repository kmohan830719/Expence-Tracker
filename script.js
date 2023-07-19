document.getElementById('button').addEventListener('click',submitDetails);

//creating the function
function submitDetails(e){
     e.preventDefault();
    
    let expence=document.getElementById('expence').value;
    let desc=document.getElementById('description').value;
    let category=document.getElementById('category').value;

    //creating object
    myobj={
       "amount":expence,
       "description":desc,
       "category":category
    }

    axios.post("http://localhost:4000/expense", myobj)
    .then((responce)=>{
      // console.log(responce);
      showDetails(responce.data);
    })
    .catch((err)=>{
      console.log(err);
    })

}

 //doing a get request
 window.addEventListener("DOMContentLoaded",()=>{
  axios.get("http://localhost:4000/expense")
  .then((response)=>{
    console.log(response);
    for(var i=0;i<response.data.length;i++){
      showDetails(response.data[i])
    }
  })
  .catch((err)=>{
    console.log(err)
  })
}) 

//showing the data on screen
function showDetails(obj){

  //creating elements
  let li=document.createElement('li');
  let delet=document.createElement('button');
  let edit=document.createElement('button');

  li.id="list";
  li.textContent = obj.amount +" " + obj.description +" " + obj.category ;
 

  delet.textContent="Delete Expence";
  delet.style.margin="2px";
  li.appendChild(delet);
  edit.textContent="Edit Expence";
  edit.style.margin="2px";
  li.appendChild(edit);
  
  document.getElementById('pop').appendChild(li);

  //to delete user from crudcrud as well as localstorage
  delet.addEventListener("click",function(e){
   e.preventDefault();
   axios.delete(`http://localhost:4000/expense/${obj.id}`)
   .then((promis)=>{
     console.log(promis)
   })
   .catch((err)=>{
     console.log(err)
   })
   li.remove();
 })

 
 edit.addEventListener("click",function(e){
   e.preventDefault();
   axios.get(`http://localhost:4000/expense/${obj.id}`)
   .then((promis)=>{
     console.log(promis.data)
     if (promis) {
      document.getElementById("expence").value = promis.data.amount;
      document.getElementById("description").value = promis.data.description;
      document.getElementById("category").value = promis.data.category;
     }
   })
   .catch((err)=>{
     console.log(err)
   })
    // Remove the user from the UI
    li.remove();
 })

 document.getElementById("button").addEventListener("click", function(event) {
   event.preventDefault();

   var updatedData = {
     amount: document.getElementById("expence").value,
     description: document.getElementById("description").value,
     category: document.getElementById("category").value,
   };

   axios.put(`http://localhost:4000/expense/${obj.id}`, updatedData)
     .then((response) => {
       console.log(response);
     })
     .catch((error) => {
       console.log(error);
     })
   })
}






   
 
  
 
