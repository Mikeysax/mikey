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

```$ mikey actionCreator fileName```  
___
To generate a new file and import one or multiple dependencies to top of file:

```$ mikey containerCreator fileName -i depName```  

or to import multiple dependencies to top of file:

```$ mikey componentCreator fileName -i depName -i depName -i depName```
___
If you import a dependency with curly brackets it will remove them like this:

```import {thisThing} from 'thisThing'```

If you import a dependency from something titled like this: ```import {connect} from 'react-redux';```

You can import it with a comma and it will split it correctly: ```$ mikey actionCreator thisActionFile -i {connect},react-redux```
___
Mikey remembers the things you've imported and stores them as defaults for each file type. This way, you will never have to import the same file over and over again for each action, container, or component.

You can include defaults by typing ```-d yes``` at the end of the generation command:

```$ mikey componentCreator JimmyBob -i {gravy},train-attack -d yes```

To erase defaults, it is as simple as: ```$ mikey erase actions```

Or if you want to erase all defaults: ```$ mikey erase all``` | ```$ mikey -e all```

___
For help and more commands:

```$ mikey -h```
___
If you would like to contribute, it would be greatly appreciated.

Looking to add much more to this such as :

More Templates, Dynamic Folder Finding, Authentication Generation, Auto dependency installation, and more...
