import sandbox

to_max_balance = 20000
to_balance = 321

from_min_balance = -50000
from_balance = -0

transfer_min_amount = 3000
transfer_unit = 100

min_delta = min(to_max_balance - to_balance, from_balance - from_min_balance)

transfer_amounts = range(transfer_min_amount, min_delta + 1, transfer_unit)

balance_after = map(lambda t: t + to_balance, transfer_amounts)

max_balance_after = to_balance
for b in balance_after:
    delta = sandbox.compare(b, max_balance_after)
    if delta > 0:
        max_balance_after = b


transfer_amount = max_balance_after - to_balance
from_balance_after = from_balance - transfer_amount
print(f"transfer: {transfer_amount}, to_balance: {max_balance_after}, from_balance: {from_balance_after}")
