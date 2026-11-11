
//FindPlayer

export async function FindPlayerByName(name) {
    try {
        const res = await fetch(
            `http://localhost:3000/players?name=${encodeURIComponent(name)}`,
            { method: "GET" }
        );

        if (!res.ok) {
            throw new Error("Failed to find player");
        }

        const data = await res.json();
        return data[0];

    } catch (error) {
        console.log(error.message);
        throw error;
    }
}


export async function createPlayer(name, lowestTime) {
    try {
        const res = await fetch("http://localhost:3000/players", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                lowestTime
            })
        });

        if (!res.ok) {
            throw new Error("Failed to create player");
        }

        const data = await res.json();
        return data;

    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

//update
  export async function updatePlayer(player){
    try{
        const res= await fetch(`http://localhost:3000/players/${player.id}`,{
            method:"PUT",
         headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(player)
        });

        if (!res.ok) {
            throw new Error("Failed to update player");
        }

        const data = await res.json();
        return data;

    } catch (error) {
        console.log(error.message);
        throw error;
    }
}
export async function getAllPlayers() {
    try {
        console.log("Fetching all players...");

        const res = await fetch("http://localhost:3000/players");

        console.log("Response status:", res.status);

        if (!res.ok) {
            throw new Error("Failed to fetch players");
        }

        const data = await res.json();
        console.log("Players received:", data);

        return data;

    } catch (error) {
        console.log("Fetch error:", error.message);
        console.log("Cause:", error.cause);
        throw error;
    }
}