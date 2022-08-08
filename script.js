const packSizes = [250, 500, 1000, 2000, 5000];
packSizes.sort((a, b) => a - b);

let ordered = parseInt(prompt("Input t-shirt that want to ordered"));

let packsDeliverGrouped = {};
let packSizeMinimum = Math.min(...packSizes);

let packsDelivered = getPacksDelivered(ordered);
let packsDeliverConsolidated = packsDelivered.reduce(
  (acc, curr) => acc + curr,
  0
);
packsDelivered = getPacksDelivered(packsDeliverConsolidated);

for (let i = 0; i < packsDelivered.length; i++) {
  if (packsDelivered[i] in packsDeliverGrouped) {
    packsDeliverGrouped[packsDelivered[i]]++;
  } else {
    packsDeliverGrouped[packsDelivered[i]] = 1;
  }
}

const tbody = document.querySelector("tbody");
for (let key in packsDeliverGrouped) {
  const tr = document.createElement("tr");
  const tdPack = document.createElement("td");
  const tdQuantity = document.createElement("td");
  tdPack.innerText = key;
  tdQuantity.innerText = packsDeliverGrouped[key];
  tr.append(tdPack, tdQuantity);
  tbody.append(tr);
}

function getPacksDelivered(ordered) {
  let packsDelivered = [];

  while (ordered > 0) {
    let reducer = 0;
    for (let i = 0; i < packSizes.length; i++) {
      if (packSizes[i] <= ordered) {
        reducer = packSizes[i];
      }
    }
    if (ordered < packSizeMinimum) {
      reducer = packSizeMinimum;
    }
    packsDelivered.push(reducer);
    ordered -= reducer;
  }

  return packsDelivered;
}
