// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "Single Quote Wrapper" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('linesinglequote.wrap', () => {
		// The code you place here will be executed every time your command is executed
		
		// Get the active editor.
		const editor = vscode.window.activeTextEditor;
		if(editor){
			//Get document en selection of said document
			const document = editor.document;
			const selection = editor.selection;

			// Get the text containing line breaks and add them to an Array
			// If the text doesn't contain line breaks, it still creates an Array (with just one entry).
			const word = document.getText(selection);
			const lineBreaks = word.split('\n');

			// Map the array,
			// add single quotes around every entry,
			// trim the whitespaces at the beginning of the entry,
			// add a whitespace and line break on the end of every entry.

			// If it's the last entry, don't add a new line break and whitespace at the end.
			const lineBreaksWithQuotes = lineBreaks.map((line, index) => {
				if (index === lineBreaks.length - 1){
					return "'" + line.trimStart() + "'";
				} else {
					return "'" + line.trimStart() + " '\n";
				}
			});

			// Replace the selection in the editor with the new string.
			editor.edit(editBuilder => {
				editBuilder.replace(selection, lineBreaksWithQuotes.join(''));
			});

		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
