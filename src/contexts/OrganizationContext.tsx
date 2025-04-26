
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

  const fetchOrganizationData = async () => {
    try {
      if (!user) {
        setOrganizationData(null);
        setLoading(false);
        return;
      }

      // Simplified query that uses the owner_id directly
      const { data, error } = await supabase
        .from("organizations")
        .select("*")
        .eq("owner_id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching organization data:", error);
        toast.error("Failed to fetch organization data");
        
        // If no organization exists, create one
        if (error.code === "PGRST116") {
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
          } else {
            setOrganizationData(newOrg as OrganizationData);
          }
        }
      } else if (data) {
        setOrganizationData(data as OrganizationData);
      } else {
        // No data but also no error - create a new organization
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
        } else {
          setOrganizationData(newOrg as OrganizationData);
        }
      }
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
      
      toast.success("Organization updated successfully");
    } catch (err) {
      console.error("Error updating organization:", err);
      toast.error("Failed to update organization");
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
