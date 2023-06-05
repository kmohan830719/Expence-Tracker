document.getElementById('button').addEventListener('click',submitDetails);

//creating the function
function submitDetails(e){
     e.preventDefault();
    
    let expence=document.getElementById('expence').value;
    let desc=document.getElementById('description').value;
    let category=document.getElementById('category').value;

    //creating object
    myobj={
       "Amount":expence,
       "Description":desc,
       "Category":category
    }

    //adding to local storage
    let obj=JSON.stringify(myobj);
    localStorage.setItem(desc, obj);

    const storedObj=JSON.parse(localStorage.getItem(desc));
    
    //creating elements
    let li=document.createElement('li');
    let delet=document.createElement('button');
    let edit=document.createElement('button');

    if(storedObj){
    li.textContent=storedObj.Amount+"-"+storedObj.Description+"-"+storedObj.Category ;
    }

    delet.textContent="Delete Expence";
    delet.style.margin="2px";
    li.appendChild(delet);
    edit.textContent="Edit Expence";
    edit.style.margin="2px";
    li.appendChild(edit);
    
    document.getElementById('pop').appendChild(li);

    edit.addEventListener("click",function(e){
        e.preventDefault();
        let userData = JSON.parse(localStorage.getItem(desc));
      
        if (userData) {
          document.getElementById("expence").value = userData.Amount;
          document.getElementById("description").value = userData.Description;
          document.getElementById("category").value = userData.Category;
        }
        deleteUser(desc);
         // Remove the user from the UI
         li.remove();
      });

      delet.addEventListener("click",function(e){
        e.preventDefault();
        deleteUser(desc);
        li.remove();
      })
}

function deleteUser(desc){
    localStorage.removeItem(desc);
  }



   
 
  
 
