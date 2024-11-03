fetch(`data.json`).then(response => {
    if(!response.ok){
        throw new Error(window.alert("couldn't fetch file"));
    }else {
        return response.json()
    }
}).then(data => displayBars(data)).catch(error => {console.log(error)});

function displayBars(data){

    const chart = document.getElementById("chart");
    const maximumAmount = Math.max(...data.map(dayDAta => dayDAta.amount));



    const date = new Date();
    let today = date.getDay();

    data.forEach(item => {
        const barContainer = document.createElement("div");
        const bar = document.createElement("div");
        const value = document.createElement("div");
        const modal = document.createElement("div");
        bar.classList.add("bar");
        barContainer.classList.add("bar-container");
        value.classList.add("value");
        modal.classList.add("modal");

        value.innerText = item.day;
        modal.innerText = `$${item.amount.toFixed(2)}`

        if(today === item.id){
            bar.classList.add("today");
        }

        const barHeight = (item.amount / maximumAmount) * 80;

        bar.style.height = `${barHeight}%`;

        barContainer.appendChild(bar);
        bar.appendChild(modal)
        barContainer.appendChild(value);
        chart.appendChild(barContainer);       


    });
}