"use strict";

import * as transfer from "../docs/transfer.mjs";

test(
    "", () => {
        expect(transfer.compare(118001, 119001)).toBeGreaterThan(0);
    }
);

test(
    "", () => {
        expect(transfer.compare(0, 1000)).toBeGreaterThan(0);
    }
);

test(
    "", () => {
        expect(transfer.compare(500, 100)).toBeGreaterThan(0);
    }
);

test(
    "", () => {
        expect(transfer.compare(0, 500)).toBeGreaterThan(0);
    }
);

test(
    "", () => {
        const account1 = new transfer.Account(0, 200, 121);
        const account2 = new transfer.Account(0, 200, 170);
        const transfer1 = new transfer.Transfer(account1, account2, transfer.Transfer.TARGET.FROM, 10);
        expect(transfer1.calculate()).toBe(21);
    }
);

test(
    "", () => {
        const account1 = new transfer.Account(0, 200000, 120001);
        const account2 = new transfer.Account(0, 20000, 17621);
        const transfer1 = new transfer.Transfer(account1, account2, transfer.Transfer.TARGET.FROM, 1000);
        expect(transfer1.calculate()).toBe(2001);
    }
);

test(
    "", () => {
        const account1 = new transfer.Account(0, 200000, 1000);
        const account2 = new transfer.Account(0, 20000, 170);
        const transfer1 = new transfer.Transfer(account1, account2, transfer.Transfer.TARGET.FROM, 1000);
        expect(transfer1.calculate()).toBe(1000);
    }
);
