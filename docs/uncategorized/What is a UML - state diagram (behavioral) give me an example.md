---
title: "What is a UML - state diagram (behavioral) give me an example"
description: "A state diagram, also known as a state machine diagram or statechart, is a type of behavioral diagram in UML that shows the sequence of states an obje"
date: 2023-01-29T11:52:18.081Z
tags: []
---
A state diagram, also known as a state machine diagram or statechart, is a type of behavioral diagram in UML that shows the sequence of states an object or system goes through during its lifetime in response to events.

Example2: A simple state diagram for a traffic light system that has three states: Red, Yellow, and Green. The state transitions occur in response to time or events such as pressing a pedestrian crossing button.

Example2: A door going through three states. Open -> closed -> locked. 
![](/images/3902dc98-2ffb-4668-85a2-e16b2fdb2e73-image.png)

States
A state is denoted by a round-cornered rectangle with the name of the state written inside it.

![](/images/f2bd39da-b89f-48d0-85f2-de15a1ebf8a1-image.png)


Initial and Final States
The initial state is denoted by a filled black circle and may be labeled with a name. The final state is denoted by a circle with a dot inside and may also be labeled with a name.

![](/images/a7aef75a-9ec7-47a4-86ad-37aa10fd4159-image.png)


Transitions
Transitions from one state to the next are denoted by lines with arrowheads. A transition may have a trigger, a guard and an effect, as below.

![](/images/0ec985d2-f2ec-40f2-9d69-1867e81df3ed-image.png)


State Actions
In the transition example above, an effect was associated with the transition. If the target state had many transitions arriving at it, and each transition had the same effect associated with it, it would be better to associate the effect with the target state rather than the transitions. This can be done by defining an entry action for the state. The diagram below shows a state with an entry action and an exit action.

![](/images/133b9713-64d0-4811-a3ac-1f5a331445f4-image.png)

Reference
https://chat.openai.com/chat

https://sparxsystems.com/resources/tutorials/uml2/state-diagram.html#:~:text=A%20state%20machine%20diagram%20models,goes%20through%20during%20its%20lifetime.

