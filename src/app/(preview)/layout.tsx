function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col sm:bg-[#fafafa] sm:relative">
      {children}
    </div>
  );
}

export default PreviewLayout;
