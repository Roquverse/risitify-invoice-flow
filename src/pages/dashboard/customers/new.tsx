import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase/client";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
  notes: z.string().optional(),
  tax_id: z.string().optional(),
  payment_terms: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function NewCustomer() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      notes: "",
      tax_id: "",
      payment_terms: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      const { error } = await supabase.from("customers").insert([data]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Customer created successfully",
      });
      navigate("/dashboard/customers");
    } catch (error) {
      console.error("Error creating customer:", error);
      toast({
        title: "Error",
        description: "Failed to create customer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">New Customer</h1>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name *</label>
            <Input {...form.register("name")} />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email *</label>
            <Input {...form.register("email")} type="email" />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Company</label>
            <Input {...form.register("company")} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Phone</label>
            <Input {...form.register("phone")} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Address</label>
            <Input {...form.register("address")} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">City</label>
            <Input {...form.register("city")} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">State</label>
            <Input {...form.register("state")} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">ZIP Code</label>
            <Input {...form.register("zip")} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Country</label>
            <Input {...form.register("country")} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tax ID</label>
            <Input {...form.register("tax_id")} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Payment Terms</label>
            <Input {...form.register("payment_terms")} />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Notes</label>
            <Textarea {...form.register("notes")} />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/dashboard/customers")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Customer"}
          </Button>
        </div>
      </form>
    </div>
  );
}
