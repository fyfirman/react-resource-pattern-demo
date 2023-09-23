import { Highlight, themes } from "prism-react-renderer";

interface CodeBlockProps {
  code: string;
}

const CodeBlock = ({ code }: CodeBlockProps) => {
  return (
    <Highlight code={code} language="tsx" theme={themes.vsDark}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre className="text-xs p-4 rounded-sm" style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
