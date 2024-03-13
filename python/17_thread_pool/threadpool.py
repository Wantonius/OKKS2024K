import queue
import threading
from time import sleep
from random import randint

class ThreadPool():
    
    def __init__(self,no_of_threads):
        self.no_of_threads = no_of_threads
        self.threads = []
        self.queue = queue.Queue()
    
    def start_pool(self):
        for i in range(self.no_of_threads):
            print("Thread {}".format(i))
            t = threading.Thread(target=self.do_work,args=(i,))
            self.threads.append(t)
            t.start()
        
    def do_work(self,id):
        while True:
            work = self.queue.get()
            if work is None:
                break
            print("Thread {} acquired work".format(id))
            func = work[0]
            args = work[1:]
            func(*args)
            self.queue.task_done()

        
    def add_work(self,*args):
        self.queue.put(args)
        
    def stop_pool(self):
        for i in range(self.no_of_threads):
            self.queue.put(None)
        for j in range(len(self.threads)):
            self.threads[j].join()
           
def some_work(id,value):
    print("{0},Going to sleep for {1} seconds".format(id,value))
    sleep(value)
    print("{}, woke up. Work done".format(id))

    
def main():
    pool = ThreadPool(4)
    pool.start_pool()
    for i in range(10):
        pool.add_work(some_work,i,randint(0,5))
    pool.stop_pool()
    
if __name__ == "__main__":
    main()