import Link from "next/link";
import { useAuth } from "react-oidc-context";

function Button(handleClick: () => void, title: string, classname: string) {
  return (
    <button onClick={handleClick} className={`py-2 px-4 rounded-md hover:scale-105 ${classname}`}>
      <span className="text-sm text-white font-bold">{title}</span>
    </button>
  );
}

export function Header() {
  const auth = useAuth();

  const login = () => {
    auth.signinRedirect();
  };

  const logout = () => {
    auth.signoutSilent();
    auth.removeUser();
  };

  const SiginButton = () => Button(login, "Login", "bg-green-600 hover:bg-green-800");
  const SignoutButton = () => Button(logout, "Logout", "bg-red-600 hover:bg-red-800 ");
  return (
    <header className="flex flex-row bg-slate-500 py-4 px-3 items-center">
      <div className="flex flex-row items-center gap-4 w-[100%]">
        <div className="size-14 bg-green-500 rounded-full" />
        {auth.isAuthenticated && auth.user && (
          <p className="text-md text-white">{auth.user.profile.preferred_username}</p>
        )}
      </div>
      <nav className="flex flex-row justify-center items-center gap-2 w-[100%]">
        <Link className="bg-slate-300 px-4 py-2 rounded-md hover:bg-slate-500" href="/">
          HOME
        </Link>
        <Link className="bg-slate-300 px-4 py-2 rounded-md hover:bg-slate-500" href="/protected">
          PROTECTED
        </Link>
        <Link className="bg-slate-300 px-4 py-2 rounded-md hover:bg-slate-500" href="/private">
          PRIVATE
        </Link>
      </nav>
      <div className="flex flex-row justify-end items-center w-[100%]">
        {auth.isAuthenticated ? <SignoutButton /> : <SiginButton />}
      </div>
    </header>
  );
}
