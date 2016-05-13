## Version History and Changes

This file contains the version history for Meteor Blast. Currently still in pre-release. At `v0.4.1` and prior changes were being pushed directly to the master branch. From here on, new releases and features will be worked on in separate branches and then merged and tagged into the master branch. The master branch will always have the latest version that can be installed and run following the instructions in the `README.md` file.

Currently using basic semantic versioning: `major.minor.patch`. For the purposes of this project `major` will be any new release, which could include major functional and structural changes. `minor` could include changes to the file structure that don't alter the functionality of the project. While in `major: 0` this will also include other possible breaking changes. `patch` will include small bug fixes and cosmetic changes.

Currently this file is located in `/public/docs/` because it is being pulled into the chat room help panel.



* Fixed issues causing perpetual loading screen

#### v0.4.1
* Creation of the HISTORY.md, ISSUES.md, TODO.md and LICENSE files
* Added docs subfolder to public for serving
* Restructuring the template helpers folder
* Cosmetic changes to the admin dashboard
* Changes to Rooms and Messages collection for path toward multi-room functionality
* Fixed a bug that stopped key commands from working
* Created a small debug package to give more information and hide when not in development
* Added some cleanup when chat template is destroyed
* Removed markdown atmosphere package and added npm markdown package
* Grouped consecutive messages if same user

#### v0.3.1
* Moved all templates to imports dir
* Restructured Users collection
* Merged in Admin dashboard
* Breaking Change: Created simple roles package (removed alanning:roles)
* Adding admin only commands
* Scrolling to bottom on all messages

#### v0.2.1
* Breaking Change: Added Rooms collection
* Messages now save what room they belong to
* Room name and topic now come from db

##### v0.1.3
* Fixed IE flex issue

##### v0.1.2
* Added support for key/shortcut commands
* Added Alt + T for time
* Added Alt + Down Arrow to scroll to bottom from anywhere
* Made sidebar header link to "home"
* Fixed padding issue in message field
* Fixed scrolling and header sizing in sidebar
* Updated default profile image set to better show shading
