---
title: "Structural Pattern-Composite"
description: "한 코드 내에서 일련의 메소드를 실행하게끔 구현했는데 다시 수정하려면 번거롭다. 메뉴를 추가하거나 제거할 때 마다 코드 수정이 필요한 번거로움 발생 컴포시트 패턴 적용 https&#x3A;//velog.io/@hyungjungoo95/Composite-Pattern"
date: 2022-09-07T04:55:07.370Z
tags: []
---
### Problem
Way of organizing complex structures

### Solution
Composite Pattern 
- Treat groups of similar objects as a  single object. 
- compose objects into tree structures to represent part-whole hierarchies.
- composite lets clients treat individual objects and compositions of objects uniformly.

### Problem
```java
public class CafeMenu implements Menu {
	HashMap<String, MenuItem> menuItems = new HashMap<String, MenuItem>();
  
	public CafeMenu() {
		addItem("Veggie Burger and Air Fries",
			"Veggie burger on a whole wheat bun, lettuce, tomato, and fries",
			true, 3.99);
		addItem("Soup of the day",
			"A cup of the soup of the day, with a side salad",
			false, 3.69);
		addItem("Burrito",
			"A large burrito, with whole pinto beans, salsa, guacamole",
			true, 4.29);
	}
 
	public void addItem(String name, String description, 
	                     boolean vegetarian, double price) 
	{
		MenuItem menuItem = new MenuItem(name, description, vegetarian, price);
		menuItems.put(name, menuItem);
	}
 
	public Map<String, MenuItem> getItems() {
		return menuItems;
	}
  
	public Iterator<MenuItem> createIterator() {
		return menuItems.values().iterator();
	}
}
```
Currently menu items are stored in hashmap. These menu items are initialized in the contstructor.
Values of the hashmap are gained by using iterator() method
When we are trying to make an ordering system with these classes. 
The waitress class makes three calls to printMenu and everything we add or remove a menu the code has to change. 

### Solution 
Utilize compoite pattern

structure 
- component interface extracts and differentiates simple and complex elements of the tree. 
- leaves are the workers 
- container delegates work to sub-elements. 
- client works with elements through the component interface. 

THE COMPONENT
```java
public abstract class MenuComponent {
   
	public void add(MenuComponent menuComponent) {
		throw new UnsupportedOperationException();
	}
	public void remove(MenuComponent menuComponent) {
		throw new UnsupportedOperationException();
	}
	public MenuComponent getChild(int i) {
		throw new UnsupportedOperationException();
	}
  
	public String getName() {
		throw new UnsupportedOperationException();
	}
	public String getDescription() {
		throw new UnsupportedOperationException();
	}
	public double getPrice() {
		throw new UnsupportedOperationException();
	}
	public boolean isVegetarian() {
		throw new UnsupportedOperationException();
	}
  
	public void print() {
		throw new UnsupportedOperationException();
	}
}
```

THE COMPOSITE 
```java
public class MenuItem extends MenuComponent {
	String name;
	String description;
	boolean vegetarian;
	double price;
    
	public MenuItem(String name, 
	                String description, 
	                boolean vegetarian, 
	                double price) 
	{ 
		this.name = name;
		this.description = description;
		this.vegetarian = vegetarian;
		this.price = price;
	}
  
	public String getName() {
		return name;
	}
  
	public String getDescription() {
		return description;
	}
  
	public double getPrice() {
		return price;
	}
  
	public boolean isVegetarian() {
		return vegetarian;
	}
  
	public void print() {
		System.out.print("  " + getName());
		if (isVegetarian()) {
			System.out.print("(v)");
		}
		System.out.println(", " + getPrice());
		System.out.println("     -- " + getDescription());
	}
}
```

THE COMPOSITE
```java
import java.util.Iterator;
import java.util.ArrayList;

public class Menu extends MenuComponent {
	ArrayList<MenuComponent> menuComponents = new ArrayList<MenuComponent>();
	String name;
	String description;
  
	public Menu(String name, String description) {
		this.name = name;
		this.description = description;
	}
 
	public void add(MenuComponent menuComponent) {
		menuComponents.add(menuComponent);
	}
 
	public void remove(MenuComponent menuComponent) {
		menuComponents.remove(menuComponent);
	}
 
	public MenuComponent getChild(int i) {
		return (MenuComponent)menuComponents.get(i);
	}
 
	public String getName() {
		return name;
	}
 
	public String getDescription() {
		return description;
	}
 
	public void print() {
		System.out.print("\n" + getName());
		System.out.println(", " + getDescription());
		System.out.println("---------------------");
  
		Iterator<MenuComponent> iterator = menuComponents.iterator();
		while (iterator.hasNext()) {
			MenuComponent menuComponent = 
				(MenuComponent)iterator.next();
			menuComponent.print();
		}
	}
}
```
- MenuComponent  provides default implementation for methods. 
- The print() method just like before composite implementation, overrides Menucomponent class. It prints complete menu entry 
- New element types can be created without breaking existing code - MenuItem, Menu, MORE! 

---

java-design-structural pattern-composite-features-000