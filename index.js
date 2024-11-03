// Fetch the json file and its data.
fetch(`data.json`).then(response => {
    if(!response.ok){
        throw new Error(window.alert("couldn't fetch file"));
    }else {
        return response.json()
    }
}).then(data => displayBars(data)).catch(error => {console.log(error)});

// Function to display the bars according to the amount per day.
function displayBars(data){

    const chart = document.getElementById("chart");
    const maximumAmount = Math.max(...data.map(dayDAta => dayDAta.amount)); // Get the maximum amount to use to propotion the other bars.

    // Get today's day to identify the bar to be highlighted.
    const date = new Date();
    let today = date.getDay();

    // Sets and displays each of the bars from the data.json file to the webpage.
    data.forEach(item => {
        const barContainer = document.createElement("div"); // Bar and day container.
        const bar = document.createElement("div"); // Bar to be displayed.
        const value = document.createElement("div"); // Day to be displayed.
        const modal = document.createElement("div"); // Amount modal to be displayed on hover.

        bar.classList.add("bar");
        barContainer.classList.add("bar-container");
        value.classList.add("value");
        modal.classList.add("modal");

        value.innerText = item.day;
        modal.innerText = `$${item.amount.toFixed(2)}`

        // Checks for the bar representing today and highlights it.
        if(today === item.id){
            bar.classList.add("today");
        }

        const barHeight = (item.amount / maximumAmount) * 80; // Calculates height for the bars in the container.

        bar.style.height = `${barHeight}%`;

        barContainer.appendChild(bar);
        bar.appendChild(modal)
        barContainer.appendChild(value);
        chart.appendChild(barContainer);       


    });
}