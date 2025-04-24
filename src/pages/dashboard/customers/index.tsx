import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase/client";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

interface Customer {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  created_at: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      console.log("Fetching customers...");

      const { data, error } = await supabase
        .from("customers")
        .select("id, name, email, company, phone, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Fetched customers:", data);
      setCustomers(data || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
      toast({
        title: "Error",
        description: "Failed to fetch customers. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (customer.company?.toLowerCase().includes(searchQuery.toLowerCase()) ??
        false)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Customers</h1>
        <Link to="/dashboard/customers/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : customers.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No customers found.</p>
          <Link to="/dashboard/customers/new">
            <Button variant="outline" className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Customer
            </Button>
          </Link>
        </div>
      ) : (
        <div className="rounded-md border">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Name
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Email
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Company
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Phone
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Created
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle">{customer.name}</td>
                    <td className="p-4 align-middle">{customer.email}</td>
                    <td className="p-4 align-middle">
                      {customer.company || "-"}
                    </td>
                    <td className="p-4 align-middle">
                      {customer.phone || "-"}
                    </td>
                    <td className="p-4 align-middle">
                      {format(new Date(customer.created_at), "MMM d, yyyy")}
                    </td>
                    <td className="p-4 align-middle">
                      <Link to={`/dashboard/customers/${customer.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
