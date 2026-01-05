
import Link from 'next/link';
import { Home, ShoppingCart, Users, FileText } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-sm border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 text-indigo-600 dark:text-indigo-400 font-bold text-xl flex items-center gap-2">
              <span className="text-2xl">⚡</span> App
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="flex items-center text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                <Home className="mr-2 h-4 w-4" />
                Accueil
              </Link>
              <Link href="/articles" className="flex items-center text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                <FileText className="mr-2 h-4 w-4" />
                Articles
              </Link>
              <Link href="/commande" className="flex items-center text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Commandes
              </Link>
              <Link href="/clients" className="flex items-center text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                <Users className="mr-2 h-4 w-4" />
                Clients
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
