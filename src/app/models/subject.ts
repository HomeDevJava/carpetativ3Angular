export class Subject{
    observers: any[];
    constructor(){
        this.observers = [];
    }
    subscribe(observer){
      this.observers.push(observer);
    }
    unsubscribe(observer){
      this.observers = this.observers.filter(item => item !== observer);
    }
    notify(event){
      this.observers.forEach(observer => observer.update(event));
    }
}