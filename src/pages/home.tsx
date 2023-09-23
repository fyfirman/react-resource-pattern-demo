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
import architecture from "~/assets/architecture.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

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
          <p className="text-muted-foreground mb-2">
            by{" "}
            <a
              className="text-blue-400"
              href="https://fyfirman.com"
              rel="noreferrer"
              target="_blank"
            >
              fyfirman
            </a>
          </p>
          <Accordion className="w-full" collapsible type="single">
            <AccordionItem value="item-1">
              <AccordionTrigger className="w-full">
                <h2 className="text-2xl font-bold tracking-tight">Problem</h2>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-2">
                  When developing an application, we inevitably encounter a
                  <b> recurring problem</b>, particularly when it comes to{" "}
                  <b>CRUD (Create, Read, Update, Delete)</b> operations, which
                  allow administrators to manage resources. The fundamental
                  logic underlying these operations remains consistent, yet the
                  attributes, forms, and views vary from one resource to
                  another.
                </p>
                <p className="text-muted-foreground mb-2">
                  In my professional journey, I've had the opportunity to create
                  a dozen CRUD operations for various resources. Initially, I
                  followed the conventional approach, which worked fine for the
                  first few resources. However, as I progressed and developed
                  the fourth resource, I began to notice a pattern of tedium and
                  redundancy. Subsequently, when the project's requirements
                  changes slightly, I found myself having to make individual
                  adjustments to each resource I had built.
                </p>
                <p className="text-muted-foreground">
                  I recognized the need to establish a robust pattern that would
                  not only streamline these changes across all resources but
                  also allow for customization based on the unique attributes of
                  each resource.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="w-full">
                <h2 className="text-2xl font-bold tracking-tight">Solution</h2>
              </AccordionTrigger>
              <AccordionContent>
                <img alt="architecture" src={architecture} />
                <p className="text-muted-foreground">
                  To solve this problem, I create a pattern components called{" "}
                  <b>"Resource"</b> which contain the logic how I do CRUD
                  operation. Then, every entity would be pass as props to the
                  components.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="w-full">
                <h2 className="text-2xl font-bold tracking-tight">Code</h2>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground mb-4">
                  The implementation of the code would be like below, it would
                  simpler because we hide the logic behind the Resource
                  components (See the code{" "}
                  <a
                    className="text-blue-400"
                    href="https://github.com/fyfirman/react-resource-pattern-demo/blob/main/src/components/resource/resource.tsx"
                    rel="noreferrer"
                    target="_blank"
                  >
                    here
                  </a>
                  ).
                </p>

                <CodeBlock code={code} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="w-full">
                <h2 className="text-2xl font-bold tracking-tight">
                  Potential Improvement
                </h2>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc">
                  <li className="text-muted-foreground mb-4">
                    This pattern is not limited to CRUD operation, it might be
                    useful for every recurring logic problem. The rule of thumbs
                    of this pattern is encapsulate the logic behind a
                    components.
                  </li>
                  <li className="text-muted-foreground mb-4">
                    This can be used to create CRUD generator which popular in
                    PHP language. There's also a react library called{" "}
                    <a
                      className="text-blue-400"
                      href="https://github.com/refinedev/refine"
                      rel="noreferrer"
                      target="_blank"
                    >
                      Refine
                    </a>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
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
