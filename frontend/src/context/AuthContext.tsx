"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { auth_user, decoded_token, user_data } from "@/lib/interfaces";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { auth_context_type, auth_provider_props } from "../lib/interfaces";
import tecnicoService from "@/services/tecnico";
import usuarioService from "@/services/usuario";
const AuthContext = createContext<auth_context_type | undefined>(undefined);

export const useAuth = (): auth_context_type => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe utilizarse dentro de un AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }: auth_provider_props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<user_data | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [renderUserData, setRenderUserData] = useState<boolean>(false);
  const loadData = async () => {
    const savedToken = getCookie("authToken");
    const savedUserRole = getCookie("userRole");

    if (savedToken && savedUserRole) {
      setIsAuthenticated(true);
      setToken(savedToken as string);

      // Decodifica el token directamente desde savedToken
      const decodedToken: decoded_token = jwtDecode<decoded_token>(
        savedToken as string
      );
      const { id, rol } = decodedToken;

      if (rol === "tecnico") {
        tecnicoService
          .getUnique(id)
          .then((user) => {
            setUserData(user);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      if (rol === "usuario") {
        usuarioService
          .getUnique(id)
          .then((user) => {
            setUserData(user);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };
  useEffect(() => {
    loadData();
  }, [renderUserData]);

  const router = useRouter();
  const login = async (user: auth_user): Promise<void> => {
    try {
      if (user.token && user.rol) {
        // Guardar el token como una cookie
        setCookie("authToken", user.token, {
          maxAge: 30 * 24 * 60 * 60, // 30 días
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        // Guardar el rol del usuario
        setCookie("userRole", user.rol, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        // Redirigir basado en el rol
        if (user.rol === "usuario" || user.rol === "tecnico") {
          setToken(user.token);
          setIsAuthenticated(true);
          router.push("/dashboard/home");
        }
      } else {
        setUserData(null);
        setToken(null);
        setIsAuthenticated(false);
        router.push("/login");
        throw new Error("No se recibió un token válido o rol de usuario");
      }
    } catch (error) {
      throw new Error(error as string);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    setToken(null);
    router.push("/");
  };

  const value: auth_context_type = {
    isAuthenticated,
    login,
    logout,
    userData,
    token,
    renderUserData,
    setRenderUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
