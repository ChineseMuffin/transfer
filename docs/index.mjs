"use strict";
import * as transfer from "./transfer.mjs";

document.addEventListener("DOMContentLoaded", () => {
    const balanceFrom = document.getElementById("balanceFrom");
    const balanceTo = document.getElementById("balanceTo");
    function onChange(event) {
        const result = document.getElementById("result");
        const account1 = new transfer.Account(0, 1000000, parseInt(balanceFrom.value));
        const account2 = new transfer.Account(0, 20000, parseInt(balanceTo.value));
        const goodTransfer = new transfer.Transfer(account1, account2, transfer.Transfer.TARGET.FROM, 1000);
        result.textContent = goodTransfer.calculate();
    }
    balanceFrom.addEventListener("change", onChange);
    balanceTo.addEventListener("change", onChange);
});
