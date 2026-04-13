document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("form");
  const list = document.getElementById("list");

  let data = JSON.parse(localStorage.getItem("finance")) || [];

  function save() {
    localStorage.setItem("finance", JSON.stringify(data));
  }

  function render() {
    list.innerHTML = "";

    let income = 0;
    let expense = 0;

    data.forEach(item => {
      if (item.type === "income") income += item.amount;
      else expense += item.amount;

      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${item.date}</td>
        <td>${item.type}</td>
        <td>${item.amount}</td>
        <td><button onclick="del(${item.id})">−</button></td>
      `;

      list.appendChild(tr);
    });

    document.getElementById("total-income").textContent = income + " ₽";
    document.getElementById("total-expense").textContent = expense + " ₽";
    document.getElementById("balance").textContent = (income - expense) + " ₽";
  }

  window.del = (id) => {
    data = data.filter(i => i.id !== id);
    save();
    render();
  };

  form.onsubmit = e => {
    e.preventDefault();

    const item = {
      id: Date.now(),
      type: document.getElementById("type").value,
      amount: parseFloat(document.getElementById("amount").value),
      date: document.getElementById("date").value || new Date().toISOString().slice(0,10)
    };

    data.push(item);
    save();
    render();
    form.reset();
  };

  render();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }

});