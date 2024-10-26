interface HomePageOnlyProps {
  children: React.ReactNode;
}

const HomePageOnly = ({ children }: HomePageOnlyProps) => {
    const location = useLocation();
    const isHomePage = location.pathname === "/app";
    return isHomePage ? <>{children}</> : null;
  };

  const NotHomePage = ({ children }: HomePageOnlyProps) => {
    const location = useLocation();
    const isHomePage = location.pathname === "/app";
    return !isHomePage ? <>{children}</> : null;
  };
