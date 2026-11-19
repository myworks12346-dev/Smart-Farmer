"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { Language } from "@/types";

export interface FarmerMetadata {
  full_name: string;
  phone?: string;
  preferred_language: Language;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  accessToken: string | null;
  farmerMetadata: FarmerMetadata | null;
  isLoading: boolean;
  isDemoMode: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (
    email: string,
    password: string,
    meta: FarmerMetadata
  ) => Promise<{ error: string | null }>;
  signInDemo: () => void;
  signOut: () => Promise<void>;
  updateLanguage: (lang: Language) => void;
}

const DEMO_USER_ID = "farmer_demo_001";
const DEMO_METADATA: FarmerMetadata = {
  full_name: "Rakib Kowshar",
  phone: "+91 98765 43210",
  preferred_language: "en",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [farmerMetadata, setFarmerMetadata] = useState<FarmerMetadata | null>(DEMO_METADATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Check if live Supabase configuration is supplied
  const isSupabaseConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder-project") &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes("placeholder-anon-key");

  useEffect(() => {
    // Check local storage for persistent demo session
    const storedDemo = typeof window !== "undefined" ? localStorage.getItem("smart_farmer_demo") : null;
    if (storedDemo === "true") {
      setIsDemoMode(true);
      setFarmerMetadata(DEMO_METADATA);
      setIsLoading(false);
      return;
    }

    if (!isSupabaseConfigured) {
      // Default to demo mode if Supabase keys aren't added yet
      setIsDemoMode(true);
      setFarmerMetadata(DEMO_METADATA);
      setIsLoading(false);
      return;
    }

    // Live Supabase initialization
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setAccessToken(session?.access_token ?? null);
      if (session?.user?.user_metadata) {
        setFarmerMetadata({
          full_name: session.user.user_metadata.full_name || "Farmer",
          phone: session.user.user_metadata.phone || "",
          preferred_language: session.user.user_metadata.preferred_language || "en",
        });
      }
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setAccessToken(session?.access_token ?? null);
      if (session?.user?.user_metadata) {
        setFarmerMetadata({
          full_name: session.user.user_metadata.full_name || "Farmer",
          phone: session.user.user_metadata.phone || "",
          preferred_language: session.user.user_metadata.preferred_language || "en",
        });
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, isSupabaseConfigured]);

  const signIn = async (email: string, password: string): Promise<{ error: string | null }> => {
    if (!isSupabaseConfigured) {
      // Offline fallback: log in as demo
      signInDemo();
      return { error: null };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      setUser(data.user);
      setSession(data.session);
      setAccessToken(data.session?.access_token ?? null);
      setIsDemoMode(false);
      localStorage.removeItem("smart_farmer_demo");

      return { error: null };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed";
      return { error: msg };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    meta: FarmerMetadata
  ): Promise<{ error: string | null }> => {
    if (!isSupabaseConfigured) {
      // Offline fallback: save metadata in demo mode
      setFarmerMetadata(meta);
      setIsDemoMode(true);
      localStorage.setItem("smart_farmer_demo", "true");
      return { error: null };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: meta.full_name,
            phone: meta.phone,
            preferred_language: meta.preferred_language,
          },
        },
      });

      if (error) {
        return { error: error.message };
      }

      setUser(data.user);
      setSession(data.session);
      setAccessToken(data.session?.access_token ?? null);
      setFarmerMetadata(meta);
      setIsDemoMode(false);
      localStorage.removeItem("smart_farmer_demo");

      return { error: null };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration failed";
      return { error: msg };
    }
  };

  const signInDemo = () => {
    setIsDemoMode(true);
    setFarmerMetadata(DEMO_METADATA);
    setAccessToken("mock_bearer_token_demo_farmer");
    localStorage.setItem("smart_farmer_demo", "true");
  };

  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
    setAccessToken(null);
    setIsDemoMode(false);
    localStorage.removeItem("smart_farmer_demo");
  };

  const updateLanguage = (lang: Language) => {
    setFarmerMetadata((prev) => (prev ? { ...prev, preferred_language: lang } : null));
    if (isSupabaseConfigured && user) {
      supabase.auth.updateUser({
        data: { preferred_language: lang },
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        accessToken,
        farmerMetadata,
        isLoading,
        isDemoMode,
        signIn,
        signUp,
        signInDemo,
        signOut,
        updateLanguage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
