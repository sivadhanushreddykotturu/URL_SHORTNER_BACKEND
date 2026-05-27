function isValidURL(url)
{
    try{
        new URL(url)
        return true;
    }catch{
        return false;
    }
}

function isShortCode(shortCode){
    return /^[A-Za-z0-9]{8}$/.test(shortCode);
}

async function shortenUrl(){
    const inputUrl = document.getElementById("urlInput").value;
    if(!isValidURL(inputUrl)){
        document.getElementById("result").innerHTML = "Please enter a valid URL";
        return;
    }

    const response = await fetch ("/",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            url:inputUrl
        })
    })
    const data = await response.json();
    const shortUrl = `${window.location.origin}/${data.id}`;
    document.getElementById("result").innerHTML= `
    <a href="${shortUrl}" target="_blank">
    ${shortUrl}
    </a>
    `;
}

async function getAnalytics(){
    const shortCode = document.getElementById("urlInput").value;
    if(!isShortCode(shortCode)){
        document.getElementById("result").innerHTML="Enter valid 8-character shortcode";
        return;
    }
    const response =  await fetch(`/analytics/${shortCode}`);
    const data = await response.json();
    if(!response.ok){
        document.getElementById("result").innerHTML="The short code doesn't exist in our database";
        return ;
    }
    let visitHTML = "";
    data.analytics.forEach((visit)=>{
        visitHTML +=`
        <li>
        ${new Date(visit.timestamp).toLocaleString()}
        </li>
        `;
    });
    document.getElementById("result").innerHTML =`
    <h2>Total Clicks: ${data.totalclicks}</h2>

    <h3>Visit History</h3>
    <ul>
    ${visitHTML}
    </ul>
    `;
}