import "~/App.css";
import UserManagement from "~/features/users/user-management";
import {
  catManagement,
  companyManagement,
  dogManagement,
  userManagement,
} from "~/pages/code";
import CompanyManagement from "~/features/company/company-management";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import CatManagement from "~/features/cats/cat-management";
import DogManagement from "~/features/dogs/dog-management";
import CodeBlock from "~/components/code-block";

interface MenuItem {
  Component: React.FC;
  title: string;
  code: string;
}

const menus: MenuItem[] = [
  {
    title: "User",
    Component: UserManagement,
    code: userManagement,
  },
  {
    title: "Company",
    Component: CompanyManagement,
    code: companyManagement,
  },
  {
    title: "Cat",
    Component: CatManagement,
    code: catManagement,
  },
  {
    title: "Dog",
    Component: DogManagement,
    code: dogManagement,
  },
];

function Home() {
  const [selected, setSelected] = useState<number>(0);

  const { Component, code } = menus[selected];

  return (
    <div className="flex w-[100vw] p-12 gap-8 items-start">
      <div className="flex-[3] p-8 rounded-[0.5rem] border bg-background shadow">
        <div className="flex flex-col align-left items-start gap-2 mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            React Resource Pattern
          </h1>
          <h2 className="text-2xl font-bold tracking-tight">Problem</h2>
          <p className="text-muted-foreground">
            When developing an application, we inevitably encounter a recurring
            challenge, particularly when it comes to CRUD (Create, Read, Update,
            Delete) operations, which allow administrators to manage resources.
            The fundamental logic underlying these operations remains
            consistent, yet the attributes, forms, and views vary from one
            resource to another.
          </p>
          <p className="text-muted-foreground">
            In my professional journey, I've had the opportunity to create a
            dozen CRUD operations for various resources. Initially, I followed
            the conventional approach, which worked fine for the first few
            resources. However, as I progressed and developed the fourth
            resource, I began to notice a pattern of tedium and redundancy.
            Subsequently, when the project's requirements changes slightly, I
            found myself having to make individual adjustments to each resource
            I had built.
          </p>
          <p className="text-muted-foreground">
            I recognized the need to establish a robust pattern that would not
            only streamline these changes across all resources but also allow
            for customization based on the unique attributes of each resource.
          </p>

          <h2 className="text-2xl font-bold tracking-tight">Code</h2>
          <p className="text-muted-foreground">
            Create, Read, Update, and Delete operation is one code file below
          </p>
        </div>
        <CodeBlock code={code} />
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
        <Component />
      </div>
    </div>
  );
}

export default Home;
