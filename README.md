# mikey
Mikey is a node command-line tool for generating React-Redux projects,  React-Redux containers, React components, React actions, React reducers, and React helpers.

Inspired by Rails generate; React and other JS frameworks could use more organization and structure so this was created in response.

It is my belief that with organization and structure, applications can be built quicker with more efficiency.

To Read More: http://mikeysax.com/mikey-react-generator
___
To Install:

```$ npm install mikey -g```
___
To Generate a new project:

```$ mikey new projectName```

When you generate a new project, it will run npm install automatically in the created project directory. All you have to do is be patient, it is not frozen.

Once it is done, you can start the server with:

```webpack-dev-server --inline --hot --watch-poll```

or for vagrant:

```webpack-dev-server --inline --hot --host 0.0.0.0 --watch-poll```

Projects generated with Mikey are Heroku compatible.
___
To generate a new react file:

```$ mikey actionCreator fileName```

```$ mikey componentCreator fileName```   

```$ mikey containerCreator fileName```  

```$ mikey reducerCreator fileName```  

```$ mikey helperCreator fileName```  

Mikey will look through your working directory for actions/components/containers/reducers/helpers folder and create the corresponding file type. If none of these folders exist, mikey will create them in the root of where you ran the command.
___
To generate a new file and import one or multiple dependencies to top of file:

```$ mikey containerCreator fileName -i depName```  

or to import multiple dependencies to top of file:

```$ mikey componentCreator fileName -i depName -i depName -i depName```
___
If you import a dependency with curly brackets it will remove them like this:

```import {thisThing} from 'thisThing'```

If you import a dependency from something titled like this:

```import {connect} from 'react-redux';```

You can import it with a comma and it will split it correctly:

```$ mikey actionCreator thisActionFile -i {connect},react-redux```
___
Mikey will remember the things you've imported and store them as defaults for each file type. This way, you will never have to import the same file over and over again for each action, container, or component. Also stored imports, are only stored once.

You can include defaults by typing ```-d Y``` (Yes) for using defaults, at the end of the generation command:

```$ mikey componentCreator JimmyBob -i {gravy},train-attack -d Y```

To erase defaults, it is as simple as:

```$ mikey erase actions``` | ```$ mikey -e components``` | ```$ mikey erase containers``` | ```$ mikey -e helpers``` | ```$ mikey erase reducers```

If you want to erase all stored defaults:

```$ mikey erase all```    |    ```$ mikey -e all```

___
For help and more commands:

```$ mikey -h```
___
If you would like to contribute, it would be greatly appreciated.

Looking to add much more to this such as :

More Templates, User Authentication Generation, Auto dependency installation, and more...
