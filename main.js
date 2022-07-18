let btn = document.createElement("button");
btn.innerHTML = "Add as preset";
btn.onclick = function () {
    let accountName = document.getElementById("ordertime_account_id-selectized").parentNode.childNodes[0].textContent;
    let ticket = document.getElementById("ordertime_ticket").value;
    let description = document.getElementById("ordertime_description").value;
    let mealCompensation = document.getElementById("ordertime_meal_compensation").value;
    let billable = document.getElementById("ordertime_billable").value;
    let date = document.getElementById("ordertime_work_date").value;
};

let container = document.getElementsByClassName("col-md-offset-2 col-md-8")[0];
container.parentNode.parentNode.appendChild(btn);