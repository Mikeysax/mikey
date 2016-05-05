# mikey
Mikey is a node command-line tool for generating React-Redux projects,  React-Redux containers, components, actions, reducers, helpers, and API User Authentication.

Inspired by Rails generate and Devise; React and other JS frameworks could use more organization and structure so this was created in response.

It is my belief that with organization and structure, applications can be built quicker with more efficiency.

To Read More: http://mikeysax.com/mikey-react-generator
___
<strong>To Install Mikey:</strong>

```$ npm install mikey -g```
___
<strong>To Generate a new project:</strong>

```$ mikey new projectName```

When you generate a new project, it will run npm install automatically in the created project directory. All you have to do is be patient, it is not frozen.

Once it is done, you can start the server with:

```npm run serve```

which will run ```webpack-dev-server --inline --hot --watch-poll```

or for vagrant:

```npm run vagrant```

which will run ```webpack-dev-server --inline --hot --host 0.0.0.0 --watch-poll```

Projects generated with Mikey are Heroku compatible.
___
<strong>To generate a new react file:</strong>

```$ mikey actionCreator fileName```

```$ mikey componentCreator fileName```   

```$ mikey containerCreator fileName```  

```$ mikey reducerCreator fileName```  

```$ mikey helperCreator fileName```  

Mikey will look through your working directory for actions/components/containers/reducers/helpers folder and create the corresponding file type. If none of these folders exist, Mikey will create them in the root of where you ran the command.

Mikey also creates ```.mikeyPath``` folder in your project and saves the path of the file type generated. This is to optimize the speed of creation afterwards so Mikey does not have to dynamically find the folder again after each generated file.

If your project directory changes at all, delete ```.mikeyPath``` folder to recache folder paths. ```.mikeyPath``` folder is added to ```.gitignore``` also.

You cannot create files that already exist.
___
<strong>To generate a new file and import one or multiple dependencies to top of file:</strong>

```$ mikey containerCreator fileName -i depName```  

or to import multiple dependencies to top of file:

```$ mikey componentCreator fileName -i depName -i depName -i depName```

If you import a dependency with curly brackets it will remove them like this:

```import {thisThing} from 'thisThing'```

If you import a dependency from something titled like this:

```import {connect} from 'react-redux';```

You can import it with a comma and it will split it correctly:

```$ mikey actionCreator thisActionFile -i {connect},react-redux```
___
<strong>Mikey will remember</strong> the things you've imported and store them as defaults for each file type. This way, you will never have to import the same file over and over again for each action, container, or component. Also stored imports, are only stored once.

You can include defaults by typing ```-d Y``` (Yes) for using defaults, at the end of the generation command:

```$ mikey componentCreator JimmyBob -i {gravy},train-attack -d Y```
___
<strong>To list defaults:</strong>

```$ mikey list actions``` | ```$ mikey -l components``` | ```$ mikey list containers``` | ```$ mikey -l helpers``` | ```$ mikey list reducers```

If you want to list all stored defaults:

```$ mikey list all```    |    ```$ mikey -l all```
___
<strong>To erase defaults:</strong>

```$ mikey erase actions``` | ```$ mikey -e components``` | ```$ mikey erase containers``` | ```$ mikey -e helpers``` | ```$ mikey erase reducers```

If you want to erase all stored defaults:

```$ mikey erase all```    |    ```$ mikey -e all```
___
<strong>Adding API User Authentication:</strong>

If you would like to add user authentication:

```$ mikey authCreator entryFileName```

The entryFileName in a Mikey generated project is App.js:

```$ mikey authCreator App```

When you generate user authentication files, Mikey will modify your ```routes.js``` and ```entryFile``` file with proper imports, and other various text. A EntryPoint container will be created, and is where SignIn and SignUp direct to.

After User Auth is done, you will need to add the API url to ```urlFor.js``` file in helpers, add your API public key to the ```publicKey.js``` file in helpers, and in the three action files that were generated, you can change the end of the URL to match your API routes for user authentication.

Each file with necessary API or URL change will have commented code needed to be changed.

Do not forget to change the ```routes.js``` route order to your apps liking.

<Strong>Caution</Strong>: Adding API User Authentication outside a Mikey generated project might have edge cases that were not accounted for yet. Please report any bugs or issues.
___
<strong>For help and more commands:</strong>

```$ mikey -h```
___
If you would like to contribute, it would be greatly appreciated.

Looking to add much more to this such as :

More Templates, Auto dependency installation, and more?...

Also, if you have an idea or suggestion, please feel free to contact me.
