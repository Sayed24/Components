
const transactions = [
    {
        name: "Alice Johnson",
        id: "#1024",
        date: "Nov 17, 2026",
        amount: "$250.00",
        status: "Paid"
    },
    {
        name: "Michael Smith",
        id: "#1025",
        date: "Nov 16, 2026",
        amount: "$120.00",
        status: "Pending"
    },
    {
        name: "Sarah Williams",
        id: "#1026",
        date: "Nov 15, 2026",
        amount: "$540.00",
        status: "Paid"
    },
    {
        name: "David Brown",
        id: "#1027",
        date: "Nov 14, 2026",
        amount: "$180.00",
        status: "Paid"
    }
];

// Display transactions

const transactionList =
    document.getElementById("transactionList");

function renderTransactions(data) {
    transactionList.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");

        const values = [
            item.name,
            item.id,
            item.date,
            item.amount
        ];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const statusCell = document.createElement("td");
        const badge = document.createElement("span");

        badge.className =
            "status " +
            (item.status === "Paid" ? "paid" : "pending");

        badge.textContent = item.status;

        statusCell.appendChild(badge);
        row.appendChild(statusCell);

        transactionList.appendChild(row);
    });
}

renderTransactions(transactions);


// Search transactions

document.getElementById("searchInput")
    .addEventListener("input", function () {

        const search = this.value.toLowerCase();

        const filtered = transactions.filter(item =>
            item.name.toLowerCase().includes(search) ||
            item.id.toLowerCase().includes(search) ||
            item.status.toLowerCase().includes(search)
        );

        renderTransactions(filtered);
    });


// Add new order

document.getElementById("addOrder")
    .addEventListener("click", function () {

        const name = prompt("Enter customer name:");

        if (!name || !name.trim()) return;

        const order = {
            name: name.trim(),
            id: "#"+(1028 + transactions.length - 4),
            date: new Date().toLocaleDateString(),
            amount: "$100.00",
            status: "Pending"
        };

        transactions.unshift(order);
        renderTransactions(transactions);

        document.getElementById("searchInput").value = "";
        alert("New order added successfully!");
    });


// Dark mode

document.getElementById("themeToggle")
    .addEventListener("click", function (event) {

        event.preventDefault();
        document.body.classList.toggle("dark");

        localStorage.setItem(
            "dashboardTheme",
            document.body.classList.contains("dark")
                ? "dark"
                : "light"
        );
    });

if (localStorage.getItem("dashboardTheme") === "dark") {
    document.body.classList.add("dark");
}


// Mobile sidebar

document.getElementById("menuButton")
    .addEventListener("click", function () {

        document.getElementById("sidebar")
            .classList.toggle("open");
    });


// Current date

document.getElementById("today").textContent =
    new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });


// Sales chart

const canvas = document.getElementById("salesChart");

const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
             "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    values: [1200, 1900, 1500, 2800, 2200, 3500,
             3000, 4200, 3800, 5000, 4600, 6000]
};

const weeklyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [500, 800, 650, 1100, 900, 1400, 1200]
};

let salesChart;

function createChart(data) {

    if (salesChart) {
        salesChart.destroy();
    }

    salesChart = new Chart(canvas, {
        type: "line",

        data: {
            labels: data.labels,

            datasets: [{
                label: "Revenue ($)",
                data: data.values,
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59,130,246,0.12)",
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 4
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                }
            },

            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: "rgba(148,163,184,0.15)"
                    }
                },

                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

createChart(monthlyData);


// Change chart period

document.getElementById("chartPeriod")
    .addEventListener("change", function () {

        createChart(
            this.value === "weekly"
                ? weeklyData
                : monthlyData
        );
    });
