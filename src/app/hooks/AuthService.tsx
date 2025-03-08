'use client'
import { environment } from "@/environments/environment";
import { useRouter } from "next/navigation";
import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";

const apiUrl = environment.apiUrl;
// Definição dos tipos
interface User {
    id?: string;
    name: string | undefined;
    email: string;
    phone: string;
    cpf: string;
    password: string;
    type_user: string;
    gender: string;
    addresses?: any;
    active: boolean;  
    created_at?: any;
    date_birth?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  updateUser: (user: any) => void;
  login: (email: string, password: string) => void;
  register: (user: Partial<User>, token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Estado inicial do usuário
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

// Redutor para gerenciar o estado de autenticação
type AuthAction =
  | { type: "UPDATE"; payload: { user: User } }
  | { type: "LOGIN"; payload: { user: User; token: string } }
  | { type: "REGISTER"; payload: { user: User; token: string } }
  | { type: "LOGOUT" };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload.user,
        },
      };
    case "LOGIN":
      return {
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

// Criando o contexto de autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider do contexto
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const route = useRouter();
  const [state, dispatch] = useReducer(authReducer, initialState);
  
  // Efeito para carregar o usuário do localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      dispatch({
        type: "LOGIN",
        payload: { user: JSON.parse(storedUser), token: storedToken },
      });
    }
  }, []);

  // Função de login
  const register = (user: Partial<User>, token: string) => {

    fetch(apiUrl + '/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then(response => response.json())
        .then((data: User) => {
          if (data?.id) {
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("token", token);
            dispatch({ type: "LOGIN", payload: { user: data, token } });
            
            route.push('/home');
          }else {
            alert(data);
          }
        })
        .catch(error => {
          alert("Erro ao cadastrar");
    });

  };

  const login = (email: string, password: string) => {

    fetch(apiUrl + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
        .then(response => response.json())
        .then((data: User) => {
          if (data?.id) {
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("token", '123');
            dispatch({ type: "LOGIN", payload: { user: data, token: '123' } });

            route.push('/home');
          }else {
            alert(data);
          }
        })
        .catch(error => {
            console.log(error);
          alert("Erro ao fazer login");
    });

  };

  const updateUser = (user: User) => {
    const updatedUser = { ...state.user, ...user };
    
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: "UPDATE", payload: { user: updatedUser } });
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, register, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
