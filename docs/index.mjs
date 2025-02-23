"use strict";
import * as transfer from "./transfer.mjs";

const DEFAULT_VALUES = Object.freeze({
    balanceFrom: 0,
    balanceTo: 0,
    minFrom: 0,
    maxTo: 20000,
    minTransfer: 1000
});

document.addEventListener("DOMContentLoaded", () => {
    const balanceFrom = document.getElementById("balanceFrom");
    const balanceTo = document.getElementById("balanceTo");
    const minFrom = document.getElementById("minFrom");
    const maxTo = document.getElementById("maxTo");
    const minTransfer = document.getElementById("minTransfer");

    function onChange(event) {
        const result = document.getElementById("result");
        const account1 = new transfer.Account(parseInt(minFrom.value), 1000000, parseInt(balanceFrom.value));
        const account2 = new transfer.Account(0, parseInt(maxTo.value), parseInt(balanceTo.value));
        const goodTransfer = new transfer.Transfer(account1, account2, transfer.Transfer.TARGET.FROM, parseInt(minTransfer.value));
        result.textContent = goodTransfer.calculate();
    }
    balanceFrom.addEventListener("change", onChange);
    balanceTo.addEventListener("change", onChange);
    minFrom.addEventListener("change", onChange);
    maxTo.addEventListener("change", onChange);
    minTransfer.addEventListener("change", onChange);

    // URLのパラメータ取得
    const url = new URL(window.location.href);
    function isParsableInt(str) {
        const num = parseInt(str);
        return Number.isInteger(num) && String(num) == str;
    }
    balanceFrom.value = isParsableInt(url.searchParams.get("balanceFrom")) ? url.searchParams.get("balanceFrom") : DEFAULT_VALUES.balanceFrom;
    balanceTo.value = isParsableInt(url.searchParams.get("balanceTo")) ? url.searchParams.get("balanceTo") : DEFAULT_VALUES.balanceTo;
    minFrom.value = isParsableInt(url.searchParams.get("minFrom")) ? url.searchParams.get("minFrom") : DEFAULT_VALUES.minFrom;
    maxTo.value = isParsableInt(url.searchParams.get("maxTo")) ? url.searchParams.get("maxTo") : DEFAULT_VALUES.maxTo;
    minTransfer.value = isParsableInt(url.searchParams.get("minTransfer")) ? url.searchParams.get("minTransfer") : DEFAULT_VALUES.minTransfer;

    onChange(null);

    // 設定コンテナのボタン制御
    document.getElementById("settings-button").addEventListener("click", () => {
        const settingsContainer = document.getElementById("settings-container");
        settingsContainer.classList.toggle("hidden"); // hiddenのon/off切り替え
    });
});
