class Person:

    def __init__(self,name,age):
        self.age = age
        self.name = name
        
    def greet(self,name):
        print("Hello",name,". My name is",self.name)
        
    def __str__(self):
        return ""+str(self.age)+" "+self.name
        
class Employee(Person):
    
    def __init__(self,name,age,job):
        super().__init__(name,age)
        self.job = job
    
    def greet(self,name):
        print("Hello",name,". My name is",self.name," and I work as a",self.job)
        
        
def main():
    p = Person("Matti",25)
    p.greet("Jaska")
    print(p)
    e = Employee("Pekka",50,"Koodari")
    e.greet("Jaska")
    print(e)
    
if __name__ == "__main__":
    main()