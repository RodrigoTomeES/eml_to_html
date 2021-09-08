# CLI Tool to extract html content from a EML file

## Usage

Use this command for only one file:
```bash
node parse.js -i /inPath/to/email.eml -o /outPath/to/email.html
```

Or add the flag -d for extract html from all files inside the directory:
```bash
node parse.js -d -i /inPath/to/ -o /outPath/to/
```
In this case the out files always has the same name of the input files with HTML extension.