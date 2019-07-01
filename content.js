let items = document.querySelectorAll("ul[class='nav nav-list bootstrap-sidenav docs-sidenav affix-top']  a");
let worklists = Array.from(items);
worklists.splice(0,1); // removing the first link because it's the "New Worklist" option

// I use an object that stores the actual names and their corresponding cloud stored names
let names = {};
chrome.storage.sync.get("nameKey", result => {
	if (result.nameKey)	names = result.nameKey;
	// looping through all current worklists and changing their name if needed
	for (let elem of worklists) {
		if (names.hasOwnProperty(elem.title)) {
			elem.innerHTML = names[elem.title];
		} 
	}
});

let courseForm = document.querySelector("form[onsubmit='return checkLinks();']");
let newWorkListli = document.querySelector("ul[class='nav nav-list bootstrap-sidenav docs-sidenav affix-top'] > li:first-child");

// to avoid displaying the renaming form when user is creating new worklist, I ensure newworklist li isn't selected
if (courseForm != null && newWorkListli != null && newWorkListli.className != "active") {
	let renameForm = document.createElement("form");	
	let renameDiv = document.createElement("div"); // necessary for input alignment
	renameForm.append(renameDiv);

	let renameButton = document.createElement("input");
	renameButton.className = "btn btn-primary";
	renameButton.type = "submit";
	renameButton.value = "Rename Worklist";	
	renameButton.style.float = "left";
	renameDiv.append(renameButton);

	
	let renameText = document.createElement("input");
	renameText.type = "text";
	renameText.size = "15";
	renameText.id = "renameInputField";
	renameText.style.marginLeft = "1%";
	renameText.style.visibility = "hidden";
	renameText.style.float = "left";
	renameDiv.append(renameText);


	let renameAlert = document.createElement("span");
	renameAlert.style.marginLeft = "2%";
	renameAlert.style.minWidth = "1%"; 
	renameDiv.append(renameAlert);

		
	renameForm.addEventListener("submit", event => {
		event.preventDefault();
		if (getComputedStyle(renameText).visibility === "hidden") {
			renameText.style.visibility = "visible";
		} else if (renameText.value){
			let val = renameText.value;
			if (isDuplicateName(val)) {
				renameAlert.innerHTML = "Worklist name already in use."
				return;
			}
			let curWorkLista = getCurWorkListLink();  
			curWorkLista.innerHTML = val;
			let originalWorkListName = curWorkLista.title;
			names[originalWorkListName] = val;
			renameText.style.visibility = "hidden";	
			renameAlert.innerHTML = "";
		}
		
	});
	courseForm.after(renameForm);
}

// takes a String input and returns true if any of the other worklists already have that name 
function isDuplicateName(input) {		
	for (let elem of worklists) {
		if (elem.closest("li").className != "active" && elem.innerHTML == input) {
			return true;
		}
	}
	return false;
}

// for deleting redudant names in storage
let delWorkListForm = document.querySelector("form[name='delworklist']");
if (delWorkListForm != null) {
	delWorkListForm.addEventListener("submit", () => {
		let curWorkLista = getCurWorkListLink();
		let originalName = curWorkLista.title;
		chrome.storage.sync.remove(originalName, () => {
			console.log(`Removed key '${originalName}' from storage`);
		});
	});
}	

// returns currently selected worklist in course schedule nav
function getCurWorkListLink() {
	let curWorkListli = document.querySelector("ul[class='nav nav-list bootstrap-sidenav docs-sidenav affix-top'] > li[class='active']");
	return curWorkListli.firstChild;
}


// for saving
window.addEventListener("unload", () => {
	chrome.storage.sync.set({nameKey: names});
});



 
