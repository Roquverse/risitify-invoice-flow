export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      user_settings: {
        Row: {
          id: string;
          user_id: string;
          profile: {
            first_name: string;
            last_name: string;
            email: string;
            phone: string;
            completed: boolean;
          } | null;
          organization: {
            company_name: string;
            business_type: string;
            registration_number: string;
            tax_id: string;
            address: string;
            completed: boolean;
          } | null;
          payment: {
            account_holder: string;
            account_number: string;
            bank_name: string;
            swift_code: string;
            completed: boolean;
          } | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          profile?: Json | null;
          organization?: Json | null;
          payment?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          profile?: Json | null;
          organization?: Json | null;
          payment?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_settings_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      bank_accounts: {
        Row: {
          id: string;
          user_id: string;
          account_name: string;
          account_number: string;
          bank_name: string;
          balance: number;
          currency: string;
          last_synced: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          account_name: string;
          account_number: string;
          bank_name: string;
          balance?: number;
          currency: string;
          last_synced?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          account_name?: string;
          account_number?: string;
          bank_name?: string;
          balance?: number;
          currency?: string;
          last_synced?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      transactions: {
        Row: {
          id: string;
          account_id: string;
          date: string;
          description: string;
          amount: number;
          type: "credit" | "debit";
          category: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          account_id: string;
          date: string;
          description: string;
          amount: number;
          type: "credit" | "debit";
          category?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          account_id?: string;
          date?: string;
          description?: string;
          amount?: number;
          type?: "credit" | "debit";
          category?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
