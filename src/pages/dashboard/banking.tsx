import { useState, useEffect } from "react";
import {
  PlusCircle,
  Building,
  ArrowUpDown,
  RefreshCcw,
  Link2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/types/supabase";

type BankAccount = {
  id: string;
  account_name: string;
  account_number: string;
  bank_name: string;
  balance: number;
  currency: string;
  last_synced?: string;
};

type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "credit" | "debit";
  category?: string;
  account_id: string;
};

export default function BankingPage() {
  const [open, setOpen] = useState(false);
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [newAccount, setNewAccount] = useState({
    account_name: "",
    account_number: "",
    bank_name: "",
    currency: "USD",
  });

  useEffect(() => {
    loadBankingData();
  }, []);

  const loadBankingData = async () => {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Load bank accounts
        const { data: accountsData } = await supabase
          .from("bank_accounts")
          .select("*")
          .eq("user_id", user.id);

        if (accountsData) {
          setAccounts(accountsData);

          // Load recent transactions
          const { data: transactionsData } = await supabase
            .from("transactions")
            .select("*")
            .in(
              "account_id",
              accountsData.map((acc) => acc.id)
            )
            .order("date", { ascending: false })
            .limit(10);

          if (transactionsData) {
            setTransactions(transactionsData);
          }
        }
      }
    } catch (error) {
      console.error("Error loading banking data:", error);
      toast({
        title: "Error",
        description: "Failed to load banking data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from("bank_accounts")
        .insert([
          {
            ...newAccount,
            user_id: user.id,
            balance: 0,
            last_synced: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setAccounts([...accounts, data]);
      setOpen(false);
      setNewAccount({
        account_name: "",
        account_number: "",
        bank_name: "",
        currency: "USD",
      });

      toast({
        title: "Success",
        description: "Bank account added successfully.",
      });
    } catch (error) {
      console.error("Error adding bank account:", error);
      toast({
        title: "Error",
        description: "Failed to add bank account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Banking</h1>
          <p className="text-gray-600">
            Manage your bank accounts and transactions
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <PlusCircle className="h-4 w-4" />
              <span>Add Bank Account</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Bank Account</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddAccount} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="account_name">Account Name</Label>
                  <Input
                    id="account_name"
                    value={newAccount.account_name}
                    onChange={(e) =>
                      setNewAccount({
                        ...newAccount,
                        account_name: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bank_name">Bank Name</Label>
                  <Input
                    id="bank_name"
                    value={newAccount.bank_name}
                    onChange={(e) =>
                      setNewAccount({
                        ...newAccount,
                        bank_name: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account_number">Account Number</Label>
                  <Input
                    id="account_number"
                    value={newAccount.account_number}
                    onChange={(e) =>
                      setNewAccount({
                        ...newAccount,
                        account_number: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Input
                    id="currency"
                    value={newAccount.currency}
                    onChange={(e) =>
                      setNewAccount({ ...newAccount, currency: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Adding..." : "Add Account"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <Card key={account.id}>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">
                {account.account_name}
              </CardTitle>
              <Building className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: account.currency,
                }).format(account.balance)}
              </div>
              <p className="text-xs text-gray-500">
                {account.bank_name} • ****
                {account.account_number.slice(-4)}
              </p>
              <div className="mt-4 flex items-center space-x-2">
                <RefreshCcw className="h-4 w-4 text-gray-500" />
                <span className="text-xs text-gray-500">
                  Last synced:{" "}
                  {account.last_synced
                    ? new Date(account.last_synced).toLocaleDateString()
                    : "Never"}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between border-b border-gray-100 pb-4"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`rounded-full p-2 ${
                      transaction.type === "credit"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span
                  className={`font-medium ${
                    transaction.type === "credit"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "credit" ? "+" : "-"}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(Math.abs(transaction.amount))}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
