def main():
    greet()
    add(5,10)
    subtract(50,25)
    subtract()
    result = find_sum(1,5,60,15,25)
    print("Result is",result)
    print("Result is",find_sum())
    print("Factorial of 6 is",factorial(6))

def greet():
    print("Hello World")

def add(a,b):
    result = a + b
    print("Sum is",result)
    
def subtract(a=0,b=0):
    result = a - b 
    print("Result is",result)

def find_sum(*numbers):
    result = 0
    
    for num in numbers:
        result = result + num

    return result
    
def factorial(num):
    if num == 1:
        return 1
    else:
        return (num * factorial(num-1))
    
if __name__ == "__main__":
    main()