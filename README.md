# mikey
Mikey is a node command-line tool for generating React Redux containers, React components, and React actions.

Inspired by Rails generate; React and other JS frameworks could use more organization and structure so this was created in response.

It is my belief that with organization and structure, applications can be built quicker with more efficiency.
___
To Install:

```$ npm install mikey -g```

Currently files are created in ./src/js/<actions, containers, components> folder.
___
To generate a new react file:

```$ mikey action fileName```  
___
To generate a new file and import one or multiple dependencies:

```$ mikey container fileName -i depName```  

or to import multiple dependencies:

```$ mikey component fileName -i depName -i depName -i depName -i depName```
___

For help and more commands:

```$ mikey -h```
