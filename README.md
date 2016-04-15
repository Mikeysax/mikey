# mikey
Mikey is a node command-line tool for generating React containers, components, and actions.
Inspired by Rails, React and other JS frameworks could use more organization and structure so this was created in response.
It is my belief that with organization and structure, applications can be built quicker with more efficiency.

___
To generate a new react file:

```$ mikey -a fileName```

or

```$ mikey action fileName```  
___
To generate a new file and import one or multiple dependencies:

```$ mikey -a fileName -i depName```  

or to import multiple dependencies:

```$ mikey -a fileName -i depName -i depName -i depName -i depName```
__

For help and more commands:

```$ mikey -h```
