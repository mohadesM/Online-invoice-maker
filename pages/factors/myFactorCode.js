let names = ["SerialNumber", "BuyerName", "MyDate"];
fillTableForm(
  "factorsData",
  "/factorsData",
  names,
  "SerialNumber",
  "Factors",
  "/newFactor"
);

async function search() {
  let shomareSrial_Jostejo = document.getElementById(
    "shomareSrial_Jostejo"
  ).value;
  let inputdata = {
    SerialNumber: shomareSrial_Jostejo,
  };
  let result = await GetData("/factorsData", inputdata);
  if (result && result[0]) {
    window.location.href = `/printFactor?Id=${shomareSrial_Jostejo}`;
  } else {
    alert("فاکتور با این شماره یافت نشد");
  }
}
