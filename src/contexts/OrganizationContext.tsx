import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

export type OrganizationData = {
  id: string;
  name: string;
  industry: string;
  registration_number: string;
  tax_id: string;
  address: string;
  email: string;
  phone: string;
  website: string;
  logo: string | null;
  owner_id: string;
};

export interface OrganizationContextType {
  organizationData: OrganizationData | null;
  updateOrganizationData: (data: Partial<OrganizationData>) => Promise<void>;
  isLoading: boolean;
  syncWithSupabase: () => Promise<void>;
}

const OrganizationContext = createContext<OrganizationContextType>({
  organizationData: null,
  updateOrganizationData: async () => {},
  isLoading: false,
  syncWithSupabase: async () => {},
});

export const OrganizationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  const [organizationData, setOrganizationData] =
    useState<OrganizationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchOrganizationData = async () => {
    try {
      if (!user) {
        setOrganizationData(null);
        return;
      }

      const { data, error } = await supabase
        .from("organizations")
        .select(
          "id, name, industry, registration_number, tax_id, address, email, phone, website, logo, owner_id"
        )
        .eq("owner_id", user.id)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // No organization found, create one
          const { data: newOrg, error: createError } = await supabase
            .from("organizations")
            .insert([
              {
                owner_id: user.id,
                name: "My Organization",
                email: user.email,
              },
            ])
            .select()
            .single();

          if (createError) {
            console.error("Error creating organization:", createError);
            toast.error("Failed to create organization");
            return;
          }

          setOrganizationData(newOrg as OrganizationData);
          return;
        }

        console.error("Error fetching organization data:", error);
        toast.error("Failed to fetch organization data");
        return;
      }

      setOrganizationData(data as OrganizationData);
    } catch (error) {
      console.error("Error in fetchOrganizationData:", error);
      toast.error("An error occurred while fetching organization data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizationData();
  }, [user]);

  const refreshOrganization = async () => {
    await fetchOrganizationData();
  };

  const updateOrganizationData = async (data: Partial<OrganizationData>) => {
    try {
      if (!user || !organizationData?.id) return;

      const updateData = {
        name: data.name,
        industry: data.industry,
        email: data.email,
        phone: data.phone,
        address: data.address,
        website: data.website,
        tax_id: data.tax_id,
        registration_number: data.registration_number,
        logo: data.logo,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("organizations")
        .update(updateData)
        .eq("id", organizationData.id)
        .eq("owner_id", user.id);

      if (error) throw error;

      setOrganizationData((prev) => ({
        ...prev!,
        ...data,
      }));
    } catch (err) {
      console.error("Error updating organization:", err);
      throw err;
    }
  };

  const syncWithSupabase = async () => {
    await fetchOrganizationData();
  };

  return (
    <OrganizationContext.Provider
      value={{
        organizationData,
        updateOrganizationData,
        isLoading: loading,
        syncWithSupabase,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error(
      "useOrganization must be used within an OrganizationProvider"
    );
  }
  return context;
};
