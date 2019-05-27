// ability to use one method with different realization.

class A {
  printValue(){
    console.log('Hello from A');
  }
}

class B extends A {
  printValue(){
    console.log('Hello from B');
  }
}

for(const entity of [new A(), new B]){
  entity.printValue()
}



