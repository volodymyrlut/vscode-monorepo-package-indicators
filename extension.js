const vscode = require("vscode");

// Get the package name from the file path
function getPackageName(filePath) {
  const packageMatch = filePath.match(/packages\/([^/]+)/);
  if (packageMatch) {
    return packageMatch[1];
  }
  return null;
}

function activate(context) {
  let statusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );

  function updateStatus(editor) {
    if (editor) {
      const filePath = editor.document.fileName;
      const packageName = getPackageName(filePath);
      console.log(packageName);
      console.log(statusBar);
      statusBar.text = packageName;
      statusBar.show();
      const decorator = vscode.window.createTextEditorDecorationType({
        after: {
          contentText: `📦 ${packageName}`,
          color: "white",
          margin: "0 0 0 20px",
          width: "max-content",
          fontWeight: "bold",
          padding: "1px 3px",
          width: '100px',
          height: '20px',
          fontSize: '10px'
        },
      });
  
      const line = editor.visibleRanges[0].start.line;
      const range = new vscode.Range(line, editor.document.lineAt(line).text.length, line, editor.document.lineAt(line).text.length);
  
      let decorationOptions = {
        range: range,
        hoverMessage: `This file belongs to package ${packageName}`,
      };
  
      editor.setDecorations(decorator, [decorationOptions]);
    } else {
      statusBar.hide();
    }
  }

  const disposable = vscode.window.onDidChangeActiveTextEditor(updateStatus);
  context.subscriptions.push(disposable);
  
}

exports.activate = activate;
