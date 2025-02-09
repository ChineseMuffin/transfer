"use strict";
import * as transfer from "./transfer.mjs";

document.addEventListener("DOMContentLoaded", () => {
    const balance1 = document.getElementById("balance1");
    const balance2 = document.getElementById("balance2");
    function onChange(event) {
        const goodTransferH = document.getElementById("goodTransfer");
        const account1 = new transfer.Account(0, 1000000, parseInt(balance1.value));
        const account2 = new transfer.Account(0, 20000, parseInt(balance2.value));
        const goodTransfer = new transfer.Transfer(account1, account2, transfer.Transfer.TARGET.FROM, 1000);
        goodTransferH.textContent = goodTransfer.calculate();
    }
    balance1.addEventListener("change", onChange);
    balance2.addEventListener("change", onChange);
});
