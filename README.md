# UBC-Worklist-Renamer (Chrome browser extension)
Rename UBC course schedule worklists! 

The UBC course schedule allows students to create worklists to organize courses they want to eventually register in. However, once you create your worklist and give it a name - it can't be changed at all. 

This is solved this by adding a renaming functionality that appears on each worklist, able to save all your new names to an object that is stored in Chrome's cloud cache; you will have access to these worklist names as long as you are on logged into a chrome broswer on any device. Obviously, since this is a purely front-end endeavour (I don't have access to the server-side tech), removing the extension or logging into ssc from a browser that isn't Chrome will show the default names. 

Here is a list of known bugs that are a result of this limitation: 
  - users may create new worklists that have the same name as one of the edited new names
  - users will be unable to create a new worklist if it has the same name as any of the original worklist names (even if they've been renamed)
