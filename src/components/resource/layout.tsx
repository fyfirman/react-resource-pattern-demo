import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import { Button } from "~/components/ui/button";

export interface LayoutProps {
  title: string;
  buttonAddLabel?: string;
  onClickButton?: () => void;
  hideButton?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Layout = (props: LayoutProps) => {
  const {
    title,
    buttonAddLabel = "Add",
    onClickButton = () => {},
    hideButton = false,
    children,
    className,
  } = props;
  return (
    <div
      className={`p-8 rounded-[0.5rem] border bg-background shadow ${className}`}
    >
      <div className="flex justify-between mb-8">
        <div className="flex flex-col align-left items-start gap-2">
          <h1 className="text-2xl font-bold tracking-tight">
            {title} Management
          </h1>
          <p className="text-muted-foreground">
            Create, Read, Update, and Delete {title}
          </p>
        </div>
        {!hideButton ? (
          <div>
            <Button onClick={onClickButton} type="submit">
              <PlusIcon className="mr-2" />
              {buttonAddLabel}
            </Button>
          </div>
        ) : null}
      </div>
      {children}
    </div>
  );
};

export default Layout;
