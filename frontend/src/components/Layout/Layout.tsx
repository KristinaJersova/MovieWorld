import { Navbar } from "./Navbar";
import { Sidebar } from "./SideBar";

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <div>
      <Navbar />

      <div className="app-shell">
        <Sidebar />

        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}