interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col items-start">
      {children}
    </div>
  );
};

export default PageContainer;
