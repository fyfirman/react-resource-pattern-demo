import "~/App.css";
import UserManagement from "~/features/users/user-management";
import {
  catManagement,
  companyManagement,
  dogManagement,
  userManagement,
} from "~/pages/code";
import { Highlight, themes } from "prism-react-renderer";
import CompanyManagement from "~/features/company/company-management";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import CatManagement from "~/features/cats/cat-management";
import DogManagement from "~/features/dogs/dog-management";
import CodeBlock from "~/components/code-block";

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
    code: companyManagement,
  },
  {
    title: "Cat",
    component: CatManagement,
    code: catManagement,
  },
  {
    title: "Dog",
    component: DogManagement,
    code: dogManagement,
  },
];

function Home() {
  const [selected, setSelected] = useState<number>(0);

  return (
    <div className="flex w-[100vw] p-12 gap-8 items-start">
      <div className="flex-[3] p-8 rounded-[0.5rem] border bg-background shadow">
        <div className="flex flex-col align-left items-start gap-2 mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Code</h1>
          <p className="text-muted-foreground">
            Create, Read, Update, and Delete operation is one code file below
          </p>
        </div>
        <CodeBlock code={menus[selected].code} />
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
