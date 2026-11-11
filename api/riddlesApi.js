

//GET
  export async function getAllRiddles(){
  try{
    const res=await fetch("http://localhost:3000/riddles",
    {
        method: "GET",
    });
    
    if(!res.ok){
        throw new Error("faold to fetch")
    }
    const data=  await res.json();
    return data;
    }catch(error){
        console.log(error.message);
        throw error;
    }
            
}

//POST

export async function createRiddle(riddle) {
    try {
        const res = await fetch("http://localhost:3000/riddles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(riddle)
        });

        if (!res.ok) {
            throw new Error("Failed to create riddle");
        }

        const data = await res.json();
        return data;

    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

//PUT
  export async function updateRiddle(id,riddle){
    try{
        const res= await fetch(`http://localhost:3000/riddles/${id}`,{
            method:"PUT",
         headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(riddle)
        });

        if (!res.ok) {
            throw new Error("Failed to update riddle");
        }

        const data = await res.json();
        return data;

    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

//DELETE
 export async function deleteRiddle(id){
      try{
        const res= await fetch(`http://localhost:3000/riddles/${id}`,{
            method:"DELETE"
        });

        if (!res.ok) {
            throw new Error("Failed to delete riddle");
        }

        return true;

    } catch (error) {
        console.log(error.message);
        throw error;
    }
    
}



