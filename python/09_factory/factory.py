class IConverter():
    def convert(self,amount,currency):
        pass
        

class DollarConverter(IConverter):
    def convert(self,amount,currency):
        if currency == "euro":
            return amount * 1.09
        if currency == "yen":
            return amount * 0.0068
        return amount
        
class EuroConverter(IConverter):
    def convert(self,amount,currency):
        if currency == "dollar":
            return amount * 0.91
        if currency == "yen":
            return amount * 0.0062
        return amount
        
class YenConverter(IConverter):
    def convert(self,amount,currency):
        if currency == "dollar":
            return amount * 147.38
        if currency == "euro":
            return amount * 161.07
        return amount
        
def Factory(currency = "dollar"):
    currencyConverters = {
        "dollar":DollarConverter,
        "euro":EuroConverter,
        "yen":YenConverter
    }
    
    return currencyConverters[currency]()
    
def main():

    converters = []
    converters.append(Factory("dollar"))
    converters.append(Factory("euro"))
    converters.append(Factory("yen"))
    
    for c in converters:
        print("Dollars:",str(c.convert(100,"dollar")))
        print("Euros:",str(c.convert(100,"euro")))
        print("Yens:",str(c.convert(10000,"yen")))
        
        
if __name__ == "__main__":
    main()