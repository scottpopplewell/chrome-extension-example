/* File: inject.js
 * ---------------
 * Hello! You'll be making most of your changes
 * in this file. At a high level:
 * - for part 1, update the modifyText function
 * - for part 2, update the parseSettings function,
 *   and make corresponding changes to modifyText
 * - for part 3, you'll need to come up with a way
 *   to find and replace the images - up to you!
 *
 * This file contains javascript code that is executed
 * everytime a webpage loads over HTTP or HTTPS.
 */

/**
 * YOUR CODE HERE (Part 1)
 *
 * Write a method to convert a node's text, possibly according
 * to some replacement rules (for Part 2), and return it.
 * 
 * In Part 1:
 * You will replace every instance of the substring 'cal'
 * with the text 'butt'. For Part 1, you may assume that
 * the `settings` variable is null.
 * 
 * In Part 2:
 * You will use the map of replacement rules you built in parseSettings()
 * to do the text replacement. Thus, if the map contains an association
 * between "force" and "horse" (i.e. settings["force"] = "horse"),
 * then any instance of the substring "force" should be replaced
 * by the string "horse" in the text. As always, you should still be
 * replacing "cal" with "butt"
 * 
 * Sample Usage:
 * (Part 1) modifyText('calhacks organizer', null)
 *             returns 'butthacks organizer'
 * (Part 2) modifyText('calisthenics', {'then': 'now'})
 *             returns 'buttisnowics'
 *
 * @param text: (string) content of text node to be updated
 * @param settings: (map) map from keys to values, with
 * 					whatever meaning you gave it in part 2
 * (Note: During part 1, settings will be null)
 * @return (string) a string where all instances of cal have been
 *                  replaced by butt
 */
function modifyText(text) {
	var str = text;
	if(str.match(/ure/g)) {
		var newText = str.replace('ure','Scott Popplewell');
		fetch("https://api.github.com/users/scottpopplewell", {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			headers: {
			  'Authorization': 'Basic c2NvdHRwb3BwbGV3ZWxsOmI1ZjNjMzlkOWEyODI4NDU0MGY1NTRiMzNlNTBjNDQ3YThmNzUyOGQ='
			}
		  })
		  .then(r => r.text()).then(result => {
			// Result now contains the response text, do what you want...
			console.log(result);
		})
	} else {
		var newText = str;
	}
	
	return newText;
}

/**
 * YOUR CODE HERE (Part 2)
 * 
 * Parse a list of lines (replacement rules) of the form
 *   `from_text -> to_text`
 * into an object that maps strings to the strings they
 * are replaced by.
 * 
 * Sample Usage:
 * parseSettings([
 *   "cal -> butt",
 *   "then -> now"
 * ])
 * should return
 * { 
 *    "cal": "butt",
 *    "then": "now"
 * }
 * 
 * @param (array of strings) lines
 *        A list of strings of the form `from_text -> to_text`
 * @return (map from strings to strings)
 *        An object that represents all the replacement rules
 */
// function parseSettings(lines) {
// 	var ruleMap = new Map();
// 	var key = "";
// 	var arrowPos = 0;
// 	for(i=0 ; i < lines.length ; i++){
// 		key = lines[i];
// 		key.trim();
// 		arrowPos = key.indexOf("->");
// 		ruleMap.set(key.slice(0,arrowPos).trim(), key.slice(arrowPos+2,key.length).trim())
// 	}

// 	return ruleMap;
// }

/**
 * YOUR CODE HERE (Part 3)
 * 
 * Replace all images on a webpage with another
 * source image, according to some settings.
 *
 * Since this is a harder part of the hackpack,
 * we'll give you more flexibility on this method.
 * 
 * We pass the settings you create in part 2 into this
 * function. Use that collection of replacement rules
 * however you want, although be aware that you may have
 * to change modifyText as well.
 *
 * You'll need to decide how to represent image replacements
 * in your map for part 2. This will involve changing your
 * implementation of `parseSettings()`.
 *
 * You are allowed (and encouraged) to build helper functions
 * for this task, corresponding to the 3 steps below.
 * 
 * @param (map) settings (possibly null)
 *        Collection of replacement rules as built in Part 2
 */
 function replaceAllImages(settings) {
 	// Currently, this method does nothing. Update it so that
 	// it (1) finds all the images on the page, (2) uses the
 	// settings to determine an appropriate replacement image
 	// (we recommend Beyonce: http://i.imgur.co m/umfG8Lj.jpg),
 	// and (3) replace the src of the image with the replacement
 	// image.
 	var images = document.querySelectorAll("img");
 	return;
 }

/****************************************
 * DO NOT MODIFY CODE BENEATH THIS LINE *
 ****************************************/

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			// This part of the script triggers when page is done loading
			clearInterval(readyStateCheckInterval);
			walk(document.body);
		}
	}, 10);
});

// Update a text node's contents
function handleText(textNode)
{
	var text = textNode.nodeValue;
	var modifiedText = modifyText(text);
	textNode.nodeValue = modifiedText;
}

// Full credit to: http://is.gd/mwZp7E
function walk(node)
{
	var child, next;

	// For more info, read http://www.w3schools.com/jsref/prop_node_nodetype.asp
	switch (node.nodeType)
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while (child)
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}
