import Link from "next/link";
import AuthLinks from './AuthLinks';

const Header = () => {
  
  return (
    <header className="bg-amber-800 text-gray-100 p-4">
      <nav className="flex justify-between items-center mx-auto max-w-4xl">
        <Link href="/" className="text-4xl font-bold">
          My Blog
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/blogs" className="text-2xl hover:underline">
              Blogs
            </Link>
          </li>
          <li>
           <AuthLinks/>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;  
