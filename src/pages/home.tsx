import "~/App.css";
import UserManagement from "~/features/users/user-management";
import { userManagement } from "~/pages/code";
import { Highlight, themes } from "prism-react-renderer";
import CompanyManagement from "~/features/company/company-management";
import { useState } from "react";
import { Button } from "~/components/ui/button";

interface MenuItem {
  component: () => React.ReactElement;
  title: string;
  code: string;
}

const menus: MenuItem[] = [
  {
    title: "User",
    component: UserManagement,
    code: userManagement,
  },
  {
    title: "Company",
    component: CompanyManagement,
    code: userManagement,
  },
];

function Home() {
  const [selected, setSelected] = useState<number>(0);

  return (
    <div className="flex w-[100vw] p-12 gap-8 items-start">
      <div className="flex-[3] p-8 rounded-[0.5rem] border bg-background shadow">
        <Highlight code={userManagement} language="tsx" theme={themes.vsDark}>
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
      </div>
      <div className="flex-[7]">
        <div className="mb-2">
          {menus.map((menu, index) => (
            <Button
              key={menu.title}
              className={index !== selected ? "text-muted-foreground" : ""}
              onClick={() => setSelected(index)}
              variant="link"
            >
              {menu.title}
            </Button>
          ))}
        </div>
        {menus[selected].component()}
      </div>
    </div>
  );
}

export default Home;
