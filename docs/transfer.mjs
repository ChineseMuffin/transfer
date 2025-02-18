"use strict";

export class Transfer {
    constructor(from, to, target, min) {
        this.from = from;
        this.to = to;
        this.target = target;
        this.min = min;
    }

    static TARGET = Object.freeze({
        FROM: -1,
        TO: +1,
    })

    calculate() {
        let result = 0;
        const targetBalance = this.target == Transfer.TARGET.FROM ? this.from.balance : this.to.balance;
        let goodTargetBalance = targetBalance;
        for (let i = this.min; this.from.balance - i >= this.from.min && this.to.balance + i <= this.to.max; i++) {
            if (compare(targetBalance + i * this.target, goodTargetBalance) > 0) {
                result = i;
                goodTargetBalance = targetBalance + i * this.target;
            }
        }
        return result;
    }
}

export class Account {
    constructor(min, max, balance) {
        this.min = min;
        this.max = max;
        this.balance = balance;
    }
}

export function compare(balance1, balance2) {
    const priority = [[1, 2, 3, 4, 6, 7, 8, 9], [5], [0]]
    function compareDigit(digit1, digit2) {
        let priority1 = 0;
        let priority2 = 0;
        for (let i = 0; i < priority.length; i++) {
            if (priority[i].includes(digit1)) priority1 = i; // JavaScriptではin演算子は要素ではなくメンバを調べる
            if (priority[i].includes(digit2)) priority2 = i;
        }
        return priority1 - priority2;
    }
    function eachDigit(number) {
        let result = []
        if (number == 0) result.push(0);
        while (number > 0) {
            result.push(number % 10);
            number = Math.floor(number / 10);
        }
        return result;
    }
    let eachDigit1 = eachDigit(balance1);
    let eachDigit2 = eachDigit(balance2);
    const maxDigits = Math.max(eachDigit1.length, eachDigit2.length);
    const eachDigit1Length = eachDigit1.length; // ループ中にサイズが変わらないように
    const eachDigit2Length = eachDigit2.length; // 々
    for (let i = 0; i < maxDigits - eachDigit1Length; i++) eachDigit1.push(0);
    for (let i = 0; i < maxDigits - eachDigit2Length; i++) eachDigit2.push(0);

    for (let i = 0; i < maxDigits; i++) {
        let result = compareDigit(eachDigit1[i], eachDigit2[i]);
        if (result == 0) continue;
        return result;
    }
    return - (balance1 - balance2);
}
