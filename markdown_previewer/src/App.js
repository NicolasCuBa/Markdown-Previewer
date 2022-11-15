
import './App.css';
import React from 'react';
import { marked } from 'marked';

function App() {
  return (
    <div className="App">
      <MarkdownPreviewer />
    </div>
  );
}

marked.setOptions({
  breaks: true,
});

const renderer = new marked.Renderer();
renderer.link = function (href, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};



class MarkdownPreviewer extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      markdown: info
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState ({
      markdown: event.target.value,
    })
  }

  render() {
    return(
      <section className="contenedor-todo">
        <div className="contenedor-textarea">
          <div className="toolbox1">
            <i className="fa-solid fa-pen-to-square"></i>
            <p>Editor</p>
          </div>
          <Editor markdown={this.state.markdown} onChange={this.handleChange} />
        </div>
        <div className="contenedor-preview">
          <div className="toolbox2">
            <i className="fa-solid fa-vector-square"></i>
            <p>Previewer</p>
          </div>
          <div className="contenedor-texto">
            <Previewer markdown={this.state.markdown} />
          </div>
        </div>
      </section>
    )
  }    
}

const Editor = (props) => {
  return (
    <textarea 
      id="editor"
      onChange={props.onChange}
      type="text"
      value={props.markdown}
    />
  );
};

const Previewer = (props) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: marked(props.markdown, {renderer: renderer})
      }}
      id="preview" 
    />
  );
};


const info = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;


export default App;
