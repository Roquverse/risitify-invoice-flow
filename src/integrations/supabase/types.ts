export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      account_settings: {
        Row: {
          created_at: string | null
          currency: string | null
          id: string
          timezone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          currency?: string | null
          id?: string
          timezone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          currency?: string | null
          id?: string
          timezone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      activity_log: {
        Row: {
          activity_type: string
          created_at: string | null
          description: string
          id: number
          organization_id: string
          related_id: string | null
          related_table: string | null
          user_id: string | null
        }
        Insert: {
          activity_type: string
          created_at?: string | null
          description: string
          id?: number
          organization_id: string
          related_id?: string | null
          related_table?: string | null
          user_id?: string | null
        }
        Update: {
          activity_type?: string
          created_at?: string | null
          description?: string
          id?: number
          organization_id?: string
          related_id?: string | null
          related_table?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      bank_accounts: {
        Row: {
          account_name: string
          account_number: string
          balance: number
          bank_name: string
          created_at: string
          currency: string
          id: string
          last_synced: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          account_name: string
          account_number: string
          balance?: number
          bank_name: string
          created_at?: string
          currency: string
          id?: string
          last_synced?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          account_name?: string
          account_number?: string
          balance?: number
          bank_name?: string
          created_at?: string
          currency?: string
          id?: string
          last_synced?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          address: string | null
          city: string | null
          company: string | null
          country: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          notes: string | null
          payment_terms: string | null
          phone: string | null
          state: string | null
          tax_id: string | null
          updated_at: string | null
          zip: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          company?: string | null
          country?: string | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          notes?: string | null
          payment_terms?: string | null
          phone?: string | null
          state?: string | null
          tax_id?: string | null
          updated_at?: string | null
          zip?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          company?: string | null
          country?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          notes?: string | null
          payment_terms?: string | null
          phone?: string | null
          state?: string | null
          tax_id?: string | null
          updated_at?: string | null
          zip?: string | null
        }
        Relationships: []
      }
      invoices: {
        Row: {
          amount_due: number
          created_at: string | null
          customer_id: string
          due_date: string | null
          id: string
          invoice_number: string | null
          issued_date: string | null
          organization_id: string
          status: string
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          amount_due?: number
          created_at?: string | null
          customer_id: string
          due_date?: string | null
          id?: string
          invoice_number?: string | null
          issued_date?: string | null
          organization_id: string
          status?: string
          total_amount?: number
          updated_at?: string | null
        }
        Update: {
          amount_due?: number
          created_at?: string | null
          customer_id?: string
          due_date?: string | null
          id?: string
          invoice_number?: string | null
          issued_date?: string | null
          organization_id?: string
          status?: string
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_users: {
        Row: {
          created_at: string | null
          id: string
          organization_id: string
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          organization_id: string
          role?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          organization_id?: string
          role?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_users_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          address: string | null
          created_at: string | null
          email: string | null
          id: string
          industry: string | null
          logo: string | null
          name: string
          owner_id: string
          phone: string | null
          registration_number: string | null
          tax_id: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          industry?: string | null
          logo?: string | null
          name: string
          owner_id: string
          phone?: string | null
          registration_number?: string | null
          tax_id?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          industry?: string | null
          logo?: string | null
          name?: string
          owner_id?: string
          phone?: string | null
          registration_number?: string | null
          tax_id?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      payment_gateway_settings: {
        Row: {
          api_key: string
          created_at: string
          gateway_type: Database["public"]["Enums"]["payment_gateway_type"]
          id: string
          is_live: boolean
          organization_id: string
          secret_key: string
          updated_at: string
          webhook_url: string | null
        }
        Insert: {
          api_key: string
          created_at?: string
          gateway_type: Database["public"]["Enums"]["payment_gateway_type"]
          id?: string
          is_live?: boolean
          organization_id: string
          secret_key: string
          updated_at?: string
          webhook_url?: string | null
        }
        Update: {
          api_key?: string
          created_at?: string
          gateway_type?: Database["public"]["Enums"]["payment_gateway_type"]
          id?: string
          is_live?: boolean
          organization_id?: string
          secret_key?: string
          updated_at?: string
          webhook_url?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          customer_id: string | null
          id: string
          invoice_id: string | null
          method: string | null
          notes: string | null
          organization_id: string
          payment_date: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          customer_id?: string | null
          id?: string
          invoice_id?: string | null
          method?: string | null
          notes?: string | null
          organization_id: string
          payment_date?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          customer_id?: string | null
          id?: string
          invoice_id?: string | null
          method?: string | null
          notes?: string | null
          organization_id?: string
          payment_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          auth_user_id: string
          avatar_url: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          auth_user_id: string
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          auth_user_id?: string
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          created_at: string
          id: string
          organization: Json | null
          payment: Json | null
          profile: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          organization?: Json | null
          payment?: Json | null
          profile?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          organization?: Json | null
          payment?: Json | null
          profile?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      payment_gateway_type: "stripe" | "paypal" | "razorpay"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      payment_gateway_type: ["stripe", "paypal", "razorpay"],
    },
  },
} as const
