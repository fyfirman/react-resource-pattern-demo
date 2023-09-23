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
    <div className={`py-4 ${className}`}>
      <div className="flex justify-between">
        <div className="flex flex-col align-left items-start">
          <h1 className="text-2xl font-bold tracking-tight">
            {title} Management
          </h1>
          <p className="text-muted-foreground">
            Create, Read, Update, and Delete {title}
          </p>
        </div>
        {!hideButton && (
          <div>
            <Button type="submit" onClick={onClickButton}>
              <PlusIcon className="mr-2" />
              {buttonAddLabel}
            </Button>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default Layout;
