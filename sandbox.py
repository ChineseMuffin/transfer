class Test2:
    seq_of_sets = (
        {1,2,3,4,6,7,8,9},{5},{0}
    )
    
    def __init__(self, numeral):
        self._numeral = numeral
        self._value = Test2._get_value(numeral)
        
    def __eq__(self, other):
        return self._value == other._value

    def __lt__(self, other):
        return self._value < other._value
        
    def _get_value(numeral: int) -> int:
        for i, s in enumerate(Test2.seq_of_sets):
            if numeral in s:
                return i
        raise Exception
    
def kakuketa_generator(num: int):
    base = 10
    n = num
    for i in range(exp := 10):
        if n < base:
            yield n
            return
        n, numeral = divmod(n, base)
        yield numeral


def compare(num1: int, num2: int) -> int:
    gen1 = kakuketa_generator(num1)
    gen2 = kakuketa_generator(num2)
    
    stop = [False]
    
    def get(gen, stop):
        try:
            return next(gen)
        except StopIteration:
            stop[0] = True
            return 0

    for i in range(exp := 10):
        numeral1 = get(gen1, stop)
        numeral2 = get(gen2, stop)
        
        if Test2(numeral2) < Test2(numeral1):
            return 1
        if Test2(numeral1) < Test2(numeral2):
            return -1
        if stop[0]:
            return num2 - num1

def _main():
    num1 = 520
    num2 = 521
    res = compare(num1, num2)
    print(res)


if __name__ == "__main__":
    _main()
