let bod = document.querySelector("body");
//onclick action for calculate button
document.querySelector(".tax-calc").addEventListener("click", () => {
  //condition to check if monthly income is input
  if (document.querySelector("#monthly-income").value == "") {
    alert("Please enter your monthly income");
  } else {
    //logic if monthly income is input
    //storing values from income text fields to variables
    let mIncome = parseFloat(
      document.querySelector("#monthly-income").value
    ).toFixed(2);
    let fAllow = parseFloat(
      document.querySelector("#festive-allow").value
    ).toFixed(2);
    let oAllow = parseFloat(
      document.querySelector("#other-allow").value
    ).toFixed(2);
    //storing values from duration text fields to variables
    let miDur = parseFloat(document.querySelector("#mi-dur").value).toFixed(2);
    let faDur = parseFloat(document.querySelector("#fa-dur").value).toFixed(2);
    let oaDur = parseFloat(document.querySelector("#oa-dur").value).toFixed(2);
    //checking if the incomes are NaN datatype
    if (isNaN(mIncome)) mIncome = 0;
    if (isNaN(fAllow)) fAllow = 0;
    if (isNaN(oAllow)) oAllow = 0;
    //storing income values from income table into variable
    let monthlyIncome = document.querySelector("#mii");
    let retireFund = document.querySelector("#rfi");
    let festiveAllow = document.querySelector("#fai");
    let otherAllow = document.querySelector("#oai");
    let gIncome = document.querySelector("#gi");
    //writing the income values in income table
    monthlyIncome.innerHTML = numberComma(mIncome * miDur);
    retireFund.innerHTML = numberComma(0.1833 * (mIncome * miDur));
    festiveAllow.innerHTML = numberComma(fAllow * faDur);
    otherAllow.innerHTML = numberComma(oAllow * oaDur);
    //storing gross income in a variable
    let grossIncome = parseFloat(document.querySelector("#gi-field").value);
    //writing gross income in income table
    gIncome.innerHTML = numberComma(grossIncome);

    allowableDeduction(grossIncome);

    bod.classList.add("show-tax");
  }
});
//function to calculate total allowable deduction
function allowableDeduction(grossIncome) {
  //storing values from deduction text fields to variables
  let rfDeduction = parseFloat(document.querySelector("#rf-dedu").value);
  let liDeduction = parseFloat(document.querySelector("#li-dedu").value);
  let heiDeduction = parseFloat(document.querySelector("#hei-dedu").value);
  let hoiDeduction = parseFloat(document.querySelector("#hoi-dedu").value);
  //checking if the deduction values are NaN datatype or not
  if (isNaN(rfDeduction)) rfDeduction = 0;
  if (isNaN(liDeduction)) liDeduction = 0;
  if (isNaN(heiDeduction)) heiDeduction = 0;
  if (isNaN(hoiDeduction)) hoiDeduction = 0;
  //storing deduction values from deduction table in variables
  let retireDeduction = document.querySelector("#rfd");
  let lifeDeduction = document.querySelector("#lid");
  let healthDeduction = document.querySelector("#heid");
  let houseDeduction = document.querySelector("#hoid");
  let allowDeduction = document.querySelector("#tadd");
  let taxable = document.querySelector("#txbl");
  //writing deduction values in deduction table
  retireDeduction.innerHTML = numberComma(rfDeduction);
  lifeDeduction.innerHTML = numberComma(liDeduction);
  healthDeduction.innerHTML = numberComma(heiDeduction);
  houseDeduction.innerHTML = numberComma(hoiDeduction);
  //calculating total deduction and writing total deduction in deduction table
  let totalDeduction =
    parseFloat(rfDeduction) +
    parseFloat(liDeduction) +
    parseFloat(heiDeduction) +
    parseFloat(hoiDeduction);
  allowDeduction.innerHTML = numberComma(totalDeduction);
  //calculating taxable income and writing it in taxable income table
  let taxableIncome = grossIncome - totalDeduction;
  taxable.innerHTML = numberComma(taxableIncome);

  taxCalculation(taxableIncome);
}
//function to calculate tax
function taxCalculation(netIncome) {
  let whichSex = document.querySelector("#sex-choose");
  let sex = whichSex.options[whichSex.selectedIndex].text;

  let isMarried = document.querySelector("#marry-choose");
  let maritalStatus = isMarried.options[isMarried.selectedIndex].text;

  let taxDuration = parseFloat(document.querySelector("#mi-dur").value).toFixed(
    1
  );

  let tblCell1 = document.querySelector(".f-brack");
  let tblCell2 = document.querySelector(".s-brack");
  let tblCell3 = document.querySelector(".t-brack");
  let tblCell4 = document.querySelector(".fo-brack");
  let tblCell5 = document.querySelector(".fi-brack");

  let cell1 = document.querySelector(".f-val");
  let cell2 = document.querySelector(".s-val");
  let cell3 = document.querySelector(".t-val");
  let cell4 = document.querySelector(".fo-val");
  let cell5 = document.querySelector(".fi-val");

  let incomeTax = 0;
  let finalTax = 0;

  //unmarried income tax
  if (maritalStatus.toLowerCase() == "unmarried") {
    tblCell1.innerHTML = "0 - 500,000";
    tblCell2.innerHTML = "500,000 - 700,000";
    tblCell3.innerHTML = "700,000 - 1,000,000";
    tblCell4.innerHTML = "1,000,000 - 2,000,000";
    tblCell5.innerHTML = "2,000,000 - above";
    if (netIncome <= 500000) {
      incomeTax = 0;
      cell1.innerHTML = "0";
      cell2.innerHTML = "0";
      cell3.innerHTML = "0";
      cell4.innerHTML = "0";
      cell5.innerHTML = "0";
    } else if (netIncome > 500000 && netIncome <= 700000) {
      incomeTax = 0.1 * (netIncome - 500000);
      cell1.innerHTML = "0";
      cell2.innerHTML = numberComma(incomeTax);
      cell3.innerHTML = "0";
      cell4.innerHTML = "0";
      cell5.innerHTML = "0";
    } else if (netIncome > 700000 && netIncome <= 1000000) {
      incomeTax = 0.1 * 200000 + 0.2 * (netIncome - 700000);
      cell1.innerHTML = "0";
      cell2.innerHTML = numberComma(0.1 * 200000);
      cell3.innerHTML = numberComma(0.2 * (netIncome - 700000));
      cell4.innerHTML = "0";
      cell5.innerHTML = "0";
    } else if (netIncome > 1000000 && netIncome <= 2000000) {
      incomeTax = 0.1 * 200000 + 0.2 * 300000 + 0.3 * (netIncome - 1000000);
      cell1.innerHTML = "0";
      cell2.innerHTML = numberComma(0.1 * 200000);
      cell3.innerHTML = numberComma(0.2 * 300000);
      cell4.innerHTML = numberComma(0.3 * (netIncome - 1000000));
      cell5.innerHTML = "0";
    } else if (netIncome > 2000000) {
      incomeTax =
        0.1 * 200000 +
        0.2 * 300000 +
        0.3 * 1000000 +
        0.36 * (netIncome - 2000000);
      cell1.innerHTML = "0";
      cell2.innerHTML = numberComma(0.1 * 200000);
      cell3.innerHTML = numberComma(0.2 * 300000);
      cell4.innerHTML = numberComma(0.3 * 1000000);
      cell5.innerHTML = numberComma(0.36 * (netIncome - 2000000));
    }
  } else {
    tblCell1.innerHTML = "0 - 600,000";
    tblCell2.innerHTML = "600,000 - 800,000";
    tblCell3.innerHTML = "800,000 - 1,100,000";
    tblCell4.innerHTML = "1,100,000 - 2,000,000";
    tblCell5.innerHTML = "2,000,000 - above";
    if (netIncome <= 600000) {
      incomeTax = 0;
      cell1.innerHTML = "0";
      cell2.innerHTML = "0";
      cell3.innerHTML = "0";
      cell4.innerHTML = "0";
      cell5.innerHTML = "0";
    } else if (netIncome > 600000 && netIncome <= 800000) {
      incomeTax = 0.1 * (netIncome - 600000);
      cell1.innerHTML = "0";
      cell2.innerHTML = numberComma(incomeTax);
      cell3.innerHTML = "0";
      cell4.innerHTML = "0";
      cell5.innerHTML = "0";
    } else if (netIncome > 800000 && netIncome <= 1100000) {
      incomeTax = 0.1 * 200000 + 0.2 * (netIncome - 800000);
      cell1.innerHTML = "0";
      cell2.innerHTML = numberComma(0.1 * 200000);
      cell3.innerHTML = numberComma(0.2 * (netIncome - 800000));
      cell4.innerHTML = "0";
      cell5.innerHTML = "0";
    } else if (netIncome > 1100000 && netIncome <= 2000000) {
      incomeTax = 0.1 * 200000 + 0.2 * 300000 + 0.3 * (netIncome - 1100000);
      cell1.innerHTML = "0";
      cell2.innerHTML = numberComma(0.1 * 200000);
      cell3.innerHTML = numberComma(0.2 * 300000);
      cell4.innerHTML = numberComma(0.3 * (netIncome - 1100000));
      cell5.innerHTML = "0";
    } else if (netIncome > 2000000) {
      incomeTax =
        0.1 * 200000 +
        0.2 * 300000 +
        0.3 * 900000 +
        0.36 * (netIncome - 2000000);
      cell1.innerHTML = "0";
      cell2.innerHTML = numberComma(0.1 * 200000);
      cell3.innerHTML = numberComma(0.2 * 300000);
      cell4.innerHTML = numberComma(0.3 * 900000);
      cell5.innerHTML = numberComma(0.36 * (netIncome - 2000000));
    }
  }

  let yit = document.querySelector(".yearly-it");
  let mit = document.querySelector(".monthly-it");
  let rbt = document.querySelector(".f-rebate");
  let monthlyTax = 0;
  let fmlRebate = 0;

  if (
    sex.toLowerCase() == "female" &&
    maritalStatus.toLowerCase() == "unmarried"
  ) {
    finalTax = numberComma(incomeTax - 0.1 * incomeTax);
    monthlyTax = numberComma((incomeTax - 0.1 * incomeTax) / taxDuration);
    fmlRebate = numberComma(0.1 * incomeTax);
  } else {
    finalTax = numberComma(incomeTax);
    monthlyTax = numberComma(incomeTax / taxDuration);
    fmlRebate = 0;
  }
  yit.innerHTML = `Yearly Income Tax: ${finalTax}`;
  mit.innerHTML = `Monthly Income Tax: ${monthlyTax}`;
  rbt.innerHTML = `Female Rebate: ${fmlRebate}`;
}

document.querySelector(".close-btn").addEventListener("click", () => {
  bod.classList.remove("show-tax");
});

document.querySelector("#aff").addEventListener("change", (e) => {
  let rfaText = document.querySelector("#rfAllow");
  let rfdText = document.querySelector("#rfDedu");
  let rfaTblText = document.querySelector("#rfa-tbl");
  let rfdTblText = document.querySelector("#rfd-tbl");

  if (e.currentTarget.checked) {
    rfaText.innerHTML = "Retirement Fund Allowance (PF/CIT/SSF)";
    rfdText.innerHTML = "Retirement Fund Deduction (PF/CIT/SSF)";
    rfaTblText.innerHTML = "Retirement Fund (PF/CIT/SSF)";
    rfdTblText.innerHTML = "Retirement Fund (PF/CIT/SSF)";
  } else {
    rfaText.innerHTML = "Retirement Fund Allowance (PF/CIT)";
    rfdText.innerHTML = "Retirement Fund Deduction (PF/CIT)";
    rfaTblText.innerHTML = "Retirement Fund (PF/CIT)";
    rfdTblText.innerHTML = "Retirement Fund (PF/CIT)";
  }
  autoCalc();
  limitRF();
});

function limitRF() {
  let isChecked = document.querySelector("#aff");
  let fieldVal = parseInt(document.querySelector("#rf-dedu").value);
  let field = document.querySelector("#rf-dedu");

  if (isChecked.checked) {
    field.setAttribute("max", "500000");
    if (fieldVal >= 500000) {
      field.value = "500000";
    }
  } else {
    field.setAttribute("max", "300000");
    if (fieldVal >= 300000) {
      field.value = "300000";
    }
  }
}

document.querySelector("body").addEventListener("click", () => {
  limitRF();
});

function grossIncomeCalculation() {
  let miValue = parseFloat(
    document.querySelector("#monthly-income").value
  ).toFixed(2);
  let miDuration = parseFloat(document.querySelector("#mi-dur").value).toFixed(
    2
  );

  let rfValue = parseFloat(document.querySelector("#fund-allow").value).toFixed(
    2
  );
  let rfDuration = parseFloat(document.querySelector("#rf-dur").value).toFixed(
    2
  );

  let faValue = parseFloat(
    document.querySelector("#festive-allow").value
  ).toFixed(2);
  let faDuration = parseFloat(document.querySelector("#fa-dur").value).toFixed(
    2
  );

  let oaValue = parseFloat(
    document.querySelector("#other-allow").value
  ).toFixed(2);
  let oaDuration = parseFloat(document.querySelector("#oa-dur").value).toFixed(
    2
  );

  if (isNaN(miValue)) miValue = 0;
  if (isNaN(rfValue)) rfValue = 0;
  if (isNaN(faValue)) faValue = 0;
  if (isNaN(oaValue)) oaValue = 0;

  let grossIncome = parseFloat(
    miValue * miDuration +
      rfValue * rfDuration +
      faValue * faDuration +
      oaValue * oaDuration
  ).toFixed(2);
  return grossIncome;
}

document.querySelector("#monthly-income").addEventListener("change", () => {
  let gIncome = grossIncomeCalculation();

  let gI = document.querySelector("#gi-field");
  gI.value = numberComma(gIncome);
});

document.querySelector("#fund-allow").addEventListener("change", () => {
  let gIncome = grossIncomeCalculation();

  let gI = document.querySelector("#gi-field");
  gI.value = gIncome;
});

document.querySelector("#festive-allow").addEventListener("change", () => {
  let gIncome = grossIncomeCalculation();

  let gI = document.querySelector("#gi-field");
  gI.value = gIncome;
});

document.querySelector("#other-allow").addEventListener("change", () => {
  let gIncome = grossIncomeCalculation();

  let gI = document.querySelector("#gi-field");
  gI.value = gIncome;
});

document.querySelector("#mi-dur").addEventListener("change", () => {
  let gIncome = grossIncomeCalculation();

  let gI = document.querySelector("#gi-field");
  gI.value = gIncome;
});

document.querySelector("#rf-dur").addEventListener("change", () => {
  let gIncome = grossIncomeCalculation();

  let gI = document.querySelector("#gi-field");
  gI.value = gIncome;
});

document.querySelector("#fa-dur").addEventListener("change", () => {
  let gIncome = grossIncomeCalculation();

  let gI = document.querySelector("#gi-field");
  gI.value = gIncome;
});

document.querySelector("#oa-dur").addEventListener("change", () => {
  let gIncome = grossIncomeCalculation();

  let gI = document.querySelector("#gi-field");
  gI.value = gIncome;
});

function numberComma(num) {
  return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

function retirementAllowCalc() {
  let m1 = parseFloat(document.querySelector("#monthly-income").value);
  let m2 = parseFloat(document.querySelector("#mi-dur").value);
  let totalMonth = m1 * m2;

  let reAllow = 0.1833 * totalMonth;
  return reAllow;
}

function retireDeducCalc() {
  let m1 = parseFloat(document.querySelector("#monthly-income").value);
  let m2 = parseFloat(document.querySelector("#mi-dur").value);
  let totalMonth = m1 * m2;

  let reDeduc = 0.31 * totalMonth;

  if (reDeduc > 500000) {
    reDeduc = 500000;
  }
  return reDeduc;
}

function autoCalc() {
  let rAllow = retirementAllowCalc();
  let rDeduc = retireDeducCalc();

  let retireA = document.querySelector("#fund-allow");
  retireA.value = rAllow;

  let retireD = document.querySelector("#rf-dedu");
  retireD.value = rDeduc;
}

document.querySelector("#monthly-income").addEventListener("change", () => {
  autoCalc();
});
