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
        <h1 className="mb-4">{title}</h1>
        {!hideButton && (
          <div>
            <Button type="submit" onClick={onClickButton}>
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
