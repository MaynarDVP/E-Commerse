"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoutes?: string[];
  restrictedRoutes?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  allowedRoutes = [
    "/", "/login", "/product", "/register", "/cart", "/product/1",
    "/product/2", "/product/3", "/product/4", "/product/5", "/product/6",
  ],
  restrictedRoutes = ["/dashboard"],
}) => {
  const { isAuth } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    // Validate Route
    const isAllowedRoute = allowedRoutes.includes(pathname);
    const isRestrictedRoute = restrictedRoutes.includes(pathname);

    // Validate Private Route
    if (isRestrictedRoute && !isAuth) {
      router.push("/login");
    }else if (isRestrictedRoute && isAuth) {
      router.push("/dashboard");
    }  else if (!isAllowedRoute && !isRestrictedRoute) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [isAuth, pathname, allowedRoutes, restrictedRoutes, router]);

  // Page 404
  if (isNotFound) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800"
        >
          Go Back to Home
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
