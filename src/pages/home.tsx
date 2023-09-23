import "~/App.css";
import UserManagement from "~/features/users/user-management";
import { userManagement } from "~/pages/code";
import { Highlight, themes } from "prism-react-renderer";

function Home() {
  return (
    <div className="flex w-[100vw] p-12 gap-8 items-start">
      <div className="flex-[3] p-8 rounded-[0.5rem] border bg-background shadow">
        <Highlight theme={themes.vsDark} code={userManagement} language="tsx">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
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
      </div>
      <div className="flex-[7]">
        <UserManagement />
      </div>
    </div>
  );
}

export default Home;
