let url = "https://api.adviceslip.com/advice";

$("#dice").click(function(){
    fetch(url)
    .then((result)=>{
        if(result.ok)
            return result.json();
        else{
            console.log("API error");
        }
    })
    .then((resp)=>{
        console.log(resp);
        $("#advice").text(`advice #${resp.slip.id}`)
        $("#text").text(`"${resp.slip.advice}"`)
    })
    .catch((error)=>{
        console.log(error);
        console.log("connection error");
    })
})